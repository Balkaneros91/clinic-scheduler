import { z } from "zod";

export const createScheduleAssignmentSchema = z.object({
  date: z.string().min(1, "Date is required"),
  scheduleId: z.string().min(1, "Schedule is required"),
  employeeId: z.string().min(1, "Employee is required"),
  departmentId: z.string().min(1, "Department is required"),
  shiftId: z.string().min(1, "Shift is required"),
  notes: z.string().nullable().optional(),
});

export const updateScheduleAssignmentSchema =
  createScheduleAssignmentSchema.partial();
