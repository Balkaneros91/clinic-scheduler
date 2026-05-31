import type {
  Employee,
  Role,
  EmploymentType,
  EmployeeResponsibility,
  Responsibility,
} from "@/generated/prisma/client";

export type EmployeeWithRelations = Employee & {
  role: Role;
  employmentType: EmploymentType;
  responsibilities: Array<
    EmployeeResponsibility & {
      responsibility: Responsibility;
    }
  >;
};

export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  roleId: string;
  employmentTypeId: string;
  isActive?: boolean;
};

export type UpdateEmployeeInput = Partial<CreateEmployeeInput> & {
  id: string;
};
