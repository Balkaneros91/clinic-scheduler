"use client";

type DeleteButtonProps = {
  message?: string;
};

export function DeleteButton({
  message = "Are you sure you want to delete this item?",
}: DeleteButtonProps) {
  return (
    <button
      className="rounded bg-red-600 px-3 py-2 text-white"
      onClick={(event) => {
        if (!confirm(message)) {
          event.preventDefault();
        }
      }}>
      Delete
    </button>
  );
}
