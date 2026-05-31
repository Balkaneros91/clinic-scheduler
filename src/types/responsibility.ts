import type {
  Responsibility,
  EmployeeResponsibility,
  Employee,
} from "@/generated/prisma/client";

export type ResponsibilityWithEmployees = Responsibility & {
  employeeResponsibilities: Array<
    EmployeeResponsibility & {
      employee: Employee;
    }
  >;
};

export type CreateResponsibilityInput = {
  name: string;
};

export type AssignResponsibilityInput = {
  employeeId: string;
  responsibilityId: string;
  proficiency?: number;
};
