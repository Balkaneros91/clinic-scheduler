import { prisma } from "@/lib/prisma";
import Link from "next/link";

import { ConfirmActionButton } from "@/components/ConfirmActionButton";
import { Button } from "@/components/ui/button";
import { ScheduleAssignmentCreateDialog } from "@/components/ScheduleAssignmentCreateDialog";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import { ToastMessage } from "@/components/ToastMessage";

import {
  createScheduleAssignmentAction,
  deleteScheduleAssignmentAction,
} from "@/app/dashboard/schedule-assignments/actions/schedule-assignment.actions";

type ScheduleAssignmentsPageProps = {
  searchParams: Promise<{
    scheduleId?: string;
    query?: string;
    page?: string;
    success?: string;
    error?: string;
  }>;
};

export default async function ScheduleAssignmentsPage({
  searchParams,
}: ScheduleAssignmentsPageProps) {
  const {
    scheduleId,
    query,
    page: pageParam,
    success,
    error,
  } = await searchParams;
  const trimmedQuery = query?.trim();
  const searchTerms = trimmedQuery
    ? trimmedQuery
        .split(/[,\s]+/)
        .map((term) => term.trim())
        .filter(Boolean)
    : [];

  const page = Math.max(Number(pageParam) || 1, 1);
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.appRole === "ADMIN";

  const assignmentWhere = {
    ...(scheduleId ? { scheduleId } : {}),
    ...(searchTerms.length > 0
      ? {
          AND: searchTerms.map((term) => ({
            OR: [
              {
                employee: {
                  firstName: { contains: term, mode: "insensitive" as const },
                },
              },
              {
                employee: {
                  lastName: { contains: term, mode: "insensitive" as const },
                },
              },
              {
                department: {
                  name: { contains: term, mode: "insensitive" as const },
                },
              },
              {
                shift: {
                  name: { contains: term, mode: "insensitive" as const },
                },
              },
              {
                schedule: {
                  name: { contains: term, mode: "insensitive" as const },
                },
              },
            ],
          })),
        }
      : {}),
  };

  const scheduleAssignments = await prisma.scheduleAssignment.findMany({
    where: assignmentWhere,
    include: {
      schedule: true,
      employee: true,
      department: true,
      shift: true,
    },
    orderBy: {
      date: "asc",
    },
    take: pageSize,
    skip,
  });

  const totalAssignments = await prisma.scheduleAssignment.count({
    where: assignmentWhere,
  });

  const totalPages = Math.max(Math.ceil(totalAssignments / pageSize), 1);

  const successMessages: Record<string, string> = {
    created: "Schedule assignment created.",
    updated: "Schedule assignment updated.",
    deleted: "Schedule assignment deleted.",
  };

  const errorMessages: Record<string, string> = {
    duplicate: "This assignment already exists.",
  };

  const schedules = await prisma.schedule.findMany({
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  const employees = await prisma.employee.findMany({
    orderBy: { firstName: "asc" },
  });

  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });

  const shiftTemplates = await prisma.shiftTemplate.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <section className="space-y-8">
      {success && successMessages[success] && (
        <ToastMessage
          type={success === "deleted" ? "error" : "success"}
          message={successMessages[success]}
        />
      )}

      {error && errorMessages[error] && (
        <ToastMessage type="error" message={errorMessages[error]} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Scheduling
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Schedule Assignments
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Assign employees to departments and shifts for planned clinic
            schedules.
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {totalAssignments}{" "}
          {totalAssignments === 1 ? "assignment" : "assignments"}
        </div>
      </div>

      {scheduleId && (
        <Button asChild variant="outline">
          <Link href={`/dashboard/schedules/${scheduleId}`}>
            Back to Schedule
          </Link>
        </Button>
      )}

      {isAdmin && (
        <div className="flex justify-end">
          <ScheduleAssignmentCreateDialog
            schedules={schedules}
            employees={employees}
            departments={departments}
            shiftTemplates={shiftTemplates}
            defaultScheduleId={scheduleId}
            action={createScheduleAssignmentAction}
          />
        </div>
      )}

      <form className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto_auto]">
          <input
            type="text"
            name="query"
            defaultValue={query ?? ""}
            placeholder="Search employee, department, shift or schedule"
            className="h-10 rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />

          <select
            name="scheduleId"
            defaultValue={scheduleId ?? ""}
            className="h-10 rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
            <option value="">All schedules</option>
            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.name}
              </option>
            ))}
          </select>

          <Button type="submit">Filter</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/schedule-assignments">Clear</Link>
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        {scheduleAssignments.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              No assignments yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Add your first assignment to start planning schedule coverage.
            </p>
          </div>
        ) : (
          <table className="min-w-225 w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Shift</th>
                <th className="px-4 py-3">Notes</th>
                {isAdmin && <th className="px-4 py-3">Actions</th>}
              </tr>
            </thead>

            <tbody className="divide-y">
              {scheduleAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-t">
                  <td className="px-4 py-3 text-slate-700">
                    {assignment.date.toLocaleDateString("sv-SE")}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {assignment.schedule.name}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {assignment.employee.firstName}{" "}
                    {assignment.employee.lastName}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {assignment.department.name}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {assignment.shift.name} ({assignment.shift.startTime}-
                    {assignment.shift.endTime})
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
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                          <Link
                            href={`/dashboard/schedule-assignments/${assignment.id}/edit`}>
                            Edit
                          </Link>
                        </Button>

                        <form action={deleteScheduleAssignmentAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={assignment.id}
                          />

                          <ConfirmActionButton message="Are you sure you want to delete this schedule assignment?" />
                        </form>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link
              href={{
                pathname: "/dashboard/schedule-assignments",
                query: {
                  ...(query ? { query } : {}),
                  ...(scheduleId ? { scheduleId } : {}),
                  page: Math.max(page - 1, 1),
                },
              }}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : undefined
              }>
              Previous
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link
              href={{
                pathname: "/dashboard/schedule-assignments",
                query: {
                  ...(query ? { query } : {}),
                  ...(scheduleId ? { scheduleId } : {}),
                  page: Math.min(page + 1, totalPages),
                },
              }}
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }>
              Next
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
