import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateAbsenceAction } from "@/app/dashboard/absences/actions/absence.actions";

type EditAbsencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAbsencePage({
  params,
}: EditAbsencePageProps) {
  const { id } = await params;

  const absence = await prisma.absence.findUnique({
    where: { id },
  });

  if (!absence) {
    notFound();
  }

  const employees = await prisma.employee.findMany({
    orderBy: { firstName: "asc" },
  });

  const absenceTypes = await prisma.absenceType.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Absence</h1>

      <form action={updateAbsenceAction} className="max-w-md space-y-4">
        <input type="hidden" name="id" value={absence.id} />

        <select
          name="employeeId"
          defaultValue={absence.employeeId}
          className="w-full rounded border px-3 py-2"
          required>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <select
          name="absenceTypeId"
          defaultValue={absence.absenceTypeId}
          className="w-full rounded border px-3 py-2"
          required>
          {absenceTypes.map((absenceType) => (
            <option key={absenceType.id} value={absenceType.id}>
              {absenceType.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          defaultValue={absence.startDate.toISOString().split("T")[0]}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="date"
          name="endDate"
          defaultValue={absence.endDate.toISOString().split("T")[0]}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="text"
          name="notes"
          defaultValue={absence.notes ?? ""}
          placeholder="Notes"
          className="w-full rounded border px-3 py-2"
        />

        <div className="flex gap-2">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">
            Save Changes
          </button>

          <Link
            href="/dashboard/absences"
            className="rounded bg-gray-200 px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
