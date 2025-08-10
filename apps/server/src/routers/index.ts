import { protectedProcedure, publicProcedure } from "../lib/orpc.js";
import { todoRouter } from "./todo.js";
import { quizRouter } from "./quiz.js";
import { jobsRouter } from "./jobs.js";
import { userRouter } from "./user.js";
import { adminRouter } from "./admin.js";
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
