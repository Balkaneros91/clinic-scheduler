import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateScheduleAssignmentAction } from "@/app/dashboard/schedule-assignments/actions/schedule-assignment.actions";
import { Button } from "@/components/ui/button";
import { DateSelectField } from "@/components/DateSelectField";
import { requireRole } from "@/lib/auth/requireRole";

type EditScheduleAssignmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditScheduleAssignmentPage({
  params,
}: EditScheduleAssignmentPageProps) {
  const { id } = await params;

  await requireRole("ADMIN");

  const assignment = await prisma.scheduleAssignment.findUnique({
    where: { id },
  });

  if (!assignment) {
    notFound();
  }

  const employees = await prisma.employee.findMany({
    orderBy: { firstName: "asc" },
  });

  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });

  const shiftTemplates = await prisma.shiftTemplate.findMany({
    orderBy: { name: "asc" },
  });

  const schedules = await prisma.schedule.findMany({
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  return (
    <section className="space-y-8">
      <div>
        <Link
          href="/dashboard/schedule-assignments"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← Back to assignments
        </Link>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
          Scheduling
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit Schedule Assignment
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update the employee, department, shift and date for this schedule
          assignment.
        </p>
      </div>

      <form
        action={updateScheduleAssignmentAction}
        className="max-w-3xl rounded-2xl border bg-white p-5 shadow-sm">
        <input type="hidden" name="id" value={assignment.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Date</label>
            <div className="mt-2">
              <DateSelectField
                name="date"
                required
                yearsBack={1}
                yearsAhead={5}
                defaultValue={assignment.date.toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Schedule
            </label>
            <select
              name="scheduleId"
              defaultValue={assignment.scheduleId}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.name} ({schedule.year}/{schedule.month})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Employee
            </label>
            <select
              name="employeeId"
              defaultValue={assignment.employeeId}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Department
            </label>
            <select
              name="departmentId"
              defaultValue={assignment.departmentId}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Shift</label>
            <select
              name="shiftId"
              defaultValue={assignment.shiftId}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required>
              {shiftTemplates.map((shiftTemplate) => (
                <option key={shiftTemplate.id} value={shiftTemplate.id}>
                  {shiftTemplate.name} ({shiftTemplate.startTime}-
                  {shiftTemplate.endTime})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <input
              type="text"
              name="notes"
              defaultValue={assignment.notes ?? ""}
              placeholder="Notes"
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit">Save changes</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/schedule-assignments">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
