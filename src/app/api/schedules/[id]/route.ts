import { prisma } from "@/lib/prisma";
import { createScheduleSchema } from "@/lib/validations/schedule";
import { ZodError } from "zod";

import { requireAdminApi } from "@/lib/auth/apiAuth";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  const schedule = await prisma.schedule.findUnique({
    where: { id },
    include: {
      assignments: {
        include: {
          employee: true,
          department: true,
          shift: true,
        },
        orderBy: {
          date: "asc",
        },
      },
    },
  });

  if (!schedule) {
    return Response.json({ error: "Schedule not found" }, { status: 404 });
  }

  return Response.json(schedule);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = createScheduleSchema.parse(body);

    const schedule = await prisma.schedule.update({
      where: { id },
      data: validatedData,
    });

    return Response.json(schedule);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: "Validation failed" }, { status: 400 });
    }

    return Response.json(
      { error: "Failed to update schedule" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  const { id } = await params;

  await prisma.schedule.delete({
    where: { id },
  });

  return Response.json({ message: "Schedule deleted" });
}
