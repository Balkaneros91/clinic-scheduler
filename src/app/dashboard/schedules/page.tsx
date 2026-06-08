import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";

import { prisma } from "@/lib/prisma";

import { ScheduleMonthYearFields } from "@/components/ScheduleMonthYearFields";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import {
  createScheduleAction,
  deleteScheduleAction,
} from "@/app/dashboard/schedules/actions/schedule.actions";

export default async function SchedulesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.appRole === "ADMIN";

  const schedules = await prisma.schedule.findMany({
    include: {
      _count: {
        select: {
          assignments: true,
        },
      },
    },
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Scheduling
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Schedules
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Create monthly schedules, generate assignments and review planned
            staffing for the clinic.
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {schedules.length} {schedules.length === 1 ? "schedule" : "schedules"}
        </div>
      </div>

      {error === "duplicate" && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>A schedule for this month and year already exists.</span>

          <Link
            href="/dashboard/schedules"
            className="font-medium text-red-800 underline-offset-4 hover:underline">
            Dismiss
          </Link>
        </div>
      )}

      {isAdmin && (
        <form
          action={createScheduleAction}
          className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-950">
              Create new schedule
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Add a month and year before generating schedule assignments.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_160px_180px_auto]">
            <input
              type="text"
              name="name"
              placeholder="Optional custom schedule name"
              className="rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />

            <ScheduleMonthYearFields />

            <button className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700">
              Add Schedule
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Existing schedules
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Open a schedule to generate assignments or review details.
          </p>
        </div>

        {schedules.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              No schedules yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Create your first monthly schedule to start planning clinic staff.
            </p>
          </div>
        ) : (
          <table className="min-w-200 w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {schedules.map((schedule) => {
                const isGenerated = schedule._count.assignments > 0;

                return (
                  <tr
                    key={schedule.id}
                    className="transition duration-150 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-950">
                        {schedule.name}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            isGenerated
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                          {isGenerated ? "Generated" : "Draft"}
                        </span>

                        <span className="text-xs text-slate-500">
                          Monthly clinic schedule
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {schedule.year}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {monthNames[schedule.month - 1]}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline">
                          <Link href={`/dashboard/schedules/${schedule.id}`}>
                            View
                          </Link>
                        </Button>

                        {isAdmin && (
                          <>
                            <Button asChild variant="outline">
                              <Link
                                href={`/dashboard/schedules/${schedule.id}/edit`}>
                                Edit
                              </Link>
                            </Button>

                            <form action={deleteScheduleAction}>
                              <input
                                type="hidden"
                                name="id"
                                value={schedule.id}
                              />
                              <DeleteButton message="Are you sure you want to delete this schedule?" />
                            </form>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
