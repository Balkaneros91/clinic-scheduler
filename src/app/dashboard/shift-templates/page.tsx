import { prisma } from "@/lib/prisma";
import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";

import {
  createShiftTemplateAction,
  deleteShiftTemplateAction,
} from "@/app/dashboard/shift-templates/actions/shift-template.actions";

export default async function ShiftTemplatesPage() {
  const shiftTemplates = await prisma.shiftTemplate.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Shift Templates</h1>

      <form action={createShiftTemplateAction} className="mb-6 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Shift name"
          className="rounded border px-3 py-2"
          required
        />

        <input
          type="time"
          name="startTime"
          className="rounded border px-3 py-2"
          required
        />

        <input
          type="time"
          name="endTime"
          className="rounded border px-3 py-2"
          required
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Add Shift Template
        </button>
      </form>

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
                  <Link
                    href={`/dashboard/shift-templates/${shiftTemplate.id}/edit`}
                    className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </Link>

                  <form action={deleteShiftTemplateAction}>
                    <input type="hidden" name="id" value={shiftTemplate.id} />

                    <DeleteButton message="Are you sure you want to delete this shift template?" />
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
