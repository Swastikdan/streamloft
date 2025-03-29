"use client";
import React from "react";
import { useSession } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DefaultUser } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthModal } from "@/hooks/use-sign-in";

/**
 * AccountMenu component displays the user's account information and authentication state.
 * - Shows a loading skeleton while session data is being fetched
 * - Displays a dropdown menu with account options when user is logged in
 * - Shows a login button when user is not authenticated
 */
export default function AccountMenu() {
  // Get user session data and loading state
  const { data, isPending } = useSession();
  const { openAuthModal } = useAuthModal();

  return (
    <>
      {isPending ? (
        // Show loading skeleton while session data is being fetched
        <Skeleton className="h-10 w-10 rounded-md" />
      ) : data?.session && data.user ? (
        // User is authenticated - show dropdown menu with account options
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="h-10 w-10 rounded-md hover:opacity-80">
              <AvatarImage src={data?.user.image ?? undefined} />
              <AvatarFallback className="bg-accent rounded-md">
                <DefaultUser className="size-6" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-72 px-2 py-3" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Add more menu items here for account functionality */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // User is not authenticated - show login button
        <Button
          variant="outline"
          size="icon"
          className="bg-accent h-10 w-10 rounded-md p-0 hover:opacity-80"
          onClick={() => openAuthModal()}
          aria-label="Sign in"
        >
          <DefaultUser className="size-6" />
        </Button>
      )}
    </>
  );
}
