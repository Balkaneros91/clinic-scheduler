import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import { employeeService } from "@/server/services/employee.service";
import { updateEmployeeAction } from "@/app/dashboard/employees/actions/employee.actions";

type EditEmployeePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEmployeePage({
  params,
}: EditEmployeePageProps) {
  const { id } = await params;

  const employee = await employeeService.getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  const roles = await prisma.role.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const employmentTypes = await prisma.employmentType.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const responsibilities = await prisma.responsibility.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const selectedResponsibilities = employee.responsibilities.map(
    (item) => item.responsibilityId,
  );

  return (
    <section className="space-y-8">
      <div>
        <Link
          href="/dashboard/employees"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← Back to employees
        </Link>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
          Staff
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit Employee
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update employee details, role, employment type and responsibilities.
        </p>
      </div>

      <form
        action={updateEmployeeAction}
        className="max-w-3xl rounded-2xl border bg-white p-5 shadow-sm">
        <input type="hidden" name="id" value={employee.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              First name
            </label>
            <input
              name="firstName"
              defaultValue={employee.firstName}
              required
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Last name
            </label>
            <input
              name="lastName"
              defaultValue={employee.lastName}
              required
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Role</label>
            <select
              name="roleId"
              defaultValue={employee.roleId}
              required
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Employment type
            </label>
            <select
              name="employmentTypeId"
              defaultValue={employee.employmentTypeId}
              required
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
              {employmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Responsibilities
            </label>

            <div className="mt-2 grid gap-2 rounded-xl border bg-slate-50 p-4 sm:grid-cols-2">
              {responsibilities.map((responsibility) => (
                <label
                  key={responsibility.id}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="responsibilityIds"
                    value={responsibility.id}
                    defaultChecked={selectedResponsibilities.includes(
                      responsibility.id,
                    )}
                    className="h-4 w-4"
                  />
                  <span>{responsibility.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit">Save changes</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/employees">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
