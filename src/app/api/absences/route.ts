import { prisma } from "@/lib/prisma";
import { createAbsenceSchema } from "@/lib/validations/absence";
import { ZodError } from "zod";

export async function GET() {
  try {
    const absences = await prisma.absence.findMany({
      include: {
        employee: true,
        absenceType: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return Response.json(absences);
  } catch (error) {
    console.error("Failed to fetch absences:", error);

    return Response.json(
      { error: "Failed to fetch absences" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = createAbsenceSchema.parse(body);

    const absence = await prisma.absence.create({
      data: {
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        notes: validatedData.notes,
        employeeId: validatedData.employeeId,
        absenceTypeId: validatedData.absenceTypeId,
      },
      include: {
        employee: true,
        absenceType: true,
      },
    });

    return Response.json(absence, { status: 201 });
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

    console.error("Failed to create absence:", error);

    return Response.json(
      { error: "Failed to create absence" },
      { status: 500 },
    );
  }
}
