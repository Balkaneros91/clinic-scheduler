"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DateSelectFieldProps = {
  name: string;
  required?: boolean;
  yearsBack?: number;
  yearsAhead?: number;
  defaultValue?: string;
};

const months = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

export function DateSelectField({
  name,
  required = false,
  yearsBack = 1,
  yearsAhead = 5,
  defaultValue,
}: DateSelectFieldProps) {
  const currentYear = new Date().getFullYear();

  const [
    defaultYear = String(currentYear),
    defaultMonth = "",
    defaultDay = "",
  ] = defaultValue?.split("-") ?? [];

  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [day, setDay] = useState(defaultDay);

  const years = Array.from({ length: yearsBack + yearsAhead + 1 }, (_, index) =>
    String(currentYear - yearsBack + index),
  );

  const daysInMonth =
    year && month ? new Date(Number(year), Number(month), 0).getDate() : 31;

  const days = Array.from({ length: daysInMonth }, (_, index) =>
    String(index + 1).padStart(2, "0"),
  );

  const dateValue = year && month && day ? `${year}-${month}-${day}` : "";

  function handleMonthChange(value: string) {
    setMonth(value);

    const nextDaysInMonth = year
      ? new Date(Number(year), Number(value), 0).getDate()
      : 31;

    if (day && Number(day) > nextDaysInMonth) {
      setDay("");
    }
  }

  function handleYearChange(value: string) {
    setYear(value);

    if (month && day) {
      const nextDaysInMonth = new Date(
        Number(value),
        Number(month),
        0,
      ).getDate();

      if (Number(day) > nextDaysInMonth) {
        setDay("");
      }
    }
  }

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <input type="hidden" name={name} value={dateValue} required={required} />

      <Select value={year} onValueChange={handleYearChange}>
        <SelectTrigger>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((yearOption) => (
            <SelectItem key={yearOption} value={yearOption}>
              {yearOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={month} onValueChange={handleMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((monthOption) => (
            <SelectItem key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={day} onValueChange={setDay}>
        <SelectTrigger>
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {days.map((dayOption) => (
            <SelectItem key={dayOption} value={dayOption}>
              {dayOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
