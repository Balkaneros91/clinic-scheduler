import { prisma } from "@/lib/prisma";

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

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Schedule Assignments</h1>

      <button className="mb-6 rounded bg-blue-600 px-4 py-2 text-white">
        Add Schedule Assignment
      </button>

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
