import "dotenv/config";
import { prisma } from "../src/lib/prisma";

import employees from "./seed-data/employees.json";
import responsibilities from "./seed-data/responsibilities.json";
import employeeResponsibilities from "./seed-data/employee-responsibilities.json";
import workAreas from "./seed-data/work-areas.json";
import absenceTypes from "./seed-data/absence-types.json";

function splitName(fullName: string, displayName: string) {
  const name = fullName || displayName;
  const parts = name.trim().split(" ");

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || "-",
  };
}

async function main() {
  console.log("Seeding real clinic data...");

  // seed logic
  const roles = [
    "Enhetschef",
    "ÖSSK",
    "SSK",
    "USK",
    "OPT",
    "V-BITR",
    "SSK Timanställd",
    "OPT Timanställd",
  ];

  const employmentTypes = ["Heltid", "Deltid", "Timanställd"];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const name of employmentTypes) {
    await prisma.employmentType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const defaultRole = await prisma.role.findUniqueOrThrow({
    where: { name: "SSK" },
  });

  const defaultEmploymentType = await prisma.employmentType.findUniqueOrThrow({
    where: { name: "Heltid" },
  });

  for (const employee of employees) {
    const { firstName, lastName } = splitName(
      employee.fullName,
      employee.displayName,
    );

    await prisma.employee.upsert({
      where: {
        id: employee.id,
      },
      update: {
        firstName,
        lastName,
        isActive: employee.isActive ?? true,
      },
      create: {
        id: employee.id,
        firstName,
        lastName,
        isActive: employee.isActive ?? true,
        roleId: defaultRole.id,
        employmentTypeId: defaultEmploymentType.id,
      },
    });
  }

  for (const responsibility of responsibilities) {
    await prisma.responsibility.upsert({
      where: { name: responsibility.name },
      update: {},
      create: { name: responsibility.name },
    });
  }

  for (const area of workAreas) {
    await prisma.department.upsert({
      where: { name: area.name },
      update: {},
      create: { name: area.name },
    });
  }

  const shiftTemplates = [
    {
      name: "Morgon",
      startTime: "07:30",
      endTime: "12:00",
      isBreak: false,
    },
    {
      name: "Lunchrast",
      startTime: "12:00",
      endTime: "12:30",
      isBreak: true,
    },
    {
      name: "Eftermiddag",
      startTime: "12:30",
      endTime: "17:00",
      isBreak: false,
    },
    {
      name: "Fredag eftermiddag",
      startTime: "12:30",
      endTime: "14:00",
      isBreak: false,
    },
  ];

  for (const shift of shiftTemplates) {
    await prisma.shiftTemplate.upsert({
      where: { name: shift.name },
      update: shift,
      create: shift,
    });
  }

  for (const absenceType of absenceTypes) {
    await prisma.absenceType.upsert({
      where: { name: absenceType.name },
      update: {},
      create: { name: absenceType.name },
    });
  }

  for (const item of employeeResponsibilities) {
    const employee = await prisma.employee.findUnique({
      where: { id: item.employeeKey },
    });

    if (!employee) {
      console.warn("Missing employee:", item.employeeKey);
      continue;
    }

    const responsibility = await prisma.responsibility.findUnique({
      where: { name: item.responsibilityName },
    });

    if (!responsibility) {
      console.warn("Missing responsibility:", item.responsibilityName);
      continue;
    }

    await prisma.employeeResponsibility.upsert({
      where: {
        employeeId_responsibilityId: {
          employeeId: employee.id,
          responsibilityId: responsibility.id,
        },
      },
      update: {
        proficiency: item.level,
      },
      create: {
        employeeId: employee.id,
        responsibilityId: responsibility.id,
        proficiency: item.level,
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
