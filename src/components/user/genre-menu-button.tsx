"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, LayoutDashboard, Search } from "lucide-react";
import { GENRE, FEATURED_COLLECTIONS } from "@/constants/genre";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
export default function GenreMenuButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="font-medium">
          <LayoutDashboard size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="m-2 mt-4 grid w-full grid-cols-3 gap-4 border-2 border-border p-5 shadow-none md:min-w-96 lg:min-w-[44rem]"
        align="end"
      >
        <div className="col-span-2">
          <h3 className="px-3 py-3 pb-5 text-sm font-thin">Genre</h3>
          <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2 md:gap-x-5">
            {GENRE.map((genre) => (
              <Link key={genre.path} href={genre.path}>
                <Button
                  variant="ghost"
                  className="h-12 w-full justify-start px-3 py-2 text-left text-base"
                >
                  {genre.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="px-3 py-3 pb-5 text-sm font-thin">
            Featured Collections
          </h3>
          <div className="grid grid-cols-1 gap-x-3 md:gap-x-5">
            {FEATURED_COLLECTIONS.map((collection) => (
              <Link key={collection.path} href={collection.path}>
                <Button
                  variant="ghost"
                  className="h-12 w-full justify-start px-3 py-2 text-left text-base"
                >
                  {collection.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
