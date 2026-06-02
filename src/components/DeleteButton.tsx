"use client";

import { useState } from "react";

type DeleteButtonProps = {
  message?: string;
};

export function DeleteButton({
  message = "Are you sure you want to delete this item?",
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded bg-red-600 px-3 py-2 text-white"
        onClick={() => setIsOpen(true)}>
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-3 text-lg font-bold">Confirm delete</h2>

            <p className="mb-6 text-sm text-gray-700">{message}</p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded bg-gray-200 px-4 py-2"
                onClick={() => setIsOpen(false)}>
                Cancel
              </button>

              <button className="rounded bg-red-600 px-4 py-2 text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
