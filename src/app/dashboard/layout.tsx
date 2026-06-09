import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { DashboardShell } from "./DashboardShell";

import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  return (
    <DashboardShell
      userName={`${currentUser.firstName} ${currentUser.lastName}`}
      userRole={currentUser.appRole}>
      {children}
    </DashboardShell>
  );
}
