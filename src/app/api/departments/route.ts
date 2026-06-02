import { prisma } from "@/lib/prisma";
import { createDepartmentSchema } from "@/lib/validations/department";
import { ZodError } from "zod";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return Response.json(departments);
  } catch (error) {
    console.error("Failed to fetch departments:", error);

    return Response.json(
      { error: "Failed to fetch departments" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = createDepartmentSchema.parse(body);

    const department = await prisma.department.create({
      data: validatedData,
    });

    return Response.json(department, { status: 201 });
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

    console.error("Failed to create department:", error);

    return Response.json(
      { error: "Failed to create department" },
      { status: 500 },
    );
  }
}
