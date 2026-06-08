import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { DashboardShell } from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <DashboardShell
      userName={
        currentUser
          ? `${currentUser.firstName} ${currentUser.lastName}`
          : "Unknown user"
      }
      userRole={currentUser?.appRole ?? "EMPLOYEE"}>
      {children}
    </DashboardShell>
  );
}
