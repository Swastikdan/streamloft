import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function NavLinkButton({
  href,
  clasName,
  children,
}: {
  href: string;
  clasName?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Button
        variant="secondary"
        size="icon"
        className={`${cn(clasName)} size-10`}
      >
        {children}
      </Button>
    </Link>
  );
}
