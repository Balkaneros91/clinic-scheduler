"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type ScheduleMonthYearFieldsProps = {
  yearsBack?: number;
  yearsAhead?: number;
};

export function ScheduleMonthYearFields({
  yearsBack = 0,
  yearsAhead = 5,
}: ScheduleMonthYearFieldsProps) {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState("");

  const years = Array.from({ length: yearsBack + yearsAhead + 1 }, (_, index) =>
    String(currentYear - yearsBack + index),
  );

  return (
    <>
      <input type="hidden" name="year" value={year} />
      <input type="hidden" name="month" value={month} />

      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>

        <SelectContent>
          {years.map((yearOption) => (
            <SelectItem key={yearOption} value={yearOption}>
              {yearOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>

        <SelectContent>
          {monthNames.map((monthName, index) => (
            <SelectItem key={monthName} value={String(index + 1)}>
              {monthName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
