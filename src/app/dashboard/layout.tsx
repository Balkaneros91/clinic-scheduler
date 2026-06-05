"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ClipboardList,
  Home,
  Hospital,
  Layers,
  Users,
  UserX,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Employees", href: "/dashboard/employees", icon: Users },
  { label: "Departments", href: "/dashboard/departments", icon: Hospital },
  {
    label: "Shift Templates",
    href: "/dashboard/shift-templates",
    icon: Layers,
  },
  { label: "Absences", href: "/dashboard/absences", icon: UserX },
  { label: "Schedules", href: "/dashboard/schedules", icon: CalendarDays },
  {
    label: "Assignments",
    href: "/dashboard/schedule-assignments",
    icon: ClipboardList,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                  )}>
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b bg-white px-6 py-4 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Clinic Scheduler</p>
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
