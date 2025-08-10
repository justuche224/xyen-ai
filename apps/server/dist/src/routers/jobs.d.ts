import { z } from "zod";
export declare const jobsRouter: {
    getAll: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    } & Record<never, never>, {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    } & Record<never, never>, {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    }>, import("@orpc/server").MergedCurrentContext<{
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    }, {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        };
    }>, z.ZodObject<{
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: string;
    }>, import("@orpc/server").Schema<{
        id: string;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
        createdAt: Date;
        updatedAt: Date;
        error: string | null;
    }[], {
        id: string;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
        createdAt: Date;
        updatedAt: Date;
        error: string | null;
    }[]>, Record<never, never>, Record<never, never>>;
    getJobById: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    } & Record<never, never>, {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    } & Record<never, never>, {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    }>, import("@orpc/server").MergedCurrentContext<{
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        } | null;
    }, {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                role: string;
            };
        };
    }>, z.ZodObject<{
        jobId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        jobId: string;
    }, {
        userId: string;
        jobId: string;
    }>, import("@orpc/server").Schema<{
        error: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
        quizId: string | null;
    }[], {
        error: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
        quizId: string | null;
    }[]>, Record<never, never>, Record<never, never>>;
};
