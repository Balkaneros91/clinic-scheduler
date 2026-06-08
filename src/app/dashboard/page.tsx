import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/prisma";

const dashboardItems = [
  {
    title: "Employees",
    description: "Manage staff, roles, employment types and responsibilities.",
    href: "/dashboard/employees",
    meta: "Staff data",
  },
  {
    title: "Departments",
    description: "Manage clinic work areas such as reception and exam rooms.",
    href: "/dashboard/departments",
    meta: "Clinic areas",
  },
  {
    title: "Shift Templates",
    description: "Define reusable working shifts for mornings and afternoons.",
    href: "/dashboard/shift-templates",
    meta: "Working hours",
  },
  {
    title: "Absences",
    description: "Register sick leave, vacation and other employee absences.",
    href: "/dashboard/absences",
    meta: "Availability",
  },
  {
    title: "Schedules",
    description: "Create monthly schedules and generate staff assignments.",
    href: "/dashboard/schedules",
    meta: "Planning",
  },
  {
    title: "Schedule Assignments",
    description: "Review and adjust generated assignments manually.",
    href: "/dashboard/schedule-assignments",
    meta: "Assignments",
  },
];

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.appRole === "ADMIN";

  const myUpcomingAssignments =
    !isAdmin && currentUser
      ? await prisma.scheduleAssignment.findMany({
          where: {
            employeeId: currentUser.id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            schedule: true,
            department: true,
            shift: true,
          },
          orderBy: {
            date: "asc",
          },
          take: 5,
        })
      : [];

  const myAbsences =
    !isAdmin && currentUser
      ? await prisma.absence.findMany({
          where: {
            employeeId: currentUser.id,
          },
          include: {
            absenceType: true,
          },
          orderBy: {
            startDate: "desc",
          },
          take: 5,
        })
      : [];

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <section className="mx-auto max-w-7xl space-y-8">
          <div className="rounded-2xl bg-slate-900 px-8 py-10 text-white shadow-sm">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-300">
              Employee Dashboard
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Welcome, {currentUser?.firstName}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-300">
              View your upcoming assignments and register absences when you are
              unavailable.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/dashboard/schedule-assignments"
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-slate-900">
                My assignments
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                View your scheduled clinic work.
              </p>
            </Link>

            <Link
              href="/dashboard/absences"
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-slate-900">
                My absences
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Register sick leave, vacation or other absence.
              </p>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Upcoming assignments
              </h2>

              {myUpcomingAssignments.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">
                  No upcoming assignments found.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {myUpcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="rounded-xl border bg-slate-50 p-4">
                      <p className="font-medium text-slate-950">
                        {assignment.date.toLocaleDateString("sv-SE")}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {assignment.department.name} · {assignment.shift.name} ·{" "}
                        {assignment.shift.startTime}–{assignment.shift.endTime}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Recent absences
              </h2>

              {myAbsences.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">
                  No absences registered.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {myAbsences.map((absence) => (
                    <div
                      key={absence.id}
                      className="rounded-xl border bg-slate-50 p-4">
                      <p className="font-medium text-slate-950">
                        {absence.absenceType.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {absence.startDate.toLocaleDateString("sv-SE")} –{" "}
                        {absence.endDate
                          ? absence.endDate.toLocaleDateString("sv-SE")
                          : "Open-ended"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-slate-900 px-8 py-10 text-white shadow-sm">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-300">
            Clinic Scheduler
          </p>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              Staff scheduling made clearer and easier to manage.
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-300">
              Manage employees, departments, absences and schedules from one
              place. Generate assignments, review conflicts and make manual
              adjustments when clinic staffing changes.
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Core data</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">4 modules</p>
            <p className="mt-1 text-sm text-slate-600">
              Employees, departments, shifts and absences.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Scheduling</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">Automatic</p>
            <p className="mt-1 text-sm text-slate-600">
              Generate assignments based on responsibilities and availability.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Adjustments</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">Manual</p>
            <p className="mt-1 text-sm text-slate-600">
              Review, edit and delete assignments when needed.
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Management areas
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Choose a section to manage clinic scheduling data.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {item.meta}
                </span>
                <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700">
                  →
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
