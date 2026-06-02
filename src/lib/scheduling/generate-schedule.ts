import { prisma } from "@/lib/prisma";

type GenerateScheduleInput = {
  startDate: Date;
  endDate: Date;
};

export async function generateSchedule(input: GenerateScheduleInput) {
  const employees = await prisma.employee.findMany({
    where: {
      isActive: true,
    },
    include: {
      absences: true,
      responsibilities: {
        include: {
          responsibility: true,
        },
      },
    },
  });

  const departments = await prisma.department.findMany();
  const shiftTemplates = await prisma.shiftTemplate.findMany();

  return {
    startDate: input.startDate,
    endDate: input.endDate,
    employeesCount: employees.length,
    departmentsCount: departments.length,
    shiftTemplatesCount: shiftTemplates.length,
  };
}
