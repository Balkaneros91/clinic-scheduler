import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="p-8">
      <h1 className="mb-8 text-4xl font-bold">Clinic Scheduler Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/employees"
          className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Employees</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage employees and responsibilities.
          </p>
        </Link>

        <Link
          href="/dashboard/departments"
          className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Departments</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage clinic departments.
          </p>
        </Link>

        <Link
          href="/dashboard/shift-templates"
          className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Shift Templates</h2>
          <p className="mt-2 text-sm text-gray-600">Manage working shifts.</p>
        </Link>

        <Link
          href="/dashboard/absences"
          className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Absences</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage employee absences.
          </p>
        </Link>

        <Link
          href="/dashboard/schedule-assignments"
          className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Schedule Assignments</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage schedules and assignments.
          </p>
        </Link>

        <Link
          href="/dashboard/schedules"
          className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Schedules</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage monthly schedules and generate assignments.
          </p>
        </Link>
      </div>
    </main>
  );
}
