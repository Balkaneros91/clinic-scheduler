import { prisma } from "@/lib/prisma";

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

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Absences</h1>

      <button className="mb-6 rounded bg-blue-600 px-4 py-2 text-white">
        Add Absence
      </button>

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
                  <button className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </button>
                  <button className="rounded bg-red-600 px-3 py-2 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
