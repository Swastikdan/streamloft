import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In | Streamloft",
  description: "Sign in to Streamloft to access your account.",
};

export default function Page() {
  return <SignIn />;
}
