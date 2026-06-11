import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

import { generateScheduleAction } from "@/app/dashboard/schedules/actions/generate-schedule.actions";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import { ToastMessage } from "@/components/ToastMessage";

type ScheduleDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    success?: string;
  }>;
};

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

export default async function ScheduleDetailsPage({
  params,
  searchParams,
}: ScheduleDetailsPageProps) {
  const { success } = await searchParams;
  const { id } = await params;

  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.appRole === "ADMIN";

  const schedule = await prisma.schedule.findUnique({
    where: { id },
    include: {
      assignments: {
        include: {
          employee: true,
          department: true,
          shift: true,
        },
        orderBy: [
          { date: "asc" },
          { shift: { startTime: "asc" } },
          { department: { name: "asc" } },
          { employee: { firstName: "asc" } },
        ],
      },
    },
  });

  if (!schedule) {
    notFound();
  }

  const assignmentsByDate = schedule.assignments.reduce<
    Record<string, typeof schedule.assignments>
  >((groups, assignment) => {
    const dateKey = assignment.date.toLocaleDateString("sv-SE");

    groups[dateKey] = groups[dateKey] ?? [];
    groups[dateKey].push(assignment);

    return groups;
  }, {});

  Object.values(assignmentsByDate).forEach((assignments) => {
    assignments.sort((a, b) => {
      const shiftCompare = a.shift.startTime.localeCompare(b.shift.startTime);

      if (shiftCompare !== 0) {
        return shiftCompare;
      }

      const departmentCompare = a.department.name.localeCompare(
        b.department.name,
      );

      if (departmentCompare !== 0) {
        return departmentCompare;
      }

      return a.employee.firstName.localeCompare(b.employee.firstName);
    });
  });

  const assignmentCount = schedule.assignments.length;
  const scheduledDaysCount = Object.keys(assignmentsByDate).length;

  const successMessages: Record<string, string> = {
    generated: "Schedule assignments generated successfully.",
    regenerated:
      "Schedule regenerated. Existing generated assignments were replaced, while manual assignments were preserved.",
    "assignment-updated": "Schedule assignment updated.",
  };

  return (
    <section className="space-y-8">
      {success && successMessages[success] && (
        <ToastMessage type="success" message={successMessages[success]} />
      )}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/dashboard/schedules"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
              ← Back to schedules
            </Link>

            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
              Schedule details
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {schedule.name}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              {monthNames[schedule.month - 1]} {schedule.year}
            </p>
          </div>

          {isAdmin && (
            <div className="flex flex-wrap gap-2">
              <form action={generateScheduleAction}>
                <input type="hidden" name="scheduleId" value={schedule.id} />

                <Button
                  type="submit"
                  className="bg-emerald-600 text-white hover:bg-emerald-700">
                  Generate / Regenerate Schedule
                </Button>
              </form>

              <Button asChild variant="outline">
                <Link
                  href={`/dashboard/schedule-assignments?scheduleId=${schedule.id}`}>
                  Add Assignment
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href={`/dashboard/schedules/${schedule.id}/edit`}>
                  Edit
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Assignments</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {assignmentCount}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Planned staff assignments.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Scheduled days</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {scheduledDaysCount}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Days with at least one assignment.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Status</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {assignmentCount > 0 ? "Generated" : "Draft"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Current schedule planning state.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Assignments
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Review planned employees by date, department and shift.
          </p>
        </div>

        {assignmentCount === 0 ? (
          <div className="rounded-2xl border bg-white px-6 py-12 text-center shadow-sm">
            <h3 className="text-base font-semibold text-slate-950">
              No assignments yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Generate the schedule or add assignments manually to start
              planning this month.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {Object.entries(assignmentsByDate).map(([date, assignments]) => (
              <div
                key={date}
                className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">
                      {date}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {assignments.length}{" "}
                      {assignments.length === 1 ? "assignment" : "assignments"}
                    </p>
                  </div>
                </div>

                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Employee</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Shift</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Notes</th>
                      {isAdmin && (
                        <th className="px-4 py-3 text-right">Actions</th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {assignments.map((assignment) => (
                      <tr
                        key={assignment.id}
                        className="transition duration-150 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-950">
                          {assignment.employee.firstName}{" "}
                          {assignment.employee.lastName}
                        </td>

                        <td className="px-4 py-3 text-slate-700">
                          {assignment.department.name}
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                            {assignment.shift.name}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-slate-700">
                          {assignment.shift.startTime}–
                          {assignment.shift.endTime}
                        </td>

                        <td className="px-4 py-3">
                          {assignment.notes === "Generated automatically" ? (
                            <span className="inline-flex whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              Auto-generated
                            </span>
                          ) : (
                            <span className="text-slate-700">
                              {assignment.notes ?? "-"}
                            </span>
                          )}
                        </td>

                        {isAdmin && (
                          <td className="px-4 py-3">
                            <div className="flex justify-end">
                              <Button asChild variant="outline">
                                <Link
                                  href={`/dashboard/schedule-assignments/${assignment.id}/edit`}>
                                  Edit
                                </Link>
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
