import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <main className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-primary">404</h1>
          <p className="text-2xl font-bold tracking-tight sm:text-4xl">
            Uh-oh!
          </p>
          <p className="mt-4 text-sm font-light md:text-base">
            {`Sorry, we can't find that page. You'll find lots to explore on the
          home page.`}
          </p>{" "}
          <Link href="/">
            <Button
              variant="default"
              size="lg"
              className="my-5 font-light md:text-base"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </main>
    </section>
  );
}
