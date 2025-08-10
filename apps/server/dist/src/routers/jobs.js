import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { protectedProcedure } from "../lib/orpc.js";
import { jobs } from "../db/schema/jobs.js";
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
