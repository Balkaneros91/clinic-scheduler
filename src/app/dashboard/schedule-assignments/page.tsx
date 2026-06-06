import { prisma } from "@/lib/prisma";
import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { DateSelectField } from "@/components/DateSelectField";

import {
  createScheduleAssignmentAction,
  deleteScheduleAssignmentAction,
} from "@/app/dashboard/schedule-assignments/actions/schedule-assignment.actions";

type ScheduleAssignmentsPageProps = {
  searchParams: Promise<{
    scheduleId?: string;
  }>;
};

export default async function ScheduleAssignmentsPage({
  searchParams,
}: ScheduleAssignmentsPageProps) {
  const { scheduleId } = await searchParams;
  const scheduleAssignments = await prisma.scheduleAssignment.findMany({
    where: scheduleId ? { scheduleId } : undefined,
    include: {
      schedule: true,
      employee: true,
      department: true,
      shift: true,
    },
    orderBy: {
      date: "asc",
    },
  });

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
          {scheduleAssignments.length}{" "}
          {scheduleAssignments.length === 1 ? "assignment" : "assignments"}
        </div>
      </div>

      {scheduleId && (
        <Button asChild variant="outline">
          <Link href={`/dashboard/schedules/${scheduleId}`}>
            Back to Schedule
          </Link>
        </Button>
      )}

      <form
        action={createScheduleAssignmentAction}
        className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Add assignment
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manually assign an employee to a department and shift.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          <DateSelectField name="date" required yearsBack={1} yearsAhead={5} />

          <select
            name="scheduleId"
            defaultValue={scheduleId ?? ""}
            className="h-10 rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required>
            <option value="">Select schedule</option>

            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.name} ({schedule.year}/{schedule.month})
              </option>
            ))}
          </select>

          <select
            name="employeeId"
            className="h-10 rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required>
            <option value="">Select employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>

          <select
            name="departmentId"
            className="h-10 rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required>
            <option value="">Select department</option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          <select
            name="shiftId"
            className="h-10 rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required>
            <option value="">Select shift</option>

            {shiftTemplates.map((shiftTemplate) => (
              <option key={shiftTemplate.id} value={shiftTemplate.id}>
                {shiftTemplate.name} ({shiftTemplate.startTime}-
                {shiftTemplate.endTime})
              </option>
            ))}
          </select>

          <input
            type="text"
            name="notes"
            placeholder="Notes"
            className="h-10 rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />

          <div className="flex items-end">
            <Button type="submit">Add Assignment</Button>
          </div>
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
                <th className="px-4 py-3">Actions</th>
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

                  <td className="px-4 py-3 text-slate-700">
                    {assignment.notes ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline">
                        <Link
                          href={`/dashboard/schedule-assignments/${assignment.id}/edit`}>
                          Edit
                        </Link>
                      </Button>

                      <form action={deleteScheduleAssignmentAction}>
                        <input type="hidden" name="id" value={assignment.id} />

                        <DeleteButton message="Are you sure you want to delete this schedule assignment?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
