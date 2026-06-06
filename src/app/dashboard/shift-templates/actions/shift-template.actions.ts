"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createShiftTemplateSchema } from "@/lib/validations/shift-template";

export async function createShiftTemplateAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    isBreak: false,
  };

  const validatedData = createShiftTemplateSchema.parse(rawData);

  try {
    await prisma.shiftTemplate.create({
      data: validatedData,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect("/dashboard/shift-templates?error=duplicate");
    }

    throw error;
  }

  revalidatePath("/dashboard/shift-templates");
  redirect("/dashboard/shift-templates");
}

export async function deleteShiftTemplateAction(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.shiftTemplate.delete({
    where: { id },
  });

  revalidatePath("/dashboard/shift-templates");
  redirect("/dashboard/shift-templates");
}

export async function updateShiftTemplateAction(formData: FormData) {
  const id = formData.get("id") as string;

  const rawData = {
    name: formData.get("name"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    isBreak: false,
  };

  const validatedData = createShiftTemplateSchema.parse(rawData);

  await prisma.shiftTemplate.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath("/dashboard/shift-templates");
  redirect("/dashboard/shift-templates");
}
