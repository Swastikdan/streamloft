import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
export default function AdminHomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SignedIn>
        You are signed in.
        <SignOutButton>
          <Button variant="destructive">Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
