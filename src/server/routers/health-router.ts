import { z } from "zod";
import { j, publicProcedure } from "@jstack";
export const healthRouter = j.router({
  health: publicProcedure.query(async ({ c }) => {
    return c.superjson({ status: "ok" });
  }),
  echo: publicProcedure
    .input(z.object({ message: z.string().min(1) }))
    .query(async ({ c, input }) => {
      const { message } = input;
      return c.superjson({ message });
    }),
});
