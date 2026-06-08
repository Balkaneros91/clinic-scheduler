import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";

type AppRole = "ADMIN" | "EMPLOYEE";

export async function requireRole(role: AppRole) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  if (currentUser.appRole !== role) {
    redirect("/dashboard");
  }

  return currentUser;
}
