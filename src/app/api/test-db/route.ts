import { prisma } from "@/lib/prisma";

export async function GET() {
  const roles = await prisma.role.findMany();

  return Response.json({
    message: "Database connection works",
    count: roles.length,
    roles,
  });
}
