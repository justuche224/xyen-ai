import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { protectedProcedure } from "../lib/orpc";
import { jobs } from "@/db/schema/jobs";
export const jobsRouter = {
    getAll: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .handler(async ({ input }) => {
        return await db.select({
            id: jobs.id,
            status: jobs.status,
            createdAt: jobs.createdAt,
            updatedAt: jobs.updatedAt,
            error: jobs.error,
        }).from(jobs).where(eq(jobs.userId, input.userId));
    }),
    getJobById: protectedProcedure
        .input(z.object({ jobId: z.string(), userId: z.string() }))
        .handler(async ({ input }) => {
        return await db
            .select()
            .from(jobs)
            .where(and(eq(jobs.id, input.jobId), eq(jobs.userId, input.userId)));
    }),
};
