import type { Absence, AbsenceType, Employee } from "@/generated/prisma/client";

export type AbsenceWithRelations = Absence & {
  employee: Employee;
  absenceType: AbsenceType;
};

export type CreateAbsenceInput = {
  employeeId: string;
  absenceTypeId: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
};

export type UpdateAbsenceInput = Partial<CreateAbsenceInput> & {
  id: string;
};
