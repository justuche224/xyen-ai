#!/usr/bin/env ts-node
import "dotenv/config";
import { db } from "../db/index.js";
import { jobs } from "../db/schema/jobs.js";
import { quiz, quizMeta } from "../db/schema/quiz.js";
import { eq } from "drizzle-orm";
import { generateQuiz } from "./utils/generate-quiz.js";
async function fetchOneJob() {
    return db.transaction(async (tx) => {
        const [jobRow] = await tx
            .select()
            .from(jobs)
            .for("update", { skipLocked: true })
            .where(eq(jobs.status, "PENDING"))
            .orderBy(jobs.createdAt)
            .limit(1);
        if (!jobRow)
            return null;
        await tx
            .update(jobs)
            .set({ status: "PROCESSING", updatedAt: new Date() })
            .where(eq(jobs.id, jobRow.id));
        return jobRow;
    });
}
async function processJob(jobRow) {
    try {
        if (!jobRow.quizId) {
            console.error(`Job ${jobRow.id} has no quizId, marking as FAILED.`);
            await db
                .update(jobs)
                .set({
                status: "FAILED",
                error: "Missing quizId",
                updatedAt: new Date(),
            })
                .where(eq(jobs.id, jobRow.id));
            return;
        }
        const [quizEntry] = await db
            .select({
            documentLink: quiz.documentLink,
            quizType: quiz.quizType,
            questionCount: quizMeta.questionCount,
            difficulty: quizMeta.difficulty,
            customePrompt: quiz.customePrompt,
        })
            .from(quiz)
            .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
            .where(eq(quiz.id, jobRow.quizId));
        if (!quizEntry || !quizEntry.documentLink) {
            console.error(`Quiz entry or documentLink not found for quizId ${jobRow.quizId}, marking job ${jobRow.id} as FAILED.`);
            await db
                .update(jobs)
                .set({
                status: "FAILED",
                error: "Quiz entry or documentLink not found",
                updatedAt: new Date(),
            })
                .where(eq(jobs.id, jobRow.id));
            return;
        }
        const { data, error } = await generateQuiz(quizEntry.documentLink, quizEntry.quizType, quizEntry.difficulty, quizEntry.questionCount, quizEntry.customePrompt ?? undefined);
        if (error) {
            await db
                .update(jobs)
                .set({
                status: "FAILED",
                error,
                updatedAt: new Date(),
            })
                .where(eq(jobs.id, jobRow.id));
            return;
        }
        if (data) {
            await db.transaction(async (tx) => {
                await tx
                    .update(quiz)
                    .set({ data, updatedAt: new Date() })
                    .where(eq(quiz.id, jobRow.quizId));
                await tx
                    .update(jobs)
                    .set({ status: "COMPLETED", updatedAt: new Date() })
                    .where(eq(jobs.id, jobRow.id));
            });
            console.log(`Job ${jobRow.id} completed successfully.`);
        }
    }
    catch (err) {
        await db
            .update(jobs)
            .set({
            status: "FAILED",
            error: err.message,
            updatedAt: new Date(),
        })
            .where(eq(jobs.id, jobRow.id));
    }
}
async function main() {
    console.log("Worker started, polling for jobs…");
    while (true) {
        try {
            const job = await fetchOneJob();
            if (job) {
                console.log(`Picked up job ${job.id}`);
                await processJob(job);
            }
            else {
                await new Promise((r) => setTimeout(r, 30000));
                console.log("No job found, sleeping for 30 seconds");
            }
        }
        catch (err) {
            console.error("Worker loop error:", err);
            await new Promise((r) => setTimeout(r, 30000));
        }
    }
}
main();
