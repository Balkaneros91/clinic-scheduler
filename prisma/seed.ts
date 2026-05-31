import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");

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

  const responsibilities = [
    "Reception",
    "Telefon",
    "Förundersökning",
    "Inventering",
    "Undersökningsrum",
    "Optikerarbete",
  ];

  const departments = ["Reception", "Undersökningsrum", "Telefonstöd"];

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

  const absenceTypes = ["Sjukdom", "Semester", "Utbildning", "VAB", "Övrigt"];

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

  for (const name of responsibilities) {
    await prisma.responsibility.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const name of departments) {
    await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const shift of shiftTemplates) {
    await prisma.shiftTemplate
      .upsert({
        where: {
          id: shift.name,
        },
        update: {},
        create: shift,
      })
      .catch(async () => {
        const existing = await prisma.shiftTemplate.findFirst({
          where: { name: shift.name },
        });

        if (!existing) {
          await prisma.shiftTemplate.create({
            data: shift,
          });
        }
      });
  }

  for (const name of absenceTypes) {
    await prisma.absenceType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const roleSSK = await prisma.role.findUniqueOrThrow({
    where: { name: "SSK" },
  });

  const roleUSK = await prisma.role.findUniqueOrThrow({
    where: { name: "USK" },
  });

  const roleOPT = await prisma.role.findUniqueOrThrow({
    where: { name: "OPT" },
  });

  const roleBoss = await prisma.role.findUniqueOrThrow({
    where: { name: "Enhetschef" },
  });

  const fullTime = await prisma.employmentType.findUniqueOrThrow({
    where: { name: "Heltid" },
  });

  const partTime = await prisma.employmentType.findUniqueOrThrow({
    where: { name: "Deltid" },
  });

  const hourly = await prisma.employmentType.findUniqueOrThrow({
    where: { name: "Timanställd" },
  });

  const employees = [
    {
      firstName: "Anna",
      lastName: "Andersson",
      roleId: roleBoss.id,
      employmentTypeId: fullTime.id,
    },
    {
      firstName: "Maria",
      lastName: "Johansson",
      roleId: roleSSK.id,
      employmentTypeId: fullTime.id,
    },
    {
      firstName: "Eva",
      lastName: "Karlsson",
      roleId: roleSSK.id,
      employmentTypeId: partTime.id,
    },
    {
      firstName: "Sara",
      lastName: "Nilsson",
      roleId: roleUSK.id,
      employmentTypeId: fullTime.id,
    },
    {
      firstName: "Lina",
      lastName: "Berg",
      roleId: roleOPT.id,
      employmentTypeId: fullTime.id,
    },
    {
      firstName: "Peter",
      lastName: "Eriksson",
      roleId: roleSSK.id,
      employmentTypeId: hourly.id,
    },
  ];

  for (const employee of employees) {
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        firstName: employee.firstName,
        lastName: employee.lastName,
      },
    });

    if (!existingEmployee) {
      await prisma.employee.create({
        data: employee,
      });
    }
  }

  const maria = await prisma.employee.findFirstOrThrow({
    where: { firstName: "Maria", lastName: "Johansson" },
  });

  const sara = await prisma.employee.findFirstOrThrow({
    where: { firstName: "Sara", lastName: "Nilsson" },
  });

  const reception = await prisma.responsibility.findUniqueOrThrow({
    where: { name: "Reception" },
  });

  const phone = await prisma.responsibility.findUniqueOrThrow({
    where: { name: "Telefon" },
  });

  const examination = await prisma.responsibility.findUniqueOrThrow({
    where: { name: "Förundersökning" },
  });

  await prisma.employeeResponsibility.upsert({
    where: {
      employeeId_responsibilityId: {
        employeeId: maria.id,
        responsibilityId: phone.id,
      },
    },
    update: {},
    create: {
      employeeId: maria.id,
      responsibilityId: phone.id,
      proficiency: 5,
    },
  });

  await prisma.employeeResponsibility.upsert({
    where: {
      employeeId_responsibilityId: {
        employeeId: sara.id,
        responsibilityId: reception.id,
      },
    },
    update: {},
    create: {
      employeeId: sara.id,
      responsibilityId: reception.id,
      proficiency: 4,
    },
  });

  await prisma.employeeResponsibility.upsert({
    where: {
      employeeId_responsibilityId: {
        employeeId: maria.id,
        responsibilityId: examination.id,
      },
    },
    update: {},
    create: {
      employeeId: maria.id,
      responsibilityId: examination.id,
      proficiency: 4,
    },
  });

  const sickness = await prisma.absenceType.findUniqueOrThrow({
    where: { name: "Sjukdom" },
  });

  await prisma.absence.create({
    data: {
      employeeId: maria.id,
      absenceTypeId: sickness.id,
      startDate: new Date("2026-06-10"),
      endDate: new Date("2026-06-12"),
      notes: "Testfrånvaro för schemaläggning",
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
