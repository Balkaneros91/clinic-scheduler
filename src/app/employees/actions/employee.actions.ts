"use server";

import { redirect } from "next/navigation";
import { employeeService } from "@/server/services/employee.service";

export async function createEmployeeAction(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const roleId = formData.get("roleId") as string;
  const employmentTypeId = formData.get("employmentTypeId") as string;

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
  });

  redirect("/employees");
}
