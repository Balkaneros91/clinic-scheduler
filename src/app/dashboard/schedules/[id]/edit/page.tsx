import Link from "next/link";
import { notFound } from "next/navigation";

import { updateScheduleAction } from "@/app/dashboard/schedules/actions/schedule.actions";
import { prisma } from "@/lib/prisma";

type EditSchedulePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSchedulePage({
  params,
}: EditSchedulePageProps) {
  const { id } = await params;

  const schedule = await prisma.schedule.findUnique({
    where: { id },
  });

  if (!schedule) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Schedule</h1>

      <form action={updateScheduleAction} className="max-w-md space-y-4">
        <input type="hidden" name="id" value={schedule.id} />

        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Schedule name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={schedule.name}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="year" className="mb-2 block font-medium">
            Year
          </label>

          <input
            id="year"
            name="year"
            type="number"
            defaultValue={schedule.year}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="month" className="mb-2 block font-medium">
            Month
          </label>

          <input
            id="month"
            name="month"
            type="number"
            defaultValue={schedule.month}
            min="1"
            max="12"
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="flex gap-2">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">
            Save changes
          </button>

          <Link
            href="/dashboard/schedules"
            className="rounded bg-gray-200 px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
