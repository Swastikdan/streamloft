import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const healthRouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return { status: "ok" };
  }),
  echo: publicProcedure
    .input(z.object({ message: z.string().min(1) }))
    .query(({ input }) => {
      const { message } = input;
      return { message };
    }),
});
