import { z } from "zod";
import { protectedProcedure } from "@/lib/orpc";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { featureLimits, userPlans } from "@/db/schema/subscription";

export const adminRouter = {
  // Update feature limits
  updateFeatureLimit: protectedProcedure
    .input(
      z.object({
        planType: z.enum(["free", "pro", "enterprise"]),
        featureKey: z.string(),
        limitValue: z.number(),
        enabled: z.boolean().optional(),
      })
    )
    .handler(async ({ input }) => {
      await db
        .update(featureLimits)
        .set({
          limitValue: input.limitValue,
          enabled: input.enabled,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(featureLimits.planType, input.planType),
            eq(featureLimits.featureKey, input.featureKey)
          )
        );

      return { success: true };
    }),

  // Get all feature limits
  getFeatureLimits: protectedProcedure.handler(async () => {
    return await db.select().from(featureLimits);
  }),

  // Upgrade user plan
  upgradeUserPlan: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        planType: z.enum(["free", "pro", "enterprise"]),
      })
    )
    .handler(async ({ input }) => {
      // Check if user already has a plan
      const existingPlan = await db
        .select()
        .from(userPlans)
        .where(eq(userPlans.userId, input.userId))
        .limit(1);

      if (existingPlan.length) {
        // Update existing plan
        await db
          .update(userPlans)
          .set({
            planType: input.planType,
            updatedAt: new Date(),
          })
          .where(eq(userPlans.userId, input.userId));
      } else {
        // Insert new plan
        await db.insert(userPlans).values({
          id: crypto.randomUUID(),
          userId: input.userId,
          planType: input.planType,
          status: "active",
          startDate: new Date(),
        });
      }

      return { success: true };
    }),
};
