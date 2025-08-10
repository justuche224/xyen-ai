import { z } from "zod";
import { adminProcedure } from "@/lib/orpc";
import { eq, and } from "drizzle-orm";
import { db } from "@/db/index.js";
import { featureLimits, userPlans } from "@/db/schema/subscription.js";
import {
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserStatsHandler,
  changeUserRoleHandler,
  bulkUpdateUsersHandler,
} from "@/handlers/admin.users.js";
export const adminRouter = {
  // Update feature limits
  updateFeatureLimit: adminProcedure
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
  getFeatureLimits: adminProcedure.handler(async () => {
    return await db.select().from(featureLimits);
  }),

  // Upgrade user plan
  upgradeUserPlan: adminProcedure
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

  getAllUsers: getAllUsersHandler,
  getUser: getUserHandler,
  updateUser: updateUserHandler,
  deleteUser: deleteUserHandler,
  getUserStats: getUserStatsHandler,
  changeUserRole: changeUserRoleHandler,
  bulkUpdateUsers: bulkUpdateUsersHandler,
};
