import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";
import { prisma } from "@/lib/prisma";

import {
  createScheduleAction,
  deleteScheduleAction,
} from "@/app/dashboard/schedules/actions/schedule.actions";

export default async function SchedulesPage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Schedules</h1>

      <form action={createScheduleAction} className="mb-6 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Schedule name"
          className="rounded border px-3 py-2"
          required
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          className="w-28 rounded border px-3 py-2"
          required
        />

        <input
          type="number"
          name="month"
          placeholder="Month"
          className="w-28 rounded border px-3 py-2"
          min="1"
          max="12"
          required
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Add Schedule
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Year</th>
              <th className="p-4">Month</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="border-t">
                <td className="p-4 font-medium">{schedule.name}</td>
                <td className="p-4">{schedule.year}</td>
                <td className="p-4">{schedule.month}</td>

                <td className="flex gap-2 p-4">
                  <Link
                    href={`/dashboard/schedules/${schedule.id}`}
                    className="rounded bg-blue-600 px-3 py-2 text-white">
                    View
                  </Link>

                  <Link
                    href={`/dashboard/schedules/${schedule.id}/edit`}
                    className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </Link>

                  <form action={deleteScheduleAction}>
                    <input type="hidden" name="id" value={schedule.id} />

                    <DeleteButton message="Are you sure you want to delete this schedule?" />
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
