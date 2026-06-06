import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";

import { employeeService } from "@/server/services/employee.service";
import { deleteEmployeeAction } from "@/app/dashboard/employees/actions/employee.actions";

export default async function EmployeesPage() {
  const employees = await employeeService.getAllEmployees();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Staff
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Employees
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Manage clinic employees, roles, employment types and
            responsibilities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {employees.length}{" "}
            {employees.length === 1 ? "employee" : "employees"}
          </div>

          <Button asChild>
            <Link href="/dashboard/employees/new">Create employee</Link>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        {employees.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              No employees yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Create your first employee to start planning schedules.
            </p>
          </div>
        ) : (
          <table className="min-w-225 w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Employment type</th>
                <th className="px-4 py-3">Responsibilities</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="transition duration-150 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700">
                    {employee.fullName}
                  </td>

                  <td className="px-4 py-3 text-slate-700">{employee.role}</td>

                  <td className="px-4 py-3 text-slate-700">
                    {employee.employmentType}
                  </td>

                  <td className="max-w-md px-4 py-3 text-slate-700">
                    {employee.responsibilities.length > 0
                      ? employee.responsibilities.join(", ")
                      : "—"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        employee.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                      {employee.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="outline">
                        <Link href={`/dashboard/employees/${employee.id}/edit`}>
                          Edit
                        </Link>
                      </Button>

                      <form action={deleteEmployeeAction}>
                        <input type="hidden" name="id" value={employee.id} />
                        <DeleteButton message="Are you sure you want to delete this employee?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
