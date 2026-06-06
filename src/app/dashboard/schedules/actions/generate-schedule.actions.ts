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

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isEmployeeAbsentOnDate(
  date: Date,
  absences: { startDate: Date; endDate: Date }[],
) {
  const targetDate = startOfDay(date);

  return absences.some((absence) => {
    const absenceStart = startOfDay(absence.startDate);
    const absenceEnd = startOfDay(absence.endDate);

    return targetDate >= absenceStart && targetDate <= absenceEnd;
  });
}

function isShiftAllowedOnDate(date: Date, shiftName: string) {
  const day = date.getDay();
  const isFriday = day === 5;

  if (shiftName === "Fredag eftermiddag") {
    return isFriday;
  }

  if (shiftName === "Eftermiddag") {
    return !isFriday;
  }

  return true;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function doShiftsOverlap(
  shiftA: { startTime: string; endTime: string },
  shiftB: { startTime: string; endTime: string },
) {
  const shiftAStart = timeToMinutes(shiftA.startTime);
  const shiftAEnd = timeToMinutes(shiftA.endTime);
  const shiftBStart = timeToMinutes(shiftB.startTime);
  const shiftBEnd = timeToMinutes(shiftB.endTime);

  return shiftAStart < shiftBEnd && shiftBStart < shiftAEnd;
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

  await prisma.scheduleAssignment.deleteMany({
    where: {
      scheduleId: schedule.id,
      notes: "Generated automatically",
    },
  });

  const employees = await prisma.employee.findMany({
    where: { isActive: true },
    include: {
      absences: true,
      responsibilities: {
        include: {
          responsibility: true,
        },
      },
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
        if (!isShiftAllowedOnDate(date, shift.name)) {
          continue;
        }

        const availableEmployees = employees.filter((employee) => {
          const hasDepartmentResponsibility = employee.responsibilities.some(
            (employeeResponsibility) =>
              employeeResponsibility.responsibility.name === department.name,
          );

          return (
            hasDepartmentResponsibility &&
            !assignedEmployeeIdsForDate.has(employee.id) &&
            !isEmployeeAbsentOnDate(date, employee.absences)
          );
        });

        if (availableEmployees.length === 0) {
          continue;
        }

        const employee =
          availableEmployees[employeeIndex % availableEmployees.length];

        employeeIndex += 1;

        const existingAssignmentsForEmployee =
          await prisma.scheduleAssignment.findMany({
            where: {
              date,
              employeeId: employee.id,
            },
            include: {
              shift: true,
            },
          });

        const hasOverlappingAssignment = existingAssignmentsForEmployee.some(
          (assignment) => doShiftsOverlap(assignment.shift, shift),
        );

        if (!hasOverlappingAssignment) {
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
