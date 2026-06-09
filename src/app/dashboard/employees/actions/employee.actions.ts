"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { employeeService } from "@/server/services/employee.service";

import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function createEmployeeAction(formData: FormData) {
  await requireAdmin();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const roleId = formData.get("roleId") as string;
  const employmentTypeId = formData.get("employmentTypeId") as string;
  const responsibilityIds = formData.getAll("responsibilityIds") as string[];

  await employeeService.createEmployee({
    firstName,
    lastName,
    role: {
      connect: {
        id: roleId,
      },
    },
    employmentType: {
      connect: {
        id: employmentTypeId,
      },
    },
    responsibilities: {
      create: responsibilityIds.map((responsibilityId) => ({
        responsibility: {
          connect: {
            id: responsibilityId,
          },
        },
      })),
    },
  });

  redirect("/dashboard/employees");
}

export async function deleteEmployeeAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;

  await employeeService.deleteEmployee(id);

  revalidatePath("/dashboard/employees");
}

export async function updateEmployeeAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const roleId = formData.get("roleId") as string;
  const employmentTypeId = formData.get("employmentTypeId") as string;
  const isActive = formData.get("isActive") === "true";
  const responsibilityIds = formData.getAll("responsibilityIds") as string[];

  await employeeService.updateEmployee(id, {
    firstName,
    lastName,
    isActive,
    role: {
      connect: {
        id: roleId,
      },
    },
    employmentType: {
      connect: {
        id: employmentTypeId,
      },
    },
    responsibilities: {
      deleteMany: {},
      create: responsibilityIds.map((responsibilityId) => ({
        responsibility: {
          connect: {
            id: responsibilityId,
          },
        },
      })),
    },
  });

  redirect("/dashboard/employees");
}
