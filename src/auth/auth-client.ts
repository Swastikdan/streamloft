import { createAuthClient } from "better-auth/react";
import {
  usernameClient,
  twoFactorClient,
  adminClient,
} from "better-auth/client/plugins";
import { env } from "@/env";
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [
    usernameClient(),
    twoFactorClient(),
    adminClient(),
  ],
});

export const { signIn, signOut, signUp, useSession, admin } = authClient;
