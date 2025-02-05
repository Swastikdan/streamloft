import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up | Streamloft",
  description: "Sign up for a Streamloft account.",
};

export default function Page() {
  return <SignUp />;
}
