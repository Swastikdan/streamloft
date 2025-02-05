import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DeskopMenuButtons,
  FavoriteLinkButton,
  SearchLinkButton,
} from "@/components/common/desktop-menu-buttons";
import GenreMenuButton from "@/components/user/genre-menu-button";
import UserButton from "@/components/common/user-button";

export default function Navbar() {
  return (
    <nav className="m-5 flex h-10 w-full max-w-[1356px] items-center justify-between">
      <div className="flex items-center">
        <Link
          href="/"
          className="font-heading mr-10 flex items-center gap-3 text-xl font-semibold"
        >
          <Image
            src="/logo_main.svg"
            alt="Logo"
            width={100}
            height={100}
            className="size-10"
          />
          <h1>Streamloft</h1>
        </Link>
        <DeskopMenuButtons />
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden items-center gap-5 md:flex">
          <SearchLinkButton />
          <GenreMenuButton />
          <FavoriteLinkButton />
        </div>

        <UserButton />
      </div>
    </nav>
  );
}
