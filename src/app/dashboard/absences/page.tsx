import Link from "next/link";
import { prisma } from "@/lib/prisma";

import { ConfirmActionButton } from "@/components/ConfirmActionButton";
import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import {
  approveAbsenceAction,
  createAbsenceAction,
  deleteAbsenceAction,
  rejectAbsenceAction,
} from "@/app/dashboard/absences/actions/absence.actions";
import { AbsenceCreateDialog } from "@/components/AbsenceCreateDialog";

export default async function AbsencesPage() {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.appRole === "ADMIN";

  const absencesData = await prisma.absence.findMany({
    where: isAdmin
      ? undefined
      : {
          employeeId: currentUser?.id,
        },
    include: {
      employee: true,
      absenceType: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  const absences = absencesData.sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;

    return b.startDate.getTime() - a.startDate.getTime();
  });

  const employees = isAdmin
    ? await prisma.employee.findMany({
        orderBy: {
          firstName: "asc",
        },
      })
    : currentUser
      ? [currentUser]
      : [];

  const absenceTypes = await prisma.absenceType.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Availability
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Absences
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Register employee absences so schedules can be reviewed and adjusted
            when staff are unavailable.
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {absences.length} {absences.length === 1 ? "absence" : "absences"}
        </div>
      </div>

      <div className="flex justify-end">
        <AbsenceCreateDialog
          employees={employees}
          absenceTypes={absenceTypes}
          action={createAbsenceAction}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Registered absences
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            These records show when employees are unavailable for scheduling.
          </p>
        </div>

        {absences.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              No absences yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Add your first absence when an employee is unavailable.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Absent from</th>
                <th className="px-4 py-3">Last absence day</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                {isAdmin && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>

            <tbody className="divide-y">
              {absences.map((absence) => (
                <tr
                  key={absence.id}
                  className="transition duration-150 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-950">
                      {absence.employee.firstName} {absence.employee.lastName}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Employee absence
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      {absence.absenceType.name}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {absence.startDate.toLocaleDateString("sv-SE")}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {absence.endDate
                      ? absence.endDate.toLocaleDateString("sv-SE")
                      : "Open-ended"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        absence.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : absence.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}>
                      {absence.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {absence.notes ?? "-"}
                  </td>

                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {absence.status === "PENDING" && (
                          <>
                            <form action={approveAbsenceAction}>
                              <input
                                type="hidden"
                                name="id"
                                value={absence.id}
                              />
                              <Button
                                type="submit"
                                className="bg-emerald-600 text-white hover:bg-emerald-700">
                                Approve
                              </Button>
                            </form>

                            <form action={rejectAbsenceAction}>
                              <input
                                type="hidden"
                                name="id"
                                value={absence.id}
                              />
                              <Button
                                type="submit"
                                className="bg-red-600 text-white hover:bg-red-700">
                                Reject
                              </Button>
                            </form>
                          </>
                        )}
                        <Button asChild variant="outline">
                          <Link href={`/dashboard/absences/${absence.id}/edit`}>
                            Edit
                          </Link>
                        </Button>

                        <form action={deleteAbsenceAction}>
                          <input type="hidden" name="id" value={absence.id} />

                          <ConfirmActionButton
                            title="Confirm delete"
                            message="Are you sure you want to delete this absence?"
                            buttonText="Delete"
                            confirmText="Delete"
                          />
                        </form>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
