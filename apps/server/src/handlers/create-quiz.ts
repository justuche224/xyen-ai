import { protectedProcedure } from "@/lib/orpc";

import { FeatureLimitService } from "@/services/feature-limit.service";
import { db } from "@/db";
import { jobs } from "@/db/schema/jobs";
import { quiz, quizMeta } from "@/db/schema/quiz";
import { requireFeature } from "@/lib/feature-middleware";
import { z } from "zod";
import { ORPCError } from "@orpc/server";

export const createQuizHandler = protectedProcedure
  .use(requireFeature("daily_generations", 1, false))
  .input(
    z.object({
      title: z.string(),
      quizType: z.enum(["multiple-choice", "yes-no", "theory"]),
      documentLink: z.string(),
      userId: z.string(),
      difficulty: z.enum(["easy", "medium", "hard", "extreme"]),
      tags: z.array(z.string()),
      questionCount: z.number(),
      description: z.string().optional(),
      customePrompt: z.string().optional(),
    })
  )
  .handler(async ({ input }) => {
    // Check question count limit
    const questionCheck = await FeatureLimitService.canUseFeature(
      input.userId,
      "max_questions",
      input.questionCount
    );

    if (!questionCheck.allowed) {
      throw new ORPCError("FORBIDDEN", {
        message: `Question count exceeds limit. Max allowed: ${questionCheck.limit}`,
      });
    }

    // Check concurrent jobs limit
    const jobCheck = await FeatureLimitService.canUseFeature(
      input.userId,
      "concurrent_jobs"
    );

    if (!jobCheck.allowed) {
      throw new ORPCError("FORBIDDEN", {
        message: jobCheck.message,
      });
    }

    try {
      const quizId = crypto.randomUUID();
      const jobId = crypto.randomUUID();
      const quizMetaId = crypto.randomUUID();

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
        customePrompt: input.customePrompt,
      });

      await db.insert(quizMeta).values({
        id: quizMetaId,
        quizId,
        difficulty: input.difficulty,
        tags: input.tags,
        questionCount: input.questionCount,
        description: input.description,
      });

      // Track usage after successful creation
      await FeatureLimitService.trackUsage(
        input.userId,
        "daily_generations",
        1,
        {
          questionCount: input.questionCount,
          quizType: input.quizType,
        }
      );

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
  });
