import { prisma } from "@/lib/prisma";
import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";

import {
  createAbsenceAction,
  deleteAbsenceAction,
} from "@/app/dashboard/absences/actions/absence.actions";

export default async function AbsencesPage() {
  const absences = await prisma.absence.findMany({
    include: {
      employee: true,
      absenceType: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  const employees = await prisma.employee.findMany({
    orderBy: {
      firstName: "asc",
    },
  });

  const absenceTypes = await prisma.absenceType.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Absences</h1>

      <form action={createAbsenceAction} className="mb-6 flex flex-wrap gap-2">
        <select name="employeeId" className="rounded border px-3 py-2" required>
          <option value="">Select employee</option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <select
          name="absenceTypeId"
          className="rounded border px-3 py-2"
          required>
          <option value="">Select absence type</option>

          {absenceTypes.map((absenceType) => (
            <option key={absenceType.id} value={absenceType.id}>
              {absenceType.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          className="rounded border px-3 py-2"
          required
        />

        <input
          type="date"
          name="endDate"
          className="rounded border px-3 py-2"
          required
        />

        <input
          type="text"
          name="notes"
          placeholder="Notes"
          className="rounded border px-3 py-2"
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Add Absence
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Type</th>
              <th className="p-4">Start date</th>
              <th className="p-4">End date</th>
              <th className="p-4">Notes</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {absences.map((absence) => (
              <tr key={absence.id} className="border-t">
                <td className="p-4 font-medium">
                  {absence.employee.firstName} {absence.employee.lastName}
                </td>
                <td className="p-4">{absence.absenceType.name}</td>
                <td className="p-4">
                  {absence.startDate.toLocaleDateString("sv-SE")}
                </td>
                <td className="p-4">
                  {absence.endDate.toLocaleDateString("sv-SE")}
                </td>
                <td className="p-4">{absence.notes ?? "-"}</td>
                <td className="flex gap-2 p-4">
                  <Link
                    href={`/dashboard/absences/${absence.id}/edit`}
                    className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </Link>

                  <form action={deleteAbsenceAction}>
                    <input type="hidden" name="id" value={absence.id} />

                    <DeleteButton message="Are you sure you want to delete this absence?" />
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
