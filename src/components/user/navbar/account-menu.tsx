"use client";
import React, { useCallback, useState } from "react";
import { useSession, signOut } from "@/auth/auth-client";
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
import { DefaultUser, Spinner } from "@/components/ui/icons";
import Image from "next/image";
import { LogIn, LogOut, Settings, Shield, User2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthModal } from "@/hooks/use-sign-in";
import { Skeleton } from "@/components/ui/skeleton";
/**
 * AccountMenu component displays the user's account information and authentication state.
 * - Shows a loading skeleton while session data is being fetched
 * - Displays a dropdown menu with account options when user is logged in
 * - Shows a login button when user is not authenticated
 */
export default function AccountMenu() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data, isPending } = useSession();
  const { openAuthModal } = useAuthModal();
  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    const signout = await signOut();

    if (signout.error) {
      toast.error("Sign out failed. Please try again.");
      setIsSigningOut(false);
    }
    setIsSigningOut(false);
  }, []);
  return (
    <>
      {isPending ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : data?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="h-10 w-10 rounded-full hover:opacity-80">
              <AvatarImage src={data?.user.image ?? undefined} />
              <AvatarFallback className="bg-secondary rounded-md">
                <DefaultUser className="size-6" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mt-2 w-90 border-2 px-0 py-0"
            align="end"
          >
            <DropdownMenuLabel className="flex items-center gap-1.5 px-3 py-4">
              <Image
                // @ts-expect-error image will be aveilable for google auth
                src={data?.user.image}
                width={40}
                height={40}
                alt="User Image"
                className="size-10 rounded-full p-1"
              />
              <span className="flex flex-col gap-1 font-medium">
                <span className="ml-2 text-sm">{data?.user.name}</span>
                <span className="text-muted-foreground ml-2 text-xs">
                  {data?.user.email}
                </span>
              </span>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <Link href="/">
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="outline"
                    className="flex h-14 w-full items-center justify-start gap-5 border-0 has-[>svg]:px-6"
                    size="lg"
                  >
                    <Settings />
                    Manage Account
                  </Button>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="outline"
                  className="flex h-14 w-full items-center justify-start gap-5 border-0 border-y has-[>svg]:px-6"
                  size="lg"
                >
                  <Shield fill="currentColor" />
                  Admin Pannel
                </Button>
              </DropdownMenuItem>
              <Button
                variant="outline"
                className="flex h-14 w-full items-center justify-start gap-5 border-0 border-t has-[>svg]:px-6"
                size="lg"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <Spinner className="size-4 animate-spin" />
                ) : (
                  <LogOut />
                )}
                Sign out
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="secondary"
          className="size-10 rounded-full"
          size="icon"
          onClick={() => openAuthModal()}
        >
          <DefaultUser className="size-6" />
        </Button>
      )}
    </>
  );
}
