import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateDepartmentAction } from "@/app/dashboard/departments/actions/department.actions";
import { Button } from "@/components/ui/button";

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
    <section className="space-y-8">
      <div>
        <Link
          href="/dashboard/departments"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← Back to departments
        </Link>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
          Clinic structure
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit Department
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update the department name used when assigning clinic work.
        </p>
      </div>

      <form
        action={updateDepartmentAction}
        className="max-w-3xl rounded-2xl border bg-white p-5 shadow-sm">
        <input type="hidden" name="id" value={department.id} />

        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Department name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={department.name}
            className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit">Save changes</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/departments">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
