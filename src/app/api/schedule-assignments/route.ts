import { prisma } from "@/lib/prisma";
import { createScheduleAssignmentSchema } from "@/lib/validations/schedule-assignment";
import { ZodError } from "zod";

import { requireAdminApi } from "@/lib/auth/apiAuth";

export async function GET() {
  try {
    const scheduleAssignments = await prisma.scheduleAssignment.findMany({
      include: {
        employee: true,
        department: true,
        shift: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return Response.json(scheduleAssignments);
  } catch (error) {
    console.error("Failed to fetch schedule assignments:", error);

    return Response.json(
      { error: "Failed to fetch schedule assignments" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const body = await request.json();

    const validatedData = createScheduleAssignmentSchema.parse(body);

    const scheduleAssignment = await prisma.scheduleAssignment.create({
      data: {
        date: new Date(validatedData.date),
        scheduleId: validatedData.scheduleId,
        employeeId: validatedData.employeeId,
        departmentId: validatedData.departmentId,
        shiftId: validatedData.shiftId,
        notes: validatedData.notes,
      },
      include: {
        employee: true,
        department: true,
        shift: true,
      },
    });

    return Response.json(scheduleAssignment, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          error: "Validation failed",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    console.error("Failed to create schedule assignment:", error);

    return Response.json(
      { error: "Failed to create schedule assignment" },
      { status: 500 },
    );
  }
}
