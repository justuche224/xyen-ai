import { pgTable, text, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { jobs } from "./jobs";
import { user } from "./auth";

export const quiz = pgTable("quiz", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  data: json("data"),
  jobId: text("jobId").references(() => jobs.id),
  documentLink: text("documentLink").notNull(),
  quizType: text("quizType", { enum: ["multiple-choice", "yes-no","theory"] }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const quizRelations = relations(quiz, ({ one }) => ({
  user: one(user, {
    fields: [quiz.userId],
    references: [user.id],
  }),
  job: one(jobs, {
    fields: [quiz.jobId],
    references: [jobs.id],
  }),
}));
