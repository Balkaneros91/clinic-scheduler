"use client";

type EmployeesErrorProps = {
  error: Error;
  reset: () => void;
};

export default function EmployeesError({ reset }: EmployeesErrorProps) {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Employees</h1>

      <p className="mb-4 text-red-600">
        Something went wrong while loading employees.
      </p>

      <button onClick={reset} className="rounded bg-black px-4 py-2 text-white">
        Try again
      </button>
    </main>
  );
}
