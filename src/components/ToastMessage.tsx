"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ToastMessageProps = {
  type?: "success" | "error";
  message: string;
};

export function ToastMessage({ type = "success", message }: ToastMessageProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  function closeToast() {
    setIsVisible(false);
    router.replace(window.location.pathname, { scroll: false });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeToast();
    }, 3000);

    return () => clearTimeout(timeout);
  });

  if (!isVisible) {
    return null;
  }

  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div
      className={`fixed right-4 top-4 z-50 flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg ${styles}`}>
      <p className="leading-6">{message}</p>

      <button
        type="button"
        onClick={() => {
          setIsVisible(false);
          router.replace(window.location.pathname, { scroll: false });
        }}
        className="ml-auto font-semibold opacity-70 transition hover:opacity-100"
        aria-label="Close notification">
        ×
      </button>
    </div>
  );
}
