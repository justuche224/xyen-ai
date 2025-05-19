import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth";

export const jobs = pgTable("jobs", {
  id: text("id")
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  quizId: text("quiz_id"),
  status: text("status", {
    enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
  }).notNull(),
  error: text("error"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const jobRelations = relations(jobs, ({ one }) => ({
  user: one(user, {
    fields: [jobs.userId],
    references: [user.id],
  }),
}));
