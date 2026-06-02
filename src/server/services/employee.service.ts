import { employeeRepository } from "@/server/repositories/employee.repository";
import type { Prisma } from "@/generated/prisma/client";

export const employeeService = {
  async getAllEmployees() {
    const employees = await employeeRepository.findAll();

    return employees.map((employee) => ({
      id: employee.id,
      fullName: `${employee.firstName} ${employee.lastName}`,
      role: employee.role.name,
      employmentType: employee.employmentType.name,
      responsibilities: employee.responsibilities.map(
        (item) => item.responsibility.name,
      ),
      isActive: employee.isActive,
    }));
  },

  async getEmployeeById(id: string) {
    return employeeRepository.findById(id);
  },

  async createEmployee(data: Prisma.EmployeeCreateInput) {
    return employeeRepository.create(data);
  },

  async updateEmployee(id: string, data: Prisma.EmployeeUpdateInput) {
    return employeeRepository.update(id, data);
  },

  async deleteEmployee(id: string) {
    return employeeRepository.delete(id);
  },
};
