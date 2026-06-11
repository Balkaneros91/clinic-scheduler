import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateAbsenceAction } from "@/app/dashboard/absences/actions/absence.actions";

import { Button } from "@/components/ui/button";
import { DateSelectField } from "@/components/DateSelectField";

import { requireRole } from "@/lib/auth/requireRole";

type EditAbsencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAbsencePage({
  params,
}: EditAbsencePageProps) {
  const { id } = await params;

  await requireRole("ADMIN");

  const absence = await prisma.absence.findUnique({
    where: { id },
  });

  if (!absence) {
    notFound();
  }

  const employees = await prisma.employee.findMany({
    orderBy: { firstName: "asc" },
  });

  const absenceTypes = await prisma.absenceType.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <section className="space-y-8">
      <div>
        <Link
          href="/dashboard/absences"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← Back to absences
        </Link>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-slate-500">
          Availability
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Edit Absence
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update absence details for an employee who is unavailable for
          scheduling.
        </p>
      </div>

      <form
        action={updateAbsenceAction}
        className="max-w-3xl rounded-2xl border bg-white p-5 shadow-sm">
        <input type="hidden" name="id" value={absence.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Employee
            </label>
            <select
              name="employeeId"
              defaultValue={absence.employeeId}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Absence type
            </label>
            <select
              name="absenceTypeId"
              defaultValue={absence.absenceTypeId}
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required>
              {absenceTypes.map((absenceType) => (
                <option key={absenceType.id} value={absenceType.id}>
                  {absenceType.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Absent from
            </label>
            <div className="mt-2">
              <DateSelectField
                name="startDate"
                required
                yearsBack={1}
                yearsAhead={5}
                defaultValue={absence.startDate.toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Last absence day, if known
            </label>
            <div className="mt-2">
              <DateSelectField
                name="endDate"
                required
                yearsBack={1}
                yearsAhead={5}
                defaultValue={
                  absence.endDate
                    ? absence.endDate.toISOString().split("T")[0]
                    : ""
                }
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <input
              type="text"
              name="notes"
              defaultValue={absence.notes ?? ""}
              placeholder="Notes"
              className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit">Save changes</Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/absences">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
