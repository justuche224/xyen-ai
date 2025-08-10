import { eq, and, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { userPlans, featureLimits, featureUsage, } from "../db/schema/subscription.js";
import { user } from "../db/schema/auth.js";
import { jobs } from "../db/schema/jobs.js";
export class FeatureLimitService {
    // Check if user can use a feature
    static async canUseFeature(userId, featureKey, requestedAmount = 1) {
        // Check if user is admin or tester - give them unlimited access
        const userData = await db
            .select({ role: user.role })
            .from(user)
            .where(eq(user.id, userId))
            .limit(1);
        if (userData[0]?.role === "admin" || userData[0]?.role === "tester") {
            return { allowed: true }; // Unlimited access for admins and testers
        }
        const userPlan = await this.getUserPlan(userId);
        // Get feature limit for this plan
        const featureLimit = await db
            .select()
            .from(featureLimits)
            .where(and(eq(featureLimits.planType, userPlan.planType), eq(featureLimits.featureKey, featureKey), eq(featureLimits.enabled, true)))
            .limit(1);
        if (!featureLimit.length) {
            return { allowed: true }; // No limit defined = unlimited
        }
        const limit = featureLimit[0];
        // Unlimited feature
        if (limit.limitValue === -1) {
            return { allowed: true };
        }
        // Get current usage
        const currentUsage = await this.getCurrentUsage(userId, featureKey, limit.limitType);
        // Special handling for concurrent limits
        if (limit.limitType === "concurrent") {
            const concurrent = await this.getConcurrentUsage(userId, featureKey);
            return {
                allowed: concurrent + requestedAmount <= limit.limitValue,
                limit: limit.limitValue,
                current: concurrent,
                message: concurrent + requestedAmount > limit.limitValue
                    ? `You can only have ${limit.limitValue} concurrent ${featureKey.replace("_", " ")}. Please wait for your current quiz generation to complete.`
                    : undefined,
            };
        }
        // Check if usage + requested amount exceeds limit
        const wouldExceed = currentUsage + requestedAmount > limit.limitValue;
        return {
            allowed: !wouldExceed,
            limit: limit.limitValue,
            current: currentUsage,
            message: wouldExceed
                ? `${featureKey.replace("_", " ")} limit reached (${currentUsage}/${limit.limitValue} used). ${limit.limitType === "daily"
                    ? "Resets daily."
                    : limit.limitType === "monthly"
                        ? "Resets monthly."
                        : ""}`
                : undefined,
        };
    }
    // Track feature usage
    static async trackUsage(userId, featureKey, amount = 1, metadata) {
        const today = new Date();
        // Get the reset period for this feature from the database
        const userPlan = await this.getUserPlan(userId);
        const featureLimit = await db
            .select()
            .from(featureLimits)
            .where(and(eq(featureLimits.planType, userPlan.planType), eq(featureLimits.featureKey, featureKey), eq(featureLimits.enabled, true)))
            .limit(1);
        const resetPeriod = featureLimit[0]?.resetPeriod || "daily";
        const resetDate = this.getNextResetDate(featureKey, resetPeriod);
        // First, try to find existing usage record
        const existing = await db
            .select()
            .from(featureUsage)
            .where(and(eq(featureUsage.userId, userId), eq(featureUsage.featureKey, featureKey)))
            .limit(1);
        if (existing.length) {
            // Update existing record
            await db
                .update(featureUsage)
                .set({
                usageCount: sql `${featureUsage.usageCount} + ${amount}`,
                lastUsed: today,
                metadata,
                updatedAt: today,
            })
                .where(and(eq(featureUsage.userId, userId), eq(featureUsage.featureKey, featureKey)));
        }
        else {
            // Insert new record
            await db.insert(featureUsage).values({
                id: crypto.randomUUID(),
                userId,
                featureKey,
                usageCount: amount,
                lastUsed: today,
                resetDate,
                metadata,
            });
        }
    }
    // Get user's current plan
    static async getUserPlan(userId) {
        // First check if user is admin or tester
        const userData = await db
            .select({ role: user.role })
            .from(user)
            .where(eq(user.id, userId))
            .limit(1);
        // If user is admin or tester, treat them as pro (unlimited access)
        if (userData[0]?.role === "admin" || userData[0]?.role === "tester") {
            return { planType: "pro" };
        }
        // Otherwise, get their actual plan
        const plan = await db
            .select()
            .from(userPlans)
            .where(and(eq(userPlans.userId, userId), eq(userPlans.status, "active")))
            .limit(1);
        return plan[0] || { planType: "free" };
    }
    // Get current usage for a feature
    static async getCurrentUsage(userId, featureKey, limitType) {
        const usage = await db
            .select()
            .from(featureUsage)
            .where(and(eq(featureUsage.userId, userId), eq(featureUsage.featureKey, featureKey)))
            .limit(1);
        if (!usage.length)
            return 0;
        const record = usage[0];
        // Check if usage should be reset
        if (record.resetDate && new Date() > record.resetDate) {
            await this.resetUsage(userId, featureKey);
            return 0;
        }
        return record.usageCount;
    }
    // Get concurrent usage (for jobs, etc.)
    static async getConcurrentUsage(userId, featureKey) {
        if (featureKey === "concurrent_jobs") {
            const activeJobs = await db
                .select({ count: sql `count(*)` })
                .from(jobs)
                .where(and(eq(jobs.userId, userId), sql `${jobs.status} IN ('PENDING', 'PROCESSING')`));
            return activeJobs[0]?.count || 0;
        }
        return 0;
    }
    // Reset usage counters
    static async resetUsage(userId, featureKey) {
        // Get the reset period for this feature from the database
        const userPlan = await this.getUserPlan(userId);
        const featureLimit = await db
            .select()
            .from(featureLimits)
            .where(and(eq(featureLimits.planType, userPlan.planType), eq(featureLimits.featureKey, featureKey), eq(featureLimits.enabled, true)))
            .limit(1);
        const resetPeriod = featureLimit[0]?.resetPeriod || "daily";
        await db
            .update(featureUsage)
            .set({
            usageCount: 0,
            resetDate: this.getNextResetDate(featureKey, resetPeriod),
            updatedAt: new Date(),
        })
            .where(and(eq(featureUsage.userId, userId), eq(featureUsage.featureKey, featureKey)));
    }
    // Calculate next reset date based on reset period
    static getNextResetDate(featureKey, resetPeriod = "daily") {
        const now = new Date();
        switch (resetPeriod) {
            case "monthly":
                const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                nextMonth.setHours(0, 0, 0, 0);
                return nextMonth;
            case "never":
                return new Date(8640000000000000); // Max Date
            case "daily":
            default:
                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                return tomorrow;
        }
    }
    // Seed default limits
    static async seedDefaultLimits() {
        const defaultLimits = [
            // Free plan limits
            {
                planType: "free",
                featureKey: "concurrent_jobs",
                limitType: "concurrent",
                limitValue: 1,
                resetPeriod: "never", // Concurrent limits don't reset
            },
            {
                planType: "free",
                featureKey: "daily_generations",
                limitType: "daily",
                limitValue: 3,
                resetPeriod: "daily",
            },
            {
                planType: "free",
                featureKey: "pdf_exports",
                limitType: "count",
                limitValue: 3,
                resetPeriod: "monthly", // PDF exports reset monthly
            },
            {
                planType: "free",
                featureKey: "max_questions",
                limitType: "count",
                limitValue: 10,
                resetPeriod: "never", // Per-quiz limit, doesn't reset
            },
            // Pro plan limits
            {
                planType: "pro",
                featureKey: "concurrent_jobs",
                limitType: "concurrent",
                limitValue: 3,
                resetPeriod: "never", // Concurrent limits don't reset
            },
            {
                planType: "pro",
                featureKey: "daily_generations",
                limitType: "daily",
                limitValue: -1,
                resetPeriod: "daily",
            }, // unlimited
            {
                planType: "pro",
                featureKey: "pdf_exports",
                limitType: "count",
                limitValue: -1,
                resetPeriod: "never", // Unlimited, no reset needed
            },
            {
                planType: "pro",
                featureKey: "max_questions",
                limitType: "count",
                limitValue: 30,
                resetPeriod: "never", // Per-quiz limit, doesn't reset
            },
        ];
        for (const limit of defaultLimits) {
            try {
                // Check if limit already exists
                const existing = await db
                    .select()
                    .from(featureLimits)
                    .where(and(eq(featureLimits.planType, limit.planType), eq(featureLimits.featureKey, limit.featureKey)))
                    .limit(1);
                if (!existing.length) {
                    await db.insert(featureLimits).values({
                        id: crypto.randomUUID(),
                        ...limit,
                    });
                    console.log(`✅ Added ${limit.planType} - ${limit.featureKey} limit`);
                }
                else {
                    console.log(`⏭️  Skipped ${limit.planType} - ${limit.featureKey} (already exists)`);
                }
            }
            catch (error) {
                console.error(`❌ Error inserting ${limit.planType} - ${limit.featureKey}:`, error);
            }
        }
    }
}
