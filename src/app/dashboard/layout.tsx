import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Employees", href: "/dashboard/employees" },
  { label: "Departments", href: "/dashboard/departments" },
  { label: "Shift Templates", href: "/dashboard/shift-templates" },
  { label: "Absences", href: "/dashboard/absences" },
  { label: "Schedules", href: "/dashboard/schedules" },
  { label: "Assignments", href: "/dashboard/schedule-assignments" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r bg-white px-5 py-6 md:block">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Clinic Scheduler
            </p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b bg-white px-6 py-4 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Clinic Scheduler MVP</p>
                <p className="text-lg font-semibold text-slate-900">
                  Staff planning and schedule management
                </p>
              </div>

              <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 sm:block">
                Admin view
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
