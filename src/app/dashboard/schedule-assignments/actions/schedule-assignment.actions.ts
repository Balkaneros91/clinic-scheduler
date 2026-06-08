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

  await prisma.scheduleAssignment.create({
    data: {
      date: new Date(validatedData.date),
      scheduleId: validatedData.scheduleId,
      employeeId: validatedData.employeeId,
      departmentId: validatedData.departmentId,
      shiftId: validatedData.shiftId,
      notes: validatedData.notes,
    },
  });

  revalidatePath("/dashboard/schedule-assignments");
  redirect("/dashboard/schedule-assignments");
}

export async function deleteScheduleAssignmentAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  await prisma.scheduleAssignment.delete({
    where: { id },
  });

  revalidatePath("/dashboard/schedule-assignments");
  redirect("/dashboard/schedule-assignments");
}

export async function updateScheduleAssignmentAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  const rawData = {
    date: formData.get("date"),
    scheduleId: formData.get("scheduleId"),
    employeeId: formData.get("employeeId"),
    departmentId: formData.get("departmentId"),
    shiftId: formData.get("shiftId"),
    notes: formData.get("notes")?.toString().trim() || null,
  };

  const validatedData = createScheduleAssignmentSchema.parse(rawData);

  await prisma.scheduleAssignment.update({
    where: { id },
    data: {
      date: new Date(validatedData.date),
      scheduleId: validatedData.scheduleId,
      employeeId: validatedData.employeeId,
      departmentId: validatedData.departmentId,
      shiftId: validatedData.shiftId,
      notes: validatedData.notes,
    },
  });

  revalidatePath("/dashboard/schedule-assignments");
  redirect("/dashboard/schedule-assignments");
}
