import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const healthRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return {
      status: "healthy",
      message: "Server is running normally",
    };
  }),
});
