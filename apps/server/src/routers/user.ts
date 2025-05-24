import { z } from "zod";
import { protectedProcedure } from "@/lib/orpc";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import {
  featureLimits,
  featureUsage,
  userPlans,
} from "@/db/schema/subscription";
import { FeatureLimitService } from "@/services/feature-limit.service";

export const userRouter = {
  // Get feature limits for user's current plan
  getFeatureLimits: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      // Get user's plan
      const userPlan = await db
        .select()
        .from(userPlans)
        .where(
          and(
            eq(userPlans.userId, input.userId),
            eq(userPlans.status, "active")
          )
        )
        .limit(1);

      const planType = userPlan[0]?.planType || "free";

      // Get feature limits for this plan
      const limits = await db
        .select()
        .from(featureLimits)
        .where(
          and(
            eq(featureLimits.planType, planType),
            eq(featureLimits.enabled, true)
          )
        );

      return {
        planType,
        limits: limits.map((limit) => ({
          featureKey: limit.featureKey,
          limitType: limit.limitType,
          limitValue: limit.limitValue,
          resetPeriod: limit.resetPeriod,
        })),
      };
    }),

  // Get feature usage for a specific feature
  getFeatureUsage: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        featureKey: z.string(),
      })
    )
    .handler(async ({ input }) => {
      const usage = await db
        .select()
        .from(featureUsage)
        .where(
          and(
            eq(featureUsage.userId, input.userId),
            eq(featureUsage.featureKey, input.featureKey)
          )
        )
        .limit(1);

      if (!usage.length) {
        return {
          featureKey: input.featureKey,
          usageCount: 0,
          lastUsed: null,
          resetDate: null,
        };
      }

      const record = usage[0];

      // Check if usage should be reset
      if (record.resetDate && new Date() > record.resetDate) {
        return {
          featureKey: input.featureKey,
          usageCount: 0,
          lastUsed: record.lastUsed,
          resetDate: record.resetDate,
        };
      }

      return {
        featureKey: input.featureKey,
        usageCount: record.usageCount,
        lastUsed: record.lastUsed,
        resetDate: record.resetDate,
        metadata: record.metadata,
      };
    }),

  // Get all feature usage for user
  getAllFeatureUsage: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      const usage = await db
        .select()
        .from(featureUsage)
        .where(eq(featureUsage.userId, input.userId));

      return usage.map((record) => ({
        featureKey: record.featureKey,
        usageCount: record.usageCount,
        lastUsed: record.lastUsed,
        resetDate: record.resetDate,
        metadata: record.metadata,
      }));
    }),

  // Check if user can use a specific feature
  checkFeatureAccess: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        featureKey: z.enum([
          "concurrent_jobs",
          "daily_generations",
          "pdf_exports",
          "max_questions",
          "quiz_attempts",
        ]),
        requestedAmount: z.number().default(1),
      })
    )
    .handler(async ({ input }) => {
      return await FeatureLimitService.canUseFeature(
        input.userId,
        input.featureKey,
        input.requestedAmount
      );
    }),

  // Get user's current plan
  getUserPlan: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      const plan = await db
        .select()
        .from(userPlans)
        .where(
          and(
            eq(userPlans.userId, input.userId),
            eq(userPlans.status, "active")
          )
        )
        .limit(1);

      return (
        plan[0] || {
          planType: "free",
          status: "active",
          startDate: new Date(),
        }
      );
    }),
};
