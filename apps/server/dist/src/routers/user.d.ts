import { z } from "zod";
export declare const userRouter: {
    getFeatureLimits: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
            };
        };
    }>, z.ZodObject<{
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: string;
    }>, import("@orpc/server").Schema<{
        planType: "free" | "pro" | "enterprise";
        limits: {
            featureKey: string;
            limitType: "count" | "daily" | "monthly" | "concurrent";
            limitValue: number;
            resetPeriod: "never" | "daily" | "monthly" | null;
        }[];
    }, {
        planType: "free" | "pro" | "enterprise";
        limits: {
            featureKey: string;
            limitType: "count" | "daily" | "monthly" | "concurrent";
            limitValue: number;
            resetPeriod: "never" | "daily" | "monthly" | null;
        }[];
    }>, Record<never, never>, Record<never, never>>;
    getFeatureUsage: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
            };
        };
    }>, z.ZodObject<{
        userId: z.ZodString;
        featureKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        featureKey: string;
    }, {
        userId: string;
        featureKey: string;
    }>, import("@orpc/server").Schema<{
        featureKey: string;
        usageCount: number;
        lastUsed: null;
        resetDate: null;
        metadata?: undefined;
    } | {
        featureKey: string;
        usageCount: number;
        lastUsed: Date | null;
        resetDate: Date;
        metadata?: undefined;
    } | {
        featureKey: string;
        usageCount: number;
        lastUsed: Date | null;
        resetDate: Date | null;
        metadata: unknown;
    }, {
        featureKey: string;
        usageCount: number;
        lastUsed: null;
        resetDate: null;
        metadata?: undefined;
    } | {
        featureKey: string;
        usageCount: number;
        lastUsed: Date | null;
        resetDate: Date;
        metadata?: undefined;
    } | {
        featureKey: string;
        usageCount: number;
        lastUsed: Date | null;
        resetDate: Date | null;
        metadata: unknown;
    }>, Record<never, never>, Record<never, never>>;
    getAllFeatureUsage: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
            };
        };
    }>, z.ZodObject<{
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: string;
    }>, import("@orpc/server").Schema<{
        featureKey: string;
        usageCount: number;
        lastUsed: Date | null;
        resetDate: Date | null;
        metadata: unknown;
    }[], {
        featureKey: string;
        usageCount: number;
        lastUsed: Date | null;
        resetDate: Date | null;
        metadata: unknown;
    }[]>, Record<never, never>, Record<never, never>>;
    checkFeatureAccess: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
            };
        };
    }>, z.ZodObject<{
        userId: z.ZodString;
        featureKey: z.ZodEnum<["concurrent_jobs", "daily_generations", "pdf_exports", "max_questions", "quiz_attempts"]>;
        requestedAmount: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        featureKey: "concurrent_jobs" | "daily_generations" | "pdf_exports" | "max_questions" | "quiz_attempts";
        requestedAmount: number;
    }, {
        userId: string;
        featureKey: "concurrent_jobs" | "daily_generations" | "pdf_exports" | "max_questions" | "quiz_attempts";
        requestedAmount?: number | undefined;
    }>, import("@orpc/server").Schema<{
        allowed: boolean;
        limit?: number;
        current?: number;
        message?: string;
    }, {
        allowed: boolean;
        limit?: number;
        current?: number;
        message?: string;
    }>, Record<never, never>, Record<never, never>>;
    getUserPlan: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: "active" | "cancelled" | "expired";
        planType: "free" | "pro" | "enterprise";
        startDate: Date;
        endDate: Date | null;
    }, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: "active" | "cancelled" | "expired";
        planType: "free" | "pro" | "enterprise";
        startDate: Date;
        endDate: Date | null;
    }>, Record<never, never>, Record<never, never>>;
    getCurrentUser: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
            };
        };
    }>, import("@orpc/server").Schema<unknown, unknown>, import("@orpc/server").Schema<{
        role: "user" | "admin" | "tester";
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emailVerified: boolean;
        image: string | null;
    }, {
        role: "user" | "admin" | "tester";
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emailVerified: boolean;
        image: string | null;
    }>, Record<never, never>, Record<never, never>>;
    updateCurrentUser: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
            };
        };
    }>, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        image?: string | null | undefined;
    }, {
        name?: string | undefined;
        image?: string | null | undefined;
    }>, import("@orpc/server").Schema<{
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: "user" | "admin" | "tester";
        createdAt: Date;
        updatedAt: Date;
    }, {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: "user" | "admin" | "tester";
        createdAt: Date;
        updatedAt: Date;
    }>, Record<never, never>, Record<never, never>>;
};
