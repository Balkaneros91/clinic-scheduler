"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createScheduleAssignmentSchema } from "@/lib/validations/schedule-assignment";

import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function createScheduleAssignmentAction(formData: FormData) {
  await requireAdmin();

  const rawData = {
    date: formData.get("date"),
    scheduleId: formData.get("scheduleId"),
    employeeId: formData.get("employeeId"),
    departmentId: formData.get("departmentId"),
    shiftId: formData.get("shiftId"),
    notes: formData.get("notes")?.toString().trim() || null,
  };

  const validatedData = createScheduleAssignmentSchema.parse(rawData);

  const assignmentDate = new Date(validatedData.date);

  const existingAssignment = await prisma.scheduleAssignment.findFirst({
    where: {
      scheduleId: validatedData.scheduleId,
      date: assignmentDate,
      employeeId: validatedData.employeeId,
      departmentId: validatedData.departmentId,
      shiftId: validatedData.shiftId,
    },
  });

  if (existingAssignment) {
    redirect("/dashboard/schedule-assignments?error=duplicate");
  }

  await prisma.scheduleAssignment.create({
    data: {
      date: assignmentDate,
      scheduleId: validatedData.scheduleId,
      employeeId: validatedData.employeeId,
      departmentId: validatedData.departmentId,
      shiftId: validatedData.shiftId,
      notes: validatedData.notes,
    },
  });

  revalidatePath("/dashboard/schedule-assignments");
  redirect("/dashboard/schedule-assignments?success=created");
}

export async function deleteScheduleAssignmentAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  await prisma.scheduleAssignment.delete({
    where: { id },
  });

  revalidatePath("/dashboard/schedule-assignments");
  redirect("/dashboard/schedule-assignments?success=deleted");
}

export async function updateScheduleAssignmentAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const redirectTo = formData.get("redirectTo")?.toString();

  const rawData = {
    date: formData.get("date"),
    scheduleId: formData.get("scheduleId"),
    employeeId: formData.get("employeeId"),
    departmentId: formData.get("departmentId"),
    shiftId: formData.get("shiftId"),
    notes: formData.get("notes")?.toString().trim() || null,
  };

  const validatedData = createScheduleAssignmentSchema.parse(rawData);

  const assignmentDate = new Date(validatedData.date);

  const existingAssignment = await prisma.scheduleAssignment.findFirst({
    where: {
      id: {
        not: id,
      },
      scheduleId: validatedData.scheduleId,
      date: assignmentDate,
      employeeId: validatedData.employeeId,
      departmentId: validatedData.departmentId,
      shiftId: validatedData.shiftId,
    },
  });

  if (existingAssignment) {
    redirect("/dashboard/schedule-assignments?error=duplicate");
  }

  await prisma.scheduleAssignment.update({
    where: { id },
    data: {
      date: assignmentDate,
      scheduleId: validatedData.scheduleId,
      employeeId: validatedData.employeeId,
      departmentId: validatedData.departmentId,
      shiftId: validatedData.shiftId,
      notes: validatedData.notes,
    },
  });

  revalidatePath("/dashboard/schedule-assignments");

  if (redirectTo) {
    revalidatePath(redirectTo);
    redirect(`${redirectTo}?success=assignment-updated`);
  }

  redirect("/dashboard/schedule-assignments?success=updated");
}
