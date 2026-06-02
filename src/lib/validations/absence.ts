import { z } from "zod";

export const createAbsenceSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  notes: z.string().optional(),
  employeeId: z.string().min(1, "Employee is required"),
  absenceTypeId: z.string().min(1, "Absence type is required"),
});

export const updateAbsenceSchema = createAbsenceSchema.partial();
