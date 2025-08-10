import { pgTable, text, timestamp, integer, boolean, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth";
export const userPlans = pgTable("user_plans", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    planType: text("plan_type", { enum: ["free", "pro", "enterprise"] }).notNull().default("free"),
    status: text("status", { enum: ["active", "cancelled", "expired"] }).notNull().default("active"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"), // null for lifetime plans
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const featureLimits = pgTable("feature_limits", {
    id: text("id").primaryKey(),
    planType: text("plan_type", { enum: ["free", "pro", "enterprise"] }).notNull(),
    featureKey: text("feature_key").notNull(), // e.g., "concurrent_jobs", "daily_generations", "pdf_exports"
    limitType: text("limit_type", { enum: ["count", "daily", "monthly", "concurrent"] }).notNull(),
    limitValue: integer("limit_value").notNull(), // -1 for unlimited
    resetPeriod: text("reset_period", { enum: ["daily", "monthly", "never"] }),
    enabled: boolean("enabled").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const featureUsage = pgTable("feature_usage", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    featureKey: text("feature_key").notNull(),
    usageCount: integer("usage_count").notNull().default(0),
    lastUsed: timestamp("last_used"),
    resetDate: timestamp("reset_date"), // when this counter resets
    metadata: json("metadata"), // store additional context like question count, etc.
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const userPlanRelations = relations(userPlans, ({ one }) => ({
    user: one(user, {
        fields: [userPlans.userId],
        references: [user.id],
    }),
}));
export const featureUsageRelations = relations(featureUsage, ({ one }) => ({
    user: one(user, {
        fields: [featureUsage.userId],
        references: [user.id],
    }),
}));
