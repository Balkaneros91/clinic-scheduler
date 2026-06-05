"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const timeOptions = ["07:30", "08:00", "12:00", "12:30", "14:00", "17:00"];

type TimeSelectProps = {
  name: string;
  placeholder: string;
};

export function TimeSelect({ name, placeholder }: TimeSelectProps) {
  const [value, setValue] = useState("");

  return (
    <div>
      <input type="hidden" name={name} value={value} required />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full justify-between font-normal">
            <span>{value || placeholder}</span>
            <Clock className="h-4 w-4 text-slate-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-48 p-2">
          <div className="grid gap-1">
            {timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                className="rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100"
                onClick={() => setValue(time)}>
                {time}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
