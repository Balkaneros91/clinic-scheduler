import { prisma } from "@/lib/prisma";
import { updateScheduleAssignmentSchema } from "@/lib/validations/schedule-assignment";
import { ZodError } from "zod";

import { requireAdminApi } from "@/lib/auth/apiAuth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { id } = await context.params;

    const scheduleAssignment = await prisma.scheduleAssignment.findUnique({
      where: { id },
      include: {
        employee: true,
        department: true,
        shift: true,
      },
    });

    if (!scheduleAssignment) {
      return Response.json(
        { error: "Schedule assignment not found" },
        { status: 404 },
      );
    }

    return Response.json(scheduleAssignment);
  } catch (error) {
    console.error("Failed to fetch schedule assignment:", error);

    return Response.json(
      { error: "Failed to fetch schedule assignment" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const validatedData = updateScheduleAssignmentSchema.parse(body);

    const scheduleAssignment = await prisma.scheduleAssignment.update({
      where: { id },
      data: {
        ...(validatedData.date && {
          date: new Date(validatedData.date),
        }),
        ...(validatedData.employeeId && {
          employeeId: validatedData.employeeId,
        }),
        ...(validatedData.departmentId && {
          departmentId: validatedData.departmentId,
        }),
        ...(validatedData.shiftId && {
          shiftId: validatedData.shiftId,
        }),
        ...(validatedData.notes !== undefined && {
          notes: validatedData.notes,
        }),
      },
      include: {
        employee: true,
        department: true,
        shift: true,
      },
    });

    return Response.json(scheduleAssignment);
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

    console.error("Failed to update schedule assignment:", error);

    return Response.json(
      { error: "Failed to update schedule assignment" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { id } = await context.params;

    await prisma.scheduleAssignment.delete({
      where: { id },
    });

    return Response.json({
      message: "Schedule assignment deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete schedule assignment:", error);

    return Response.json(
      { error: "Failed to delete schedule assignment" },
      { status: 500 },
    );
  }
}
