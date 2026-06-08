"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createAbsenceSchema } from "@/lib/validations/absence";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { requireAdmin } from "@/lib/auth/requireAdmin";

import { sendAbsenceRequestNotification } from "@/lib/email/sendAbsenceRequestNotification";

export async function createAbsenceAction(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Authentication required");
  }

  const requestedEmployeeId = formData.get("employeeId") as string;

  const employeeId =
    currentUser.appRole === "ADMIN" ? requestedEmployeeId : currentUser.id;

  const rawData = {
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    notes: formData.get("notes") || undefined,
    employeeId,
    absenceTypeId: formData.get("absenceTypeId"),
  };

  const validatedData = createAbsenceSchema.parse(rawData);

  const absence = await prisma.absence.create({
    data: {
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      notes: validatedData.notes,
      employeeId: validatedData.employeeId,
      absenceTypeId: validatedData.absenceTypeId,
      status: currentUser.appRole === "ADMIN" ? "APPROVED" : "PENDING",
    },
  });

  if (currentUser.appRole !== "ADMIN") {
    try {
      const employee = await prisma.employee.findUnique({
        where: {
          id: validatedData.employeeId,
        },
      });

      const absenceType = await prisma.absenceType.findUnique({
        where: {
          id: validatedData.absenceTypeId,
        },
      });

      if (employee && absenceType) {
        await sendAbsenceRequestNotification({
          employeeName: `${employee.firstName} ${employee.lastName}`,
          absenceType: absenceType.name,
          startDate: absence.startDate,
          endDate: absence.endDate,
          notes: absence.notes,
        });
      }
    } catch (error) {
      console.error("Failed to send absence notification email:", error);
    }
  }

  revalidatePath("/dashboard/absences");
  redirect("/dashboard/absences");
}

export async function deleteAbsenceAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  await prisma.absence.delete({
    where: { id },
  });

  revalidatePath("/dashboard/absences");
  redirect("/dashboard/absences");
}

export async function updateAbsenceAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  const rawData = {
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    notes: formData.get("notes") || undefined,
    employeeId: formData.get("employeeId"),
    absenceTypeId: formData.get("absenceTypeId"),
  };

  const validatedData = createAbsenceSchema.parse(rawData);

  await prisma.absence.update({
    where: { id },
    data: {
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      notes: validatedData.notes,
      employeeId: validatedData.employeeId,
      absenceTypeId: validatedData.absenceTypeId,
    },
  });

  revalidatePath("/dashboard/absences");
  redirect("/dashboard/absences");
}

export async function approveAbsenceAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  await prisma.absence.update({
    where: { id },
    data: {
      status: "APPROVED",
    },
  });

  revalidatePath("/dashboard/absences");
}

export async function rejectAbsenceAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  await prisma.absence.update({
    where: { id },
    data: {
      status: "REJECTED",
    },
  });

  revalidatePath("/dashboard/absences");
}
