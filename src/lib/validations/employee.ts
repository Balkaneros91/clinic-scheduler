import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  roleId: z.string().min(1, "Role is required"),
  employmentTypeId: z.string().min(1, "Employment type is required"),
  isActive: z.boolean().optional(),
});

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  roleId: z.string().min(1, "Role is required"),
  employmentTypeId: z.string().min(1, "Employment type is required"),
  isActive: z.boolean().optional(),
});

export const updateEmployeeSchema = employeeSchema.partial();

export type EmployeeInput = z.infer<typeof employeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
