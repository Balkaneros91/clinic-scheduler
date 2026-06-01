import Link from "next/link";

import { employeeService } from "@/server/services/employee.service";
import { deleteEmployeeAction } from "@/app/employees/actions/employee.actions";

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

            <form action={deleteEmployeeAction} className="mt-4">
              <input type="hidden" name="id" value={employee.id} />
              <button className="rounded bg-red-600 px-4 py-2 text-white">
                Delete
              </button>
            </form>

            <Link
              href={`/employees/${employee.id}/edit`}
              className="mr-3 inline-block rounded bg-gray-800 px-4 py-2 text-white">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
