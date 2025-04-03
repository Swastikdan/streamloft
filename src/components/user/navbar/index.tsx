import React from "react";
import { Logo } from "@/components/ui/icons";
import Link from "next/link";
import { NavMenuItems } from "./nav-menu-items";
import MobileMenu from "./mobile-menu";
import NavLinkButton from "./nav-link-button";
import { Bookmark, Search } from "lucide-react";
import AccountMenu from "./account-menu";
export default function UserNavbar() {
  return (
    <header className="mx-auto flex w-full items-center justify-center">
      <nav className="flex w-full max-w-screen-xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-5 md:gap-10">
          <MobileMenu />
          <Link href="/" aria-label="" className="flex items-center gap-2">
            <Logo className="size-10" />
            <h1 className="sr-only text-xl font-bold md:not-sr-only">
              Streamloft
            </h1>
          </Link>
          <NavMenuItems />
        </div>
        <div className="flex items-center gap-3">
          <NavLinkButton href="/search">
            <Search />
          </NavLinkButton>
          <NavLinkButton href="/watchlist">
            <Bookmark />
          </NavLinkButton>
          <AccountMenu />
        </div>
      </nav>
    </header>
  );
}
