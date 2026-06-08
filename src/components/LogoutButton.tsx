"use client";

import { useRouter } from "next/navigation";

import { ConfirmActionButton } from "@/components/ConfirmActionButton";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <form action={handleLogout}>
      <ConfirmActionButton
        title="Confirm logout"
        message="Are you sure you want to log out?"
        buttonText="Logout"
        confirmText="Logout"
      />
    </form>
  );
}
