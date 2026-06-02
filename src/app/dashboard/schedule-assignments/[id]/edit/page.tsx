import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateScheduleAssignmentAction } from "@/app/dashboard/schedule-assignments/actions/schedule-assignment.actions";

type EditScheduleAssignmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditScheduleAssignmentPage({
  params,
}: EditScheduleAssignmentPageProps) {
  const { id } = await params;

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

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Schedule Assignment</h1>

      <form
        action={updateScheduleAssignmentAction}
        className="max-w-md space-y-4">
        <input type="hidden" name="id" value={assignment.id} />

        <input
          type="date"
          name="date"
          defaultValue={assignment.date.toISOString().split("T")[0]}
          className="w-full rounded border px-3 py-2"
          required
        />

        <select
          name="employeeId"
          defaultValue={assignment.employeeId}
          className="w-full rounded border px-3 py-2"
          required>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <select
          name="departmentId"
          defaultValue={assignment.departmentId}
          className="w-full rounded border px-3 py-2"
          required>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          name="shiftId"
          defaultValue={assignment.shiftId}
          className="w-full rounded border px-3 py-2"
          required>
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
          defaultValue={assignment.notes ?? ""}
          placeholder="Notes"
          className="w-full rounded border px-3 py-2"
        />

        <div className="flex gap-2">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">
            Save Changes
          </button>

          <Link
            href="/dashboard/schedule-assignments"
            className="rounded bg-gray-200 px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
