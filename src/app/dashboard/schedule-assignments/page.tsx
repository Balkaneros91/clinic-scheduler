import { prisma } from "@/lib/prisma";
import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";

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
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Schedule Assignments</h1>

      <form
        action={createScheduleAssignmentAction}
        className="mb-6 flex flex-wrap gap-2">
        <input
          type="date"
          name="date"
          className="rounded border px-3 py-2"
          required
        />

        <select
          name="scheduleId"
          defaultValue={scheduleId ?? ""}
          className="rounded border px-3 py-2"
          required>
          <option value="">Select schedule</option>

          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.id}>
              {schedule.name} ({schedule.year}/{schedule.month})
            </option>
          ))}
        </select>

        <select name="employeeId" className="rounded border px-3 py-2" required>
          <option value="">Select employee</option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <select
          name="departmentId"
          className="rounded border px-3 py-2"
          required>
          <option value="">Select department</option>

          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <select name="shiftId" className="rounded border px-3 py-2" required>
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
          className="rounded border px-3 py-2"
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Add Assignment
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Schedule</th>
              <th className="p-4">Employee</th>
              <th className="p-4">Department</th>
              <th className="p-4">Shift</th>
              <th className="p-4">Notes</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {scheduleAssignments.map((assignment) => (
              <tr key={assignment.id} className="border-t">
                <td className="p-4">
                  {assignment.date.toLocaleDateString("sv-SE")}
                </td>

                <td className="p-4">{assignment.schedule.name}</td>

                <td className="p-4 font-medium">
                  {assignment.employee.firstName} {assignment.employee.lastName}
                </td>

                <td className="p-4">{assignment.department.name}</td>

                <td className="p-4">
                  {assignment.shift.name} ({assignment.shift.startTime}-
                  {assignment.shift.endTime})
                </td>

                <td className="p-4">{assignment.notes ?? "-"}</td>

                <td className="flex gap-2 p-4">
                  <Link
                    href={`/dashboard/schedule-assignments/${assignment.id}/edit`}
                    className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </Link>

                  <form action={deleteScheduleAssignmentAction}>
                    <input type="hidden" name="id" value={assignment.id} />

                    <DeleteButton message="Are you sure you want to delete this schedule assignment?" />
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
