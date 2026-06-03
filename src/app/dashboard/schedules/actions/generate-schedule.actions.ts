"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

function getDaysInMonth(year: number, month: number) {
  const days: Date[] = [];
  const date = new Date(year, month - 1, 1);

  while (date.getMonth() === month - 1) {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;

    if (!isWeekend) {
      days.push(new Date(date));
    }

    date.setDate(date.getDate() + 1);
  }

  return days;
}

function isEmployeeAbsentOnDate(
  date: Date,
  absences: { startDate: Date; endDate: Date }[],
) {
  return absences.some((absence) => {
    return date >= absence.startDate && date <= absence.endDate;
  });
}

export async function generateScheduleAction(formData: FormData) {
  const scheduleId = formData.get("scheduleId") as string;

  if (!scheduleId) {
    throw new Error("Schedule ID is required");
  }

  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  const employees = await prisma.employee.findMany({
    where: { isActive: true },
    include: {
      absences: true,
    },
    orderBy: {
      firstName: "asc",
    },
  });

  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const shifts = await prisma.shiftTemplate.findMany({
    where: {
      isBreak: false,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  if (
    employees.length === 0 ||
    departments.length === 0 ||
    shifts.length === 0
  ) {
    throw new Error("Employees, departments and shifts are required");
  }

  const days = getDaysInMonth(schedule.year, schedule.month);

  let employeeIndex = 0;

  for (const date of days) {
    const assignedEmployeeIdsForDate = new Set<string>();

    for (const department of departments) {
      for (const shift of shifts) {
        const availableEmployees = employees.filter(
          (employee) =>
            !assignedEmployeeIdsForDate.has(employee.id) &&
            !isEmployeeAbsentOnDate(date, employee.absences),
        );

        if (availableEmployees.length === 0) {
          continue;
        }

        const employee =
          availableEmployees[employeeIndex % availableEmployees.length];

        employeeIndex += 1;

        const existingAssignment = await prisma.scheduleAssignment.findFirst({
          where: {
            scheduleId: schedule.id,
            date,
            employeeId: employee.id,
            departmentId: department.id,
            shiftId: shift.id,
          },
        });

        if (!existingAssignment) {
          await prisma.scheduleAssignment.create({
            data: {
              scheduleId: schedule.id,
              date,
              employeeId: employee.id,
              departmentId: department.id,
              shiftId: shift.id,
              notes: "Generated automatically",
            },
          });

          assignedEmployeeIdsForDate.add(employee.id);
        }
      }
    }
  }

  revalidatePath(`/dashboard/schedules/${scheduleId}`);
}
