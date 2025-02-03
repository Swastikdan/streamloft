import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "404: Not Found",
  description: "The page you're looking for does not exist.",
};

export default function NotFound() {
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
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-primary">404</h1>
          <p className="text-2xl font-bold tracking-tight sm:text-4xl">
            Uh-oh!
          </p>
          <p className="mt-4 text-sm font-light md:text-base lg:text-lg">
            {`Sorry, we can't find that page. You'll find lots to explore on the
          home page.`}
          </p>{" "}
          <Link href="/">
            <Button variant="secondary" className="my-5 font-light">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
