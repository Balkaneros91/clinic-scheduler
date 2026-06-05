"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ScheduleMonthYearFields() {
  return (
    <>
      <input type="hidden" name="year" id="year-input" defaultValue="2026" />
      <input type="hidden" name="month" id="month-input" />

      <Select
        defaultValue="2026"
        onValueChange={(value) => {
          const input = document.getElementById(
            "year-input",
          ) as HTMLInputElement;

          if (input) input.value = value;
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2027">2027</SelectItem>
          <SelectItem value="2028">2028</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          const input = document.getElementById(
            "month-input",
          ) as HTMLInputElement;

          if (input) input.value = value;
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="1">January</SelectItem>
          <SelectItem value="2">February</SelectItem>
          <SelectItem value="3">March</SelectItem>
          <SelectItem value="4">April</SelectItem>
          <SelectItem value="5">May</SelectItem>
          <SelectItem value="6">June</SelectItem>
          <SelectItem value="7">July</SelectItem>
          <SelectItem value="8">August</SelectItem>
          <SelectItem value="9">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
