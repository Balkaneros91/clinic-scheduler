import { prisma } from "@/lib/prisma";
import { createEmployeeAction } from "@/app/dashboard/employees/actions/employee.actions";

export default async function NewEmployeePage() {
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

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Create Employee</h1>

      <form action={createEmployeeAction} className="max-w-md space-y-4">
        <div>
          <label className="block font-medium">First name</label>
          <input
            name="firstName"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Last name</label>
          <input
            name="lastName"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select name="roleId" required className="w-full rounded border p-2">
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Employment type</label>
          <select
            name="employmentTypeId"
            required
            className="w-full rounded border p-2">
            <option value="">Select employment type</option>
            {employmentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Responsibilities</label>

          <div className="mt-2 space-y-2 rounded border p-3">
            {responsibilities.map((responsibility) => (
              <label
                key={responsibility.id}
                className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="responsibilityIds"
                  value={responsibility.id}
                />
                <span>{responsibility.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="rounded bg-black px-4 py-2 text-white">
          Save employee
        </button>
      </form>
    </main>
  );
}
