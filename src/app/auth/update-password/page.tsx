import { UpdatePasswordForm } from "./UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <section className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Clinic Scheduler
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            Update password
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Enter a new password for your account.
          </p>
        </div>

        <UpdatePasswordForm />
      </section>
    </main>
  );
}
