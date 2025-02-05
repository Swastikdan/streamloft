"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bookmark, Search } from "lucide-react";
export function DeskopMenuButtons() {
  const pathname = usePathname();
  return (
    <div className="hidden items-center gap-5 md:flex">
      <Link href="/">
        <Button
          variant={pathname === "/" ? "secondary" : "ghost"}
          className="font-medium"
        >
          Home
        </Button>
      </Link>
      <Link href="/movies">
        <Button
          variant={pathname === "/movies" ? "secondary" : "ghost"}
          className="font-medium"
        >
          Movies
        </Button>
      </Link>
      <Link href="/tv">
        <Button
          variant={pathname === "/tv" ? "secondary" : "ghost"}
          className="font-medium"
        >
          TV Shows
        </Button>
      </Link>
    </div>
  );
}

export function SearchLinkButton() {
  return (
    <Link href="/search">
      <Button variant="secondary" size="icon" className="font-medium">
        <Search size={20} />
      </Button>
    </Link>
  );
}

export function FavoriteLinkButton() {
  return (
    <Link href="/favorites">
      <Button variant="secondary" size="icon" className="font-medium">
        <Bookmark size={20} />
      </Button>
    </Link>
  );
}
