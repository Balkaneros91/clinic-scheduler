import { prisma } from "@/lib/prisma";

export const employeeRepository = {
  findAll() {
    return prisma.employee.findMany({
      include: {
        role: true,
        employmentType: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
  },
};
