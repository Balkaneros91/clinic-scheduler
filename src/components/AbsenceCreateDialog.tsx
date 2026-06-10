"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DateSelectField } from "@/components/DateSelectField";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AbsenceCreateDialogProps = {
  employees: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  absenceTypes: {
    id: string;
    name: string;
  }[];
  action: (formData: FormData) => void;
};

export function AbsenceCreateDialog({
  employees,
  absenceTypes,
  action,
}: AbsenceCreateDialogProps) {
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(today);

  const singleEmployee = employees.length === 1 ? employees[0] : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add absence</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add absence</DialogTitle>
          <DialogDescription>
            Add a new unavailable period for an employee.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Employee
              </label>

              {singleEmployee ? (
                <>
                  <input
                    type="hidden"
                    name="employeeId"
                    value={singleEmployee.id}
                  />

                  <div className="mt-2 rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {singleEmployee.firstName} {singleEmployee.lastName}
                  </div>
                </>
              ) : (
                <select
                  name="employeeId"
                  className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required>
                  <option value="">Select employee</option>

                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Absence type
              </label>
              <select
                name="absenceTypeId"
                className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                required>
                <option value="">Select absence type</option>

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
                  yearsBack={0}
                  yearsAhead={5}
                  defaultValue={today}
                  minDate={today}
                  onDateChange={(date) => {
                    if (date) {
                      setStartDate(date);
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Last absence day
              </label>
              <div className="mt-2">
                <DateSelectField
                  name="endDate"
                  required
                  yearsBack={0}
                  yearsAhead={5}
                  defaultValue={startDate}
                  minDate={startDate}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Add absence</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
