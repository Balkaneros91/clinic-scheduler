import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateShiftTemplateAction } from "@/app/dashboard/shift-templates/actions/shift-template.actions";
import { Button } from "@/components/ui/button";
import { TimeSelect } from "@/components/TimeSelect";

type EditShiftTemplatePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditShiftTemplatePage({
  params,
}: EditShiftTemplatePageProps) {
  const { id } = await params;

  const shiftTemplate = await prisma.shiftTemplate.findUnique({
    where: { id },
  });

  if (!shiftTemplate) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          href="/dashboard/shift-templates"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← Back to shift templates
        </Link>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
          Working hours
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit Shift Template
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update reusable shift times used when generating and reviewing clinic
          schedules.
        </p>
      </div>

      <form
        action={updateShiftTemplateAction}
        className="max-w-3xl rounded-2xl border bg-white p-5 shadow-sm">
        <input type="hidden" name="id" value={shiftTemplate.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={shiftTemplate.name}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="text-sm font-medium text-slate-700">
              Start Time
            </label>

            <div className="mt-2">
              <TimeSelect
                name="startTime"
                placeholder="Start time"
                defaultValue={shiftTemplate.startTime}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="text-sm font-medium text-slate-700">
              End Time
            </label>

            <div className="mt-2">
              <TimeSelect
                name="endTime"
                placeholder="End time"
                defaultValue={shiftTemplate.endTime}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit">Save changes</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/shift-templates">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
