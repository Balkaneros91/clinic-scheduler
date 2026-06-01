import { employeeService } from "@/server/services/employee.service";

export default async function EmployeesPage() {
  const employees = await employeeService.getAllEmployees();

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Employees</h1>

      <div className="grid gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{employee.fullName}</h2>
            <p>Role: {employee.role}</p>
            <p>Employment type: {employee.employmentType}</p>
            <p>Status: {employee.isActive ? "Active" : "Inactive"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
