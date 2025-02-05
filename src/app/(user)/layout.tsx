import React from "react";
import Navbar from "@/components/user/navbar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mx-auto flex w-full justify-center">
        <Navbar />
      </header>
      <section
        className="flex h-full w-full flex-col items-center py-10"
        role="main"
      >
        <main className="flex w-full max-w-screen-xl flex-col items-center justify-center px-5">
          {children}
        </main>
      </section>
    </>
  );
}
