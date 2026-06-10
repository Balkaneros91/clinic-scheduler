import { prisma } from "@/lib/prisma";
import { updateDepartmentSchema } from "@/lib/validations/department";
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

    const department = await prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      return Response.json({ error: "Department not found" }, { status: 404 });
    }

    return Response.json(department);
  } catch (error) {
    console.error("Failed to fetch department:", error);

    return Response.json(
      { error: "Failed to fetch department" },
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

    const validatedData = updateDepartmentSchema.parse(body);

    const department = await prisma.department.update({
      where: { id },
      data: validatedData,
    });

    return Response.json(department);
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

    console.error("Failed to update department:", error);

    return Response.json(
      { error: "Failed to update department" },
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

    await prisma.department.delete({
      where: { id },
    });

    return Response.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Failed to delete department:", error);

    return Response.json(
      { error: "Failed to delete department" },
      { status: 500 },
    );
  }
}
