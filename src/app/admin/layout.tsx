import type React from "react";
import { isAdmin } from "@/lib/roles";
import { forbidden } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    forbidden();
  }
  return children;
}
