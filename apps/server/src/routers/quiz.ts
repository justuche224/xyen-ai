import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { quiz } from "../db/schema/quiz";
import { protectedProcedure } from "../lib/orpc";
import { jobs } from "@/db/schema/jobs";

export const quizRouter = {
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      return await db
        .select({
          id: quiz.id,
          title: quiz.title,
          quizType: quiz.quizType,
          documentLink: quiz.documentLink,
          createdAt: quiz.createdAt,
          updatedAt: quiz.updatedAt,
          status: jobs.status,
          error: jobs.error,
        })
        .from(quiz)
        .where(eq(quiz.userId, input.userId))
        .orderBy(desc(quiz.createdAt))
        .leftJoin(jobs, eq(quiz.id, jobs.quizId));
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        quizType: z.enum(["multiple-choice", "yes-no","theory"]),
        documentLink: z.string(),
        userId: z.string(),
      })
    )
    .handler(async ({ input }) => {
      try {
        const quizId = crypto.randomUUID();
        const jobId = crypto.randomUUID();

        await db.insert(jobs).values({
          id: jobId,
          userId: input.userId,
          quizId,
          status: "PENDING",
          createdAt: new Date(),
        });

        await db.insert(quiz).values({
          id: quizId,
          title: input.title,
          documentLink: input.documentLink,
          userId: input.userId,
          jobId,
          quizType: input.quizType,
        });

        return {
          quizId,
          jobId,
        };
      } catch (error) {
        console.error(error);
        return {
          error: "Failed to create quiz",
        };
      }
    }),
  getQuizById: protectedProcedure
    .input(z.object({ quizId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      return await db
        .select({
          id: quiz.id,
          quizData: quiz.data,
          title: quiz.title,
          quizType: quiz.quizType,
          documentLink: quiz.documentLink,
          createdAt: quiz.createdAt,
          updatedAt: quiz.updatedAt,
          status: jobs.status,
          error: jobs.error,
        })
        .from(quiz)
        .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)))
        .leftJoin(jobs, eq(quiz.id, jobs.quizId));
    }),
  delete: protectedProcedure
    .input(z.object({ quizId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      await db
        .delete(quiz)
        .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)));
      return {
        success: true,
      };
    }),
};
