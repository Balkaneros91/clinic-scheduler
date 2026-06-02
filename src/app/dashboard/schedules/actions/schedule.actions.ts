"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createScheduleSchema } from "@/lib/validations/schedule";

export async function createScheduleAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    year: formData.get("year"),
    month: formData.get("month"),
  };

  const validatedData = createScheduleSchema.parse(rawData);

  await prisma.schedule.create({
    data: validatedData,
  });

  revalidatePath("/dashboard/schedules");
}

export async function deleteScheduleAction(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.schedule.delete({
    where: { id },
  });

  revalidatePath("/dashboard/schedules");
}

export async function updateScheduleAction(formData: FormData) {
  const id = formData.get("id") as string;

  const rawData = {
    name: formData.get("name"),
    year: formData.get("year"),
    month: formData.get("month"),
  };

  const validatedData = createScheduleSchema.parse(rawData);

  await prisma.schedule.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules");
}
