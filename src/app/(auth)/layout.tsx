import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/icons";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { userId } = await auth();

  // if (userId) {
  //   redirect("/");
  // }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <main className="grid w-full grow items-center justify-center px-4">
        <ClerkLoading>
          <Spinner
            strokeWidth={1.25}
            className="size-10 animate-spin text-primary"
          />
        </ClerkLoading>
        <ClerkLoaded>{children}</ClerkLoaded>
      </main>
    </section>
  );
}
