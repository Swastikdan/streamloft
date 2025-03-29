import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      Home
      <Link className="p-5 text-lg underline" href="/account">
        Account
      </Link>
    </div>
  );
}
