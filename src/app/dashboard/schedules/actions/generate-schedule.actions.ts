"use server";

import { revalidatePath } from "next/cache";

export async function generateScheduleAction(formData: FormData) {
  const scheduleId = formData.get("scheduleId") as string;

  if (!scheduleId) {
    throw new Error("Schedule ID is required");
  }

  revalidatePath(`/dashboard/schedules/${scheduleId}`);
}
