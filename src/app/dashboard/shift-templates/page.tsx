import Link from "next/link";

import { ConfirmActionButton } from "@/components/ConfirmActionButton";
import { Button } from "@/components/ui/button";
import { TimeSelect } from "@/components/TimeSelect";

import { prisma } from "@/lib/prisma";

import {
  createShiftTemplateAction,
  deleteShiftTemplateAction,
} from "@/app/dashboard/shift-templates/actions/shift-template.actions";

export default async function ShiftTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const shiftTemplates = await prisma.shiftTemplate.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Working hours
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Shift Templates
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Define reusable shift blocks used when generating and reviewing
            clinic schedules.
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {shiftTemplates.length}{" "}
          {shiftTemplates.length === 1 ? "template" : "templates"}
        </div>
      </div>

      {error === "duplicate" && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>A shift template with this name already exists.</span>

          <Link
            href="/dashboard/shift-templates"
            className="font-medium text-red-800 underline-offset-4 hover:underline">
            Dismiss
          </Link>
        </div>
      )}

      <form
        action={createShiftTemplateAction}
        className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Add shift template
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Create reusable work periods such as morning, afternoon or lunch
            break.
          </p>
        </div>

        <div className="grid items-end gap-3 md:grid-cols-[1fr_140px_140px_auto]">
          <input
            type="text"
            name="name"
            placeholder="Example: Morning"
            className="h-10 rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required
          />

          <TimeSelect name="startTime" placeholder="Start time" />
          <TimeSelect name="endTime" placeholder="End time" />

          <Button type="submit">Add Template</Button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Existing shift templates
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            These templates define the available work periods in schedules.
          </p>
        </div>

        {shiftTemplates.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              No shift templates yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Add your first shift template to start planning assignments.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {shiftTemplates.map((shiftTemplate) => (
                <tr
                  key={shiftTemplate.id}
                  className="transition duration-150 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-950">
                      {shiftTemplate.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Shift template
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {shiftTemplate.startTime}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {shiftTemplate.endTime}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      {shiftTemplate.isBreak ? "Break" : "Work shift"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="outline">
                        <Link
                          href={`/dashboard/shift-templates/${shiftTemplate.id}/edit`}>
                          Edit
                        </Link>
                      </Button>

                      <form action={deleteShiftTemplateAction}>
                        <input
                          type="hidden"
                          name="id"
                          value={shiftTemplate.id}
                        />

                        <ConfirmActionButton message="Are you sure you want to delete this shift template?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
