import { prisma } from "@/lib/prisma";
import { createShiftTemplateSchema } from "@/lib/validations/shift-template";
import { ZodError } from "zod";

export async function GET() {
  try {
    const shiftTemplates = await prisma.shiftTemplate.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return Response.json(shiftTemplates);
  } catch (error) {
    console.error("Failed to fetch shift templates:", error);

    return Response.json(
      { error: "Failed to fetch shift templates" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = createShiftTemplateSchema.parse(body);

    const shiftTemplate = await prisma.shiftTemplate.create({
      data: {
        name: validatedData.name,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        isBreak: validatedData.isBreak ?? false,
      },
    });

    return Response.json(shiftTemplate, { status: 201 });
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

    console.error("Failed to create shift template:", error);

    return Response.json(
      { error: "Failed to create shift template" },
      { status: 500 },
    );
  }
}
