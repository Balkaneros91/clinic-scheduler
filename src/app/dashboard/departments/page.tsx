import { prisma } from "@/lib/prisma";
import {
  createDepartmentAction,
  deleteDepartmentAction,
} from "@/app/dashboard/departments/actions/department.actions";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Departments</h1>

      <form action={createDepartmentAction} className="mb-6 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Department name"
          className="rounded border px-3 py-2"
          required
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Add Department
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id} className="border-t">
                <td className="p-4 font-medium">{department.name}</td>

                <td className="flex gap-2 p-4">
                  <button className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </button>

                  <form action={deleteDepartmentAction}>
                    <input type="hidden" name="id" value={department.id} />

                    <button className="rounded bg-red-600 px-3 py-2 text-white">
                      Delete
                    </button>
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
