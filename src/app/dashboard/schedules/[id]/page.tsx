import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

type ScheduleDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ScheduleDetailsPage({
  params,
}: ScheduleDetailsPageProps) {
  const { id } = await params;

  const schedule = await prisma.schedule.findUnique({
    where: { id },
    include: {
      assignments: {
        include: {
          employee: true,
          department: true,
          shift: true,
        },
        orderBy: {
          date: "asc",
        },
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

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{schedule.name}</h1>
          <p className="text-gray-600">
            {schedule.year} / {schedule.month}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/dashboard/schedule-assignments?scheduleId=${schedule.id}`}
            className="rounded bg-blue-600 px-4 py-2 text-white">
            Add Assignment
          </Link>

          <Link
            href={`/dashboard/schedules/${schedule.id}/edit`}
            className="rounded bg-gray-800 px-4 py-2 text-white">
            Edit
          </Link>

          <Link
            href="/dashboard/schedules"
            className="rounded bg-gray-200 px-4 py-2">
            Back
          </Link>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Assignments</h2>

        {schedule.assignments.length === 0 ? (
          <p className="rounded border bg-gray-50 p-4 text-gray-600">
            No assignments have been added to this schedule yet.
          </p>
        ) : (
          <div className="space-y-6">
            {Object.entries(assignmentsByDate).map(([date, assignments]) => (
              <div
                key={date}
                className="overflow-hidden rounded-lg border shadow-sm">
                <div className="bg-gray-100 p-4">
                  <h3 className="text-lg font-semibold">{date}</h3>
                </div>

                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="p-4">Employee</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Shift</th>
                      <th className="p-4">Notes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="border-t">
                        <td className="p-4">
                          {assignment.employee.firstName}{" "}
                          {assignment.employee.lastName}
                        </td>
                        <td className="p-4">{assignment.department.name}</td>
                        <td className="p-4">
                          {assignment.shift.name} ({assignment.shift.startTime}-
                          {assignment.shift.endTime})
                        </td>
                        <td className="p-4">{assignment.notes ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
