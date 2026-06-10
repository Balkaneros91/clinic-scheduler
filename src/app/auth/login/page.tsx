import { LoginForm } from "./LoginForm";
import { ToastMessage } from "@/components/ToastMessage";

type LoginPageProps = {
  searchParams: Promise<{
    success?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { success } = await searchParams;

  const successMessages: Record<string, string> = {
    logout: "Signed out successfully.",
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      {success && successMessages[success] && (
        <ToastMessage type="success" message={successMessages[success]} />
      )}
      <section className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Clinic Scheduler
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            Sign in to your workspace
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Access schedules, assignments and absence workflows based on your
            role.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
