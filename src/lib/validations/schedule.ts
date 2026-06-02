import { z } from "zod";

export const createScheduleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  year: z.coerce.number().int().min(2024),
  month: z.coerce.number().int().min(1).max(12),
});

export const updateScheduleSchema = createScheduleSchema;

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
