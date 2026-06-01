import { employeeRepository } from "@/server/repositories/employee.repository";

export const employeeService = {
  async getAllEmployees() {
    const employees = await employeeRepository.findAll();

    return employees.map((employee) => ({
      id: employee.id,
      fullName: `${employee.firstName} ${employee.lastName}`,
      role: employee.role.name,
      employmentType: employee.employmentType.name,
      isActive: employee.isActive,
    }));
  },
};
