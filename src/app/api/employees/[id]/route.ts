import { prisma } from "@/lib/prisma";
import { createEmployeeSchema } from "@/lib/validations/employee";
import { ZodError } from "zod";

import { requireAdminApi } from "@/lib/auth/apiAuth";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        role: true,
        employmentType: true,
        responsibilities: true,
      },
    });

    if (!employee) {
      return Response.json({ error: "Employee not found" }, { status: 404 });
    }

    return Response.json(employee);
  } catch (error) {
    console.error("Failed to fetch employee:", error);

    return Response.json(
      { error: "Failed to fetch employee" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = createEmployeeSchema.partial().parse(body);

    const employee = await prisma.employee.update({
      where: { id },
      data: validatedData,
      include: {
        role: true,
        employmentType: true,
        responsibilities: true,
      },
    });

    return Response.json(employee);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          error: "Validation failed",
          details: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error("Failed to update employee:", error);

    return Response.json(
      { error: "Failed to update employee" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const authResult = await requireAdminApi();

  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    const { id } = await params;

    await prisma.employee.delete({
      where: { id },
    });

    return Response.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Failed to delete employee:", error);

    return Response.json(
      { error: "Failed to delete employee" },
      { status: 500 },
    );
  }
}
