"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createShiftTemplateSchema } from "@/lib/validations/shift-template";

export async function createShiftTemplateAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    isBreak: false,
  };

  const validatedData = createShiftTemplateSchema.parse(rawData);

  await prisma.shiftTemplate.create({
    data: validatedData,
  });

  revalidatePath("/dashboard/shift-templates");
  redirect("/dashboard/shift-templates");
}
