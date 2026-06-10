import { prisma } from "@/lib/prisma";
import { updateShiftTemplateSchema } from "@/lib/validations/shift-template";
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

    const shiftTemplate = await prisma.shiftTemplate.findUnique({
      where: { id },
    });

    if (!shiftTemplate) {
      return Response.json(
        { error: "Shift template not found" },
        { status: 404 },
      );
    }

    return Response.json(shiftTemplate);
  } catch (error) {
    console.error("Failed to fetch shift template:", error);

    return Response.json(
      { error: "Failed to fetch shift template" },
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

    const validatedData = updateShiftTemplateSchema.parse(body);

    const shiftTemplate = await prisma.shiftTemplate.update({
      where: { id },
      data: validatedData,
    });

    return Response.json(shiftTemplate);
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

    console.error("Failed to update shift template:", error);

    return Response.json(
      { error: "Failed to update shift template" },
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

    await prisma.shiftTemplate.delete({
      where: { id },
    });

    return Response.json({
      message: "Shift template deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete shift template:", error);

    return Response.json(
      { error: "Failed to delete shift template" },
      { status: 500 },
    );
  }
}
