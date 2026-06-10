import { prisma } from "@/lib/prisma";
import { updateAbsenceSchema } from "@/lib/validations/absence";
import { ZodError } from "zod";

import { requireAdminApi } from "@/lib/auth/apiAuth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const absence = await prisma.absence.findUnique({
      where: { id },
      include: {
        employee: true,
        absenceType: true,
      },
    });

    if (!absence) {
      return Response.json({ error: "Absence not found" }, { status: 404 });
    }

    return Response.json(absence);
  } catch (error) {
    console.error("Failed to fetch absence:", error);

    return Response.json({ error: "Failed to fetch absence" }, { status: 500 });
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

    const validatedData = updateAbsenceSchema.parse(body);

    const absence = await prisma.absence.update({
      where: { id },
      data: {
        ...(validatedData.startDate && {
          startDate: new Date(validatedData.startDate),
        }),
        ...(validatedData.endDate && {
          endDate: new Date(validatedData.endDate),
        }),
        ...(validatedData.notes !== undefined && {
          notes: validatedData.notes,
        }),
        ...(validatedData.employeeId && {
          employeeId: validatedData.employeeId,
        }),
        ...(validatedData.absenceTypeId && {
          absenceTypeId: validatedData.absenceTypeId,
        }),
      },
      include: {
        employee: true,
        absenceType: true,
      },
    });

    return Response.json(absence);
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

    console.error("Failed to update absence:", error);

    return Response.json(
      { error: "Failed to update absence" },
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

    await prisma.absence.delete({
      where: { id },
    });

    return Response.json({
      message: "Absence deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete absence:", error);

    return Response.json(
      { error: "Failed to delete absence" },
      { status: 500 },
    );
  }
}
