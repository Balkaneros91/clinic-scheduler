"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createAbsenceSchema } from "@/lib/validations/absence";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { requireAdmin } from "@/lib/auth/requireAdmin";

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

  await prisma.absence.create({
    data: {
      startDate: new Date(validatedData.startDate),
      endDate: new Date(validatedData.endDate),
      notes: validatedData.notes,
      employeeId: validatedData.employeeId,
      absenceTypeId: validatedData.absenceTypeId,
    },
  });

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
      endDate: new Date(validatedData.endDate),
      notes: validatedData.notes,
      employeeId: validatedData.employeeId,
      absenceTypeId: validatedData.absenceTypeId,
    },
  });

  revalidatePath("/dashboard/absences");
  redirect("/dashboard/absences");
}
