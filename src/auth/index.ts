import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username, twoFactor, admin } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { env } from "@/env";

import { db } from "@/server/db";

export const auth = betterAuth({
  appName: "inkflow",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60, // Cache duration in seconds (5 minutes)
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    nextCookies(),
    username({
      minUsernameLength: 5,
      maxUsernameLength: 100,
      usernameValidator: (username) => {
        if (/^admin\b/i.test(username)) {
          return false;
        }
        return true;
      },
    }),
    twoFactor(),
    admin(),
    passkey(),
  ],
});
