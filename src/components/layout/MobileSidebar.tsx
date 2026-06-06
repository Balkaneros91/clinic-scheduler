"use client";

import Link from "next/link";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navItems: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
};

export function MobileSidebar({
  isOpen,
  onClose,
  pathname,
  navItems,
}: MobileSidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
      />

      <aside className="relative h-full w-72 bg-white px-5 py-6 shadow-xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Clinic Scheduler
            </p>

            <h1 className="mt-2 text-xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border p-2 text-slate-700">
            <X className="h-4 w-4" />
          </button>
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
                onClick={onClose}
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
    </div>
  );
}
