import Link from "next/link";

import { ConfirmActionButton } from "@/components/ConfirmActionButton";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/prisma";

import {
  createDepartmentAction,
  deleteDepartmentAction,
} from "@/app/dashboard/departments/actions/department.actions";

export default async function DepartmentsPage() {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.appRole === "ADMIN";

  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Clinic structure
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Departments
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Manage clinic work areas used when generating and reviewing staff
            schedules.
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {departments.length}{" "}
          {departments.length === 1 ? "department" : "departments"}
        </div>
      </div>

      {isAdmin && (
        <form
          action={createDepartmentAction}
          className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-950">
              Add department
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Create a work area such as reception, phone support or examination
              room.
            </p>
          </div>

          <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="text"
              name="name"
              placeholder="Example: Reception"
              className="h-10 rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required
            />

            <Button type="submit">Add Department</Button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Existing departments
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Departments are used when assigning employees to daily clinic work.
          </p>
        </div>

        {departments.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              No departments yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Add your first department to start organizing schedules.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                {isAdmin && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>

            <tbody className="divide-y">
              {departments.map((department) => (
                <tr
                  key={department.id}
                  className="transition duration-150 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-950">
                      {department.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Clinic department
                    </div>
                  </td>

                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline">
                          <Link
                            href={`/dashboard/departments/${department.id}/edit`}>
                            Edit
                          </Link>
                        </Button>

                        <form action={deleteDepartmentAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={department.id}
                          />

                          <ConfirmActionButton message="Are you sure you want to delete this department?" />
                        </form>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
