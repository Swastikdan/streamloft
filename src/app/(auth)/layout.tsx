import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BasicNavbar from "@/components/common/BasicNavbar";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <BasicNavbar />
      <div className="grid w-full grow items-center px-4 sm:justify-center">
        <ClerkLoading>
          <Loader2
            size={36}
            strokeWidth={1}
            className="animate-spin text-primary duration-1000 ease-in-out"
          />
        </ClerkLoading>
        <ClerkLoaded>{children}</ClerkLoaded>
      </div>
    </section>
  );
}
