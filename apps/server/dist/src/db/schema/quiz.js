import { pgTable, text, timestamp, json, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { jobs } from "./jobs";
import { user } from "./auth";
export const quiz = pgTable("quiz", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    data: json("data"),
    jobId: text("jobId").references(() => jobs.id),
    documentLink: text("documentLink").notNull(),
    customePrompt: text("customePrompt"),
    quizType: text("quizType", {
        enum: ["multiple-choice", "yes-no", "theory"],
    }).notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const quizMeta = pgTable("quiz_meta", {
    id: text("id").primaryKey(),
    quizId: text("quiz_id").references(() => quiz.id, { onDelete: "cascade" }),
    questionCount: integer("question_count").notNull(),
    questionsAsPdf: text("questions_as_pdf"),
    description: text("description"),
    difficulty: text("difficulty", {
        enum: ["easy", "medium", "hard", "extreme"],
    }).notNull(),
    tags: text("tags").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const quizAttempts = pgTable("quiz_attempts", {
    id: text("id").primaryKey(),
    quizId: text("quiz_id").references(() => quiz.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    mode: text("mode", { enum: ["practice", "exam", "review"] }).notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time"),
    answers: json("answers"),
    score: integer("score"),
    status: text("status", { enum: ["in_progress", "completed"] }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const quizRelations = relations(quiz, ({ one, many }) => ({
    user: one(user, {
        fields: [quiz.userId],
        references: [user.id],
    }),
    job: one(jobs, {
        fields: [quiz.jobId],
        references: [jobs.id],
    }),
    meta: one(quizMeta, {
        fields: [quiz.id],
        references: [quizMeta.quizId],
    }),
    attempts: many(quizAttempts),
}));
export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
    quiz: one(quiz, {
        fields: [quizAttempts.quizId],
        references: [quiz.id],
    }),
    user: one(user, {
        fields: [quizAttempts.userId],
        references: [user.id],
    }),
}));
export const quizMetaRelations = relations(quizMeta, ({ one }) => ({
    quiz: one(quiz, {
        fields: [quizMeta.quizId],
        references: [quiz.id],
    }),
}));
