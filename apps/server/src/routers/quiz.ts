import { eq, and, desc, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { quiz } from "@/db/schema/quiz";
import { protectedProcedure } from "@/lib/orpc";
import { jobs } from "@/db/schema/jobs";
import { quizAttempts, quizMeta } from "@/db/schema/quiz";
import { generateQuizPDFHandler } from "@/scripts/utils/generate-pdf";
import { getAllUserQuizHandler } from "@/handlers/get-all-user-quiz";
import { createQuizHandler } from "@/handlers/create-quiz";
import { uploadFile } from "@/lib/upload-file";
import { ORPCError } from "@orpc/server";

export const quizRouter = {
  uploadDocument: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        mimeType: z.literal("application/pdf"),
        size: z.number(),
        contentBase64: z.string(),
        uploadType: z.enum(["quiz", "note"]),
      })
    )
    .handler(async ({ input }) => {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;

      if (input.size > MAX_FILE_SIZE) {
        throw new ORPCError("BAD_REQUEST", {
          message: "File size exceeds the 5MB limit",
        });
      }

      try {
        const buffer = Buffer.from(input.contentBase64, "base64");
        const file = new File([buffer], input.fileName, {
          type: input.mimeType,
        });

        const url = await uploadFile(file, input.uploadType);
        return { url };
      } catch (error) {
        console.error("Error uploading document:", error);
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "File upload failed",
        });
      }
    }),
  generateQuizPDF: generateQuizPDFHandler,
  getAll: getAllUserQuizHandler,
  getOnlyQuizTitle: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number(),
        offset: z.number(),
      })
    )
    .handler(async ({ input }) => {
      const { userId, limit, offset } = input;
      const quizList = await db
        .select({
          id: quiz.id,
          title: quiz.title,
        })
        .from(quiz)
        .where(eq(quiz.userId, userId))
        .limit(limit)
        .offset(offset);
      return quizList;
    }),
  create: createQuizHandler,
  getQuizById: protectedProcedure
    .input(z.object({ quizId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      console.log(input);

      // Get quiz details first
      const quizDetails = await db
        .select({
          id: quiz.id,
          quizData: quiz.data,
          title: quiz.title,
          quizType: quiz.quizType,
          documentLink: quiz.documentLink,
          createdAt: quiz.createdAt,
          updatedAt: quiz.updatedAt,
          questionCount: quizMeta.questionCount,
          description: quizMeta.description,
          status: jobs.status,
          error: jobs.error,
          difficulty: quizMeta.difficulty,
          tags: quizMeta.tags,
        })
        .from(quiz)
        .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
        .leftJoin(jobs, eq(quiz.jobId, jobs.id))
        .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)))
        .limit(1);

      if (!quizDetails.length) {
        throw new Error("Quiz not found or unauthorized");
      }

      // Get attempt statistics separately
      const attemptStats = await db
        .select({
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
        .from(quizAttempts)
        .where(eq(quizAttempts.quizId, input.quizId));

      const stats = attemptStats[0] || {
        totalAttempts: 0,
        averageScore: null,
        totalTimeSpent: null,
        averageTimeSpent: null,
      };

      return {
        ...quizDetails[0],
        ...stats,
      };
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
  startAttempt: protectedProcedure
    .input(
      z.object({
        quizId: z.string(),
        userId: z.string(),
        mode: z.enum(["practice", "exam", "review"]),
      })
    )
    .handler(async ({ input }) => {
      const attemptId = crypto.randomUUID();

      // Verify quiz exists and user has access
      const quizExists = await db
        .select({ id: quiz.id })
        .from(quiz)
        .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)))
        .limit(1);

      if (!quizExists.length) {
        throw new Error("Quiz not found or unauthorized");
      }

      await db.insert(quizAttempts).values({
        id: attemptId,
        quizId: input.quizId,
        userId: input.userId,
        mode: input.mode,
        startTime: new Date(),
        status: "in_progress",
      });

      return { attemptId };
    }),
  getAttempt: protectedProcedure
    .input(z.object({ attemptId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      const result = await db
        .select()
        .from(quizAttempts)
        .where(
          and(
            eq(quizAttempts.id, input.attemptId),
            eq(quizAttempts.userId, input.userId)
          )
        )
        .limit(1);

      return result[0] || null;
    }),
  updateAttempt: protectedProcedure
    .input(
      z.object({
        attemptId: z.string(),
        userId: z.string(),
        answers: z.any().optional(),
        score: z.number().optional(),
        endTime: z.date().optional(),
        status: z.enum(["in_progress", "completed"]).optional(),
      })
    )
    .handler(async ({ input }) => {
      const { attemptId, userId, ...updateData } = input;

      await db
        .update(quizAttempts)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(
          and(eq(quizAttempts.id, attemptId), eq(quizAttempts.userId, userId))
        );

      return { success: true };
    }),
  completeAttempt: protectedProcedure
    .input(
      z.object({
        attemptId: z.string(),
        userId: z.string(),
        answers: z.any(),
        score: z.number(),
      })
    )
    .handler(async ({ input }) => {
      await db
        .update(quizAttempts)
        .set({
          answers: input.answers,
          score: input.score,
          endTime: new Date(),
          status: "completed",
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(quizAttempts.id, input.attemptId),
            eq(quizAttempts.userId, input.userId)
          )
        );

      return { success: true };
    }),
  getUserAttempts: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        quizId: z.string().optional(),
        mode: z.enum(["practice", "exam", "review"]).optional(),
        status: z.enum(["in_progress", "completed"]).optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .handler(async ({ input }) => {
      const conditions = [eq(quizAttempts.userId, input.userId)];

      if (input.quizId) {
        conditions.push(eq(quizAttempts.quizId, input.quizId));
      }
      if (input.mode) {
        conditions.push(eq(quizAttempts.mode, input.mode));
      }
      if (input.status) {
        conditions.push(eq(quizAttempts.status, input.status));
      }

      return await db
        .select({
          id: quizAttempts.id,
          quizId: quizAttempts.quizId,
          mode: quizAttempts.mode,
          startTime: quizAttempts.startTime,
          endTime: quizAttempts.endTime,
          score: quizAttempts.score,
          status: quizAttempts.status,
          createdAt: quizAttempts.createdAt,
          quizTitle: quiz.title,
          quizType: quiz.quizType,
          duration:
            sql<number>`extract(epoch from (${quizAttempts.endTime} - ${quizAttempts.startTime}))`.as(
              "duration"
            ),
        })
        .from(quizAttempts)
        .leftJoin(quiz, eq(quizAttempts.quizId, quiz.id))
        .where(and(...conditions))
        .orderBy(desc(quizAttempts.createdAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  getAttemptDetails: protectedProcedure
    .input(z.object({ attemptId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      const result = await db
        .select({
          attempt: quizAttempts,
          quiz: {
            id: quiz.id,
            title: quiz.title,
            quizType: quiz.quizType,
            data: quiz.data,
          },
          meta: quizMeta,
        })
        .from(quizAttempts)
        .leftJoin(quiz, eq(quizAttempts.quizId, quiz.id))
        .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
        .where(
          and(
            eq(quizAttempts.id, input.attemptId),
            eq(quizAttempts.userId, input.userId)
          )
        )
        .limit(1);

      return result[0] || null;
    }),

  deleteAttempt: protectedProcedure
    .input(z.object({ attemptId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      await db
        .delete(quizAttempts)
        .where(
          and(
            eq(quizAttempts.id, input.attemptId),
            eq(quizAttempts.userId, input.userId)
          )
        );

      return { success: true };
    }),
  getQuizStats: protectedProcedure
    .input(z.object({ quizId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      // Verify ownership
      const quizExists = await db
        .select({ id: quiz.id })
        .from(quiz)
        .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)))
        .limit(1);

      if (!quizExists.length) {
        throw new Error("Quiz not found or unauthorized");
      }

      const stats = await db
        .select({
          totalAttempts: sql<number>`count(*)`.as("totalAttempts"),
          completedAttempts:
            sql<number>`count(*) filter (where ${quizAttempts.status} = 'completed')`.as(
              "completedAttempts"
            ),
          averageScore:
            sql<number>`avg(${quizAttempts.score}) filter (where ${quizAttempts.status} = 'completed')`.as(
              "averageScore"
            ),
          highestScore:
            sql<number>`max(${quizAttempts.score}) filter (where ${quizAttempts.status} = 'completed')`.as(
              "highestScore"
            ),
          lowestScore:
            sql<number>`min(${quizAttempts.score}) filter (where ${quizAttempts.status} = 'completed')`.as(
              "lowestScore"
            ),
          averageDuration:
            sql<number>`avg(extract(epoch from (${quizAttempts.endTime} - ${quizAttempts.startTime}))) filter (where ${quizAttempts.status} = 'completed')`.as(
              "averageDuration"
            ),
          practiceAttempts:
            sql<number>`count(*) filter (where ${quizAttempts.mode} = 'practice')`.as(
              "practiceAttempts"
            ),
          examAttempts:
            sql<number>`count(*) filter (where ${quizAttempts.mode} = 'exam')`.as(
              "examAttempts"
            ),
          reviewAttempts:
            sql<number>`count(*) filter (where ${quizAttempts.mode} = 'review')`.as(
              "reviewAttempts"
            ),
        })
        .from(quizAttempts)
        .where(eq(quizAttempts.quizId, input.quizId));

      const result = stats[0];

      // Handle null values and provide defaults
      return {
        totalAttempts: result?.totalAttempts ?? 0,
        completedAttempts: result?.completedAttempts ?? 0,
        averageScore: result?.averageScore ?? null,
        highestScore: result?.highestScore ?? null,
        lowestScore: result?.lowestScore ?? null,
        averageDuration: result?.averageDuration ?? null,
        practiceAttempts: result?.practiceAttempts ?? 0,
        examAttempts: result?.examAttempts ?? 0,
        reviewAttempts: result?.reviewAttempts ?? 0,
      };
    }),

  getUserQuizStats: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      console.log("about to check stats");

      const [basicStats] = await db
        .select({
          totalQuizzes: sql<number>`count(distinct ${quiz.id})`.as(
            "totalQuizzes"
          ),
          totalAttempts: sql<number>`count(${quizAttempts.id})`.as(
            "totalAttempts"
          ),
          completedAttempts:
            sql<number>`count(*) filter (where ${quizAttempts.status} = 'completed')`.as(
              "completedAttempts"
            ),
          averageScore:
            sql<number>`avg(${quizAttempts.score}) filter (where ${quizAttempts.status} = 'completed')`.as(
              "averageScore"
            ),
          totalTimeSpent:
            sql<number>`sum(extract(epoch from (${quizAttempts.endTime} - ${quizAttempts.startTime}))) filter (where ${quizAttempts.status} = 'completed')`.as(
              "totalTimeSpent"
            ),
        })
        .from(quiz)
        .leftJoin(quizAttempts, eq(quiz.id, quizAttempts.quizId))
        .where(eq(quiz.userId, input.userId));

      const bestScore = await db
        .select({
          bestScore:
            sql<number>`max(${quizAttempts.score}) filter (where ${quizAttempts.status} = 'completed')`.as(
              "bestScore"
            ),
        })
        .from(quizAttempts)
        .where(eq(quizAttempts.userId, input.userId));

      const difficultyStats = await db
        .select({
          difficulty: quizMeta.difficulty,
          count: sql<number>`count(distinct ${quiz.id})`.as("count"),
        })
        .from(quiz)
        .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
        .where(eq(quiz.userId, input.userId))
        .groupBy(quizMeta.difficulty)
        .having(sql`${quizMeta.difficulty} is not null`);

      const quizTypeStats = await db
        .select({
          quizType: quiz.quizType,
          count: sql<number>`count(distinct ${quiz.id})`.as("count"),
        })
        .from(quiz)
        .where(eq(quiz.userId, input.userId))
        .groupBy(quiz.quizType);

      // Transform to the desired format
      const byDifficulty = Object.fromEntries(
        difficultyStats.map((stat) => [stat.difficulty, stat.count])
      );

      const byQuizType = Object.fromEntries(
        quizTypeStats.map((stat) => [stat.quizType, stat.count])
      );

      const stats = {
        ...basicStats,
        byDifficulty,
        byQuizType,
        bestScore,
      };
      console.log(stats);

      return stats;
    }),

  getRecentActivity: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().default(10),
      })
    )
    .handler(async ({ input }) => {
      return await db
        .select({
          id: quizAttempts.id,
          quizId: quizAttempts.quizId,
          quizTitle: quiz.title,
          mode: quizAttempts.mode,
          status: quizAttempts.status,
          score: quizAttempts.score,
          startTime: quizAttempts.startTime,
          endTime: quizAttempts.endTime,
          duration:
            sql<number>`extract(epoch from (${quizAttempts.endTime} - ${quizAttempts.startTime}))`.as(
              "duration"
            ),
        })
        .from(quizAttempts)
        .leftJoin(quiz, eq(quizAttempts.quizId, quiz.id))
        .where(eq(quizAttempts.userId, input.userId))
        .orderBy(desc(quizAttempts.createdAt))
        .limit(input.limit);
    }),
  bulkDeleteAttempts: protectedProcedure
    .input(
      z.object({
        attemptIds: z.array(z.string()),
        userId: z.string(),
      })
    )
    .handler(async ({ input }) => {
      if (input.attemptIds.length === 0) {
        return { success: true, deletedCount: 0 };
      }

      const result = await db
        .delete(quizAttempts)
        .where(
          and(
            sql`${quizAttempts.id} = ANY(${input.attemptIds})`,
            eq(quizAttempts.userId, input.userId)
          )
        );

      return { success: true, deletedCount: result.rowCount || 0 };
    }),

  exportQuizData: protectedProcedure
    .input(z.object({ quizId: z.string(), userId: z.string() }))
    .handler(async ({ input }) => {
      // Verify ownership
      const quizData = await db
        .select()
        .from(quiz)
        .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
        .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)))
        .limit(1);

      if (!quizData.length) {
        throw new Error("Quiz not found or unauthorized");
      }

      const attempts = await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.quizId, input.quizId))
        .orderBy(desc(quizAttempts.createdAt));

      return {
        quiz: quizData[0],
        attempts: attempts,
        exportedAt: new Date(),
      };
    }),
};
