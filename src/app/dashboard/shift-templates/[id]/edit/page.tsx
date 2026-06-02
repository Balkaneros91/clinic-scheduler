import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateShiftTemplateAction } from "@/app/dashboard/shift-templates/actions/shift-template.actions";

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
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Shift Template</h1>

      <form action={updateShiftTemplateAction} className="max-w-md space-y-4">
        <input type="hidden" name="id" value={shiftTemplate.id} />

        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={shiftTemplate.name}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="startTime" className="mb-2 block font-medium">
            Start Time
          </label>

          <input
            id="startTime"
            name="startTime"
            type="time"
            defaultValue={shiftTemplate.startTime}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="endTime" className="mb-2 block font-medium">
            End Time
          </label>

          <input
            id="endTime"
            name="endTime"
            type="time"
            defaultValue={shiftTemplate.endTime}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="flex gap-2">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">
            Save Changes
          </button>

          <Link
            href="/dashboard/shift-templates"
            className="rounded bg-gray-200 px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
