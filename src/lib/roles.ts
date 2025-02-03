import type { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles): Promise<boolean> => {
  const { userId, sessionClaims } = await auth();
  if (!userId) return false;
  return sessionClaims?.metadata.role === role;
};

export const isAdmin = async () => {
  return checkRole("admin");
};
