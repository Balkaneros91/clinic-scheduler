import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
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
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Employee</h1>

      <form action={updateEmployeeAction} className="max-w-md space-y-4">
        <input type="hidden" name="id" value={employee.id} />

        <div>
          <label className="block font-medium">First name</label>
          <input
            name="firstName"
            defaultValue={employee.firstName}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Last name</label>
          <input
            name="lastName"
            defaultValue={employee.lastName}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="roleId"
            defaultValue={employee.roleId}
            required
            className="w-full rounded border p-2">
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
            defaultValue={employee.employmentTypeId}
            required
            className="w-full rounded border p-2">
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
                  defaultChecked={selectedResponsibilities.includes(
                    responsibility.id,
                  )}
                />
                <span>{responsibility.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="rounded bg-black px-4 py-2 text-white">
          Save changes
        </button>
      </form>
    </main>
  );
}
