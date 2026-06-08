"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type ConfirmActionButtonProps = {
  message?: string;
  title?: string;
  buttonText?: string;
  confirmText?: string;
};

export function ConfirmActionButton({
  message = "Are you sure you want to continue?",
  title = "Confirm action",
  buttonText = "Confirm",
  confirmText = "Confirm",
}: ConfirmActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
        onClick={() => setIsOpen(true)}>
        {buttonText}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}>
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-red-600 text-white hover:bg-red-700">
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
