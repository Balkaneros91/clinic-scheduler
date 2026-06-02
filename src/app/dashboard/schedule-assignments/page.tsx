import { prisma } from "@/lib/prisma";

import { createScheduleAssignmentAction } from "@/app/dashboard/schedule-assignments/actions/schedule-assignment.actions";

export default async function ScheduleAssignmentsPage() {
  const scheduleAssignments = await prisma.scheduleAssignment.findMany({
    include: {
      employee: true,
      department: true,
      shift: true,
    },
    orderBy: {
      date: "asc",
    },
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
                  <button className="rounded bg-gray-800 px-3 py-2 text-white">
                    Edit
                  </button>

                  <button className="rounded bg-red-600 px-3 py-2 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
