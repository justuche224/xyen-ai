import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { todoRouter } from "./todo";
import { quizRouter } from "./quiz";
import { jobsRouter } from "./jobs";
import { userRouter } from "./user";
import { adminRouter } from "./admin";
export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  todo: todoRouter,
  quiz: quizRouter,
  jobs: jobsRouter,
  user: userRouter,
  admin: adminRouter,
};
export type AppRouter = typeof appRouter;
