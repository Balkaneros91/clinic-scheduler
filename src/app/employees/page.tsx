import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";

import { employeeService } from "@/server/services/employee.service";
import { deleteEmployeeAction } from "@/app/employees/actions/employee.actions";

export default async function EmployeesPage() {
  const employees = await employeeService.getAllEmployees();

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Employees</h1>

      <Link
        href="/employees/new"
        className="mb-6 inline-block rounded bg-blue-600 px-4 py-2 text-white">
        Create employee
      </Link>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Employment type</th>
              <th className="p-4">Responsibilities</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="p-4 font-medium">{employee.fullName}</td>
                <td className="p-4">{employee.role}</td>
                <td className="p-4">{employee.employmentType}</td>
                <td className="p-4">
                  {employee.responsibilities.length > 0
                    ? employee.responsibilities.join(", ")
                    : "-"}
                </td>
                <td className="p-4">
                  {employee.isActive ? "Active" : "Inactive"}
                </td>
                <td className="flex gap-2 p-4">
                  <Link
                    href={`/employees/${employee.id}/edit`}
                    className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </Link>

                  <form action={deleteEmployeeAction}>
                    <input type="hidden" name="id" value={employee.id} />
                    <DeleteButton message="Are you sure you want to delete this employee?" />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
