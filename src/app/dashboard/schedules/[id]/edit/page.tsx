import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScheduleMonthYearFields } from "@/components/ScheduleMonthYearFields";
import { updateScheduleAction } from "@/app/dashboard/schedules/actions/schedule.actions";
import { requireRole } from "@/lib/auth/requireRole";

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

  await requireRole("ADMIN");

  const schedule = await prisma.schedule.findUnique({
    where: { id },
  });

  if (!schedule) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          href="/dashboard/schedules"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← Back to schedules
        </Link>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
          Scheduling
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit Schedule
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update the schedule name, year and month used for clinic planning.
        </p>
      </div>

      <form
        action={updateScheduleAction}
        className="max-w-3xl rounded-2xl border bg-white p-5 shadow-sm">
        <input type="hidden" name="id" value={schedule.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700">
              Schedule name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={schedule.name}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Schedule period
            </label>

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <ScheduleMonthYearFields
                defaultYear={String(schedule.year)}
                defaultMonth={String(schedule.month)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit">Save changes</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/schedules">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
