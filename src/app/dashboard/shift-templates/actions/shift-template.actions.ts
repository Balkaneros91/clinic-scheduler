"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createShiftTemplateSchema } from "@/lib/validations/shift-template";

import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function createShiftTemplateAction(formData: FormData) {
  await requireAdmin();

  const rawData = {
    name: formData.get("name")?.toString().trim(),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    isBreak: formData.get("isBreak") === "true",
  };

  const validatedData = createShiftTemplateSchema.parse(rawData);

  const existingShiftTemplate = await prisma.shiftTemplate.findFirst({
    where: {
      name: {
        equals: validatedData.name,
        mode: "insensitive",
      },
    },
  });

  if (existingShiftTemplate) {
    redirect("/dashboard/shift-templates?error=duplicate");
  }

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
  redirect("/dashboard/shift-templates?success=created");
}

export async function deleteShiftTemplateAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  const assignmentCount = await prisma.scheduleAssignment.count({
    where: {
      shiftId: id,
    },
  });

  if (assignmentCount > 0) {
    redirect("/dashboard/shift-templates?error=in-use");
  }

  await prisma.shiftTemplate.delete({
    where: { id },
  });

  revalidatePath("/dashboard/shift-templates");
  redirect("/dashboard/shift-templates?success=deleted");
}

export async function updateShiftTemplateAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  const rawData = {
    name: formData.get("name")?.toString().trim(),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    isBreak: formData.get("isBreak") === "true",
  };

  const validatedData = createShiftTemplateSchema.parse(rawData);

  const existingShiftTemplate = await prisma.shiftTemplate.findFirst({
    where: {
      id: {
        not: id,
      },
      name: {
        equals: validatedData.name,
        mode: "insensitive",
      },
    },
  });

  if (existingShiftTemplate) {
    redirect("/dashboard/shift-templates?error=duplicate");
  }

  await prisma.shiftTemplate.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath("/dashboard/shift-templates");
  redirect("/dashboard/shift-templates?success=updated");
}
