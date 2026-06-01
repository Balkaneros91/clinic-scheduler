import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

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

  findById(id: string) {
    return prisma.employee.findUnique({
      where: { id },
      include: {
        role: true,
        employmentType: true,
      },
    });
  },

  create(data: Prisma.EmployeeCreateInput) {
    return prisma.employee.create({
      data,
    });
  },

  update(id: string, data: Prisma.EmployeeUpdateInput) {
    return prisma.employee.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.employee.delete({
      where: { id },
    });
  },
};
