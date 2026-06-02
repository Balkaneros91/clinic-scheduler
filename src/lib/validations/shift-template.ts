import { z } from "zod";

export const createShiftTemplateSchema = z.object({
  name: z.string().min(2, "Shift name must be at least 2 characters"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  isBreak: z.boolean().optional(),
});

export const updateShiftTemplateSchema = createShiftTemplateSchema.partial();
