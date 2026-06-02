import { prisma } from "@/lib/prisma";

export default async function ShiftTemplatesPage() {
  const shiftTemplates = await prisma.shiftTemplate.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Shift Templates</h1>

      <button className="mb-6 rounded bg-blue-600 px-4 py-2 text-white">
        Add Shift Template
      </button>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Start</th>
              <th className="p-4">End</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {shiftTemplates.map((shiftTemplate) => (
              <tr key={shiftTemplate.id} className="border-t">
                <td className="p-4 font-medium">{shiftTemplate.name}</td>
                <td className="p-4">{shiftTemplate.startTime}</td>
                <td className="p-4">{shiftTemplate.endTime}</td>

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
