import type {
  ScheduleAssignment,
  Employee,
  Department,
  ShiftTemplate,
  Role,
  EmploymentType,
} from "@/generated/prisma/client";

export type ScheduleAssignmentWithRelations = ScheduleAssignment & {
  employee: Employee & {
    role: Role;
    employmentType: EmploymentType;
  };
  department: Department;
  shift: ShiftTemplate;
};

export type CreateScheduleAssignmentInput = {
  date: Date;
  employeeId: string;
  departmentId: string;
  shiftId: string;
  notes?: string;
};

export type GenerateScheduleInput = {
  startDate: Date;
  endDate: Date;
  departmentIds: string[];
  shiftTemplateIds: string[];
};

export type AvailableEmployeeCheck = {
  employeeId: string;
  date: Date;
  shiftId: string;
};
