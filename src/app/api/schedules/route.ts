import { prisma } from "@/lib/prisma";
import { createScheduleSchema } from "@/lib/validations/schedule";
import { ZodError } from "zod";

import { requireAdminApi } from "@/lib/auth/apiAuth";

export async function GET() {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  const schedules = await prisma.schedule.findMany({
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  return Response.json(schedules);
}

export async function POST(request: Request) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const body = await request.json();

    const validatedData = createScheduleSchema.parse(body);

    const schedule = await prisma.schedule.create({
      data: validatedData,
    });

    return Response.json(schedule, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          error: "Validation failed",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        error: "Failed to create schedule",
      },
      { status: 500 },
    );
  }
}
