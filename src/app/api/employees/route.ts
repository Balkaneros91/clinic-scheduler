import { prisma } from "@/lib/prisma";
import { createEmployeeSchema } from "@/lib/validations/employee";
import { z, ZodError } from "zod";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        role: true,
        employmentType: true,
        responsibilities: true,
      },
    });

    return Response.json(employees);
  } catch (error) {
    console.error("Failed to fetch employees:", error);

    return Response.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = createEmployeeSchema.parse(body);

    const employee = await prisma.employee.create({
      data: validatedData,
      include: {
        role: true,
        employmentType: true,
        responsibilities: true,
      },
    });

    return Response.json(employee, { status: 201 });
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

    console.error("Failed to create employee:", error);

    return Response.json(
      { error: "Failed to create employee" },
      { status: 500 },
    );
  }
}
