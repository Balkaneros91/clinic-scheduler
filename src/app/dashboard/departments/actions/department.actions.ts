"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function deleteDepartmentAction(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.department.delete({
    where: { id },
  });

  revalidatePath("/dashboard/departments");
}

export async function updateDepartmentAction(formData: FormData) {
  const id = formData.get("id") as string;

  const rawData = {
    name: formData.get("name"),
  };

  const validatedData = createDepartmentSchema.parse(rawData);

  await prisma.department.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath("/dashboard/departments");
  redirect("/dashboard/departments");
}
