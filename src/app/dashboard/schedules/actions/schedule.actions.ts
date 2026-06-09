"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createScheduleSchema } from "@/lib/validations/schedule";

import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function createScheduleAction(formData: FormData) {
  await requireAdmin();

  const year = Number(formData.get("year"));
  const month = Number(formData.get("month"));
  const rawName = String(formData.get("name") || "").trim();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const name = rawName || `${monthNames[month - 1]} ${year}`;

  const rawData = {
    name,
    year,
    month,
  };

  const validatedData = createScheduleSchema.parse(rawData);

  try {
    await prisma.schedule.create({
      data: validatedData,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect("/dashboard/schedules?error=duplicate");
    }

    throw error;
  }

  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules?success=created");
}

export async function deleteScheduleAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  const assignmentCount = await prisma.scheduleAssignment.count({
    where: {
      scheduleId: id,
    },
  });

  if (assignmentCount > 0) {
    redirect("/dashboard/schedules?error=in-use");
  }

  await prisma.schedule.delete({
    where: { id },
  });

  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules?success=deleted");
}

export async function updateScheduleAction(formData: FormData) {
  await requireAdmin();

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
  redirect("/dashboard/schedules?success=updated");
}
