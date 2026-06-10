import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function requireAdminApi() {
  try {
    return await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";

    if (message === "Authentication required") {
      return Response.json({ error: message }, { status: 401 });
    }

    return Response.json({ error: message }, { status: 403 });
  }
}
