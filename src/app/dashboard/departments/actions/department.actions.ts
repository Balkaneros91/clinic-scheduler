"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createDepartmentSchema } from "@/lib/validations/department";

export async function createDepartmentAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
  };

  const validatedData = createDepartmentSchema.parse(rawData);

  await prisma.department.create({
    data: validatedData,
  });

  revalidatePath("/dashboard/departments");
}
