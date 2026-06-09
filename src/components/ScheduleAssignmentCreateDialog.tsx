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

type ScheduleAssignmentCreateDialogProps = {
  schedules: {
    id: string;
    name: string;
    year: number;
    month: number;
  }[];
  employees: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  departments: {
    id: string;
    name: string;
  }[];
  shiftTemplates: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
  }[];
  defaultScheduleId?: string;
  action: (formData: FormData) => void;
};

export function ScheduleAssignmentCreateDialog({
  schedules,
  employees,
  departments,
  shiftTemplates,
  defaultScheduleId = "",
  action,
}: ScheduleAssignmentCreateDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add assignment</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add assignment</DialogTitle>
          <DialogDescription>
            Manually assign an employee to a department and shift.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Date</label>
              <div className="mt-2">
                <DateSelectField
                  name="date"
                  required
                  yearsBack={1}
                  yearsAhead={5}
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Schedule
              </label>
              <select
                name="scheduleId"
                defaultValue={defaultScheduleId}
                className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                required>
                <option value="">Select schedule</option>

                {schedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.name} ({schedule.year}/{schedule.month})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Employee
              </label>
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
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Department
              </label>
              <select
                name="departmentId"
                className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                required>
                <option value="">Select department</option>

                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Shift
              </label>
              <select
                name="shiftId"
                className="mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                required>
                <option value="">Select shift</option>

                {shiftTemplates.map((shiftTemplate) => (
                  <option key={shiftTemplate.id} value={shiftTemplate.id}>
                    {shiftTemplate.name} ({shiftTemplate.startTime}-
                    {shiftTemplate.endTime})
                  </option>
                ))}
              </select>
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
            <Button type="submit">Add assignment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
