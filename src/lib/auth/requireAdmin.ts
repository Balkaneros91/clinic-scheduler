import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Authentication required");
  }

  if (currentUser.appRole !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return currentUser;
}
