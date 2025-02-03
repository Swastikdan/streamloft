import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BasicNavbar() {
  return (
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
  );
}
