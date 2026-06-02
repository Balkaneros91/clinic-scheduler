import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateDepartmentAction } from "@/app/dashboard/departments/actions/department.actions";

type EditDepartmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditDepartmentPage({
  params,
}: EditDepartmentPageProps) {
  const { id } = await params;

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Department</h1>

      <form action={updateDepartmentAction} className="max-w-md space-y-4">
        <input type="hidden" name="id" value={department.id} />

        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Department name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={department.name}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="flex gap-2">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">
            Save changes
          </button>

          <Link
            href="/dashboard/departments"
            className="rounded bg-gray-200 px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
