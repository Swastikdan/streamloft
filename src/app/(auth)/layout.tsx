import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <nav className="w-full max-w-[1356px] justify-between p-5">
        <Link
          href="/"
          className="font-heading flex items-center gap-3 text-xl font-semibold"
        >
          <Image
            src="/logo_main.svg"
            alt="Logo"
            width={100}
            height={100}
            className="size-8"
          />
          <h1>Streamloft</h1>
        </Link>
        <div></div>
      </nav>
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
