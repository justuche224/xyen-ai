import { jobs } from "@/db/schema/jobs.js";
import { db } from "@/db/index.js";
import { quizAttempts, quizMeta } from "@/db/schema/quiz.js";
import { quiz } from "@/db/schema/quiz.js";
import { protectedProcedure } from "@/lib/orpc.js";
import { z } from "zod";
import { eq, and, desc, sql } from "drizzle-orm";

export const getAllUserQuizHandler = protectedProcedure
  .input(z.object({ userId: z.string() }))
  .handler(async ({ input }) => {
    const data = await db
      .select({
        id: quiz.id,
        title: quiz.title,
        quizType: quiz.quizType,
        documentLink: quiz.documentLink,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
        status: jobs.status,
        error: jobs.error,
        difficulty: quizMeta.difficulty,
        questionCount: quizMeta.questionCount,
        description: quizMeta.description,
        tags: quizMeta.tags,
        totalAttempts: sql<number>`count(${quizAttempts.id})`.as(
          "totalAttempts"
        ),
        averageScore: sql<number>`avg(${quizAttempts.score})`.as(
          "averageScore"
        ),
        totalTimeSpent:
          sql<number>`sum(extract(epoch from (${quizAttempts.endTime} - ${quizAttempts.startTime})))`.as(
            "totalTimeSpent"
          ),
        averageTimeSpent:
          sql<number>`avg(extract(epoch from (${quizAttempts.endTime} - ${quizAttempts.startTime})))`.as(
            "averageTimeSpent"
          ),
      })
      .from(quiz)
      .leftJoin(quizAttempts, eq(quiz.id, quizAttempts.quizId))
      .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
      .leftJoin(jobs, eq(quiz.jobId, jobs.id))
      .where(eq(quiz.userId, input.userId))
      .groupBy(
        quiz.id,
        quiz.title,
        quiz.quizType,
        quiz.documentLink,
        quiz.createdAt,
        quiz.updatedAt,
        jobs.status,
        jobs.error,
        quizMeta.questionCount,
        quizMeta.difficulty,
        quizMeta.tags,
        quizMeta.description
      )
      .orderBy(desc(quiz.createdAt));
    return data;
  });
