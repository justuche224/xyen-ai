import { z } from "zod";
export declare const quizRouter: {
    uploadDocument: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        fileName: z.ZodString;
        mimeType: z.ZodLiteral<"application/pdf">;
        size: z.ZodNumber;
        contentBase64: z.ZodString;
        uploadType: z.ZodEnum<["quiz", "note"]>;
    }, "strip", z.ZodTypeAny, {
        size: number;
        fileName: string;
        mimeType: "application/pdf";
        contentBase64: string;
        uploadType: "quiz" | "note";
    }, {
        size: number;
        fileName: string;
        mimeType: "application/pdf";
        contentBase64: string;
        uploadType: "quiz" | "note";
    }>, import("@orpc/server").Schema<{
        url: string;
    }, {
        url: string;
    }>, Record<never, never>, Record<never, never>>;
    generateQuizPDF: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
    }>, {
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
    } & Record<never, never>, import("@orpc/server").MergedCurrentContext<{
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
    }>>, import("@orpc/server").MergedCurrentContext<import("@orpc/server").MergedCurrentContext<{
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
    }>, {
        featureCheck: {
            allowed: boolean;
            limit?: number;
            current?: number;
            message?: string;
        };
        session: NonNullable<{
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
        }>;
    }>, z.ZodObject<{
        quizId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        quizId: string;
    }, {
        userId: string;
        quizId: string;
    }>, import("@orpc/server").Schema<{
        success: boolean;
        pdfUrl: string;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        pdfUrl?: undefined;
        message?: undefined;
    }, {
        success: boolean;
        pdfUrl: string;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        pdfUrl?: undefined;
        message?: undefined;
    }>, Record<never, never>, Record<never, never>>;
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
        title: string;
        quizType: "multiple-choice" | "yes-no" | "theory";
        documentLink: string;
        createdAt: Date;
        updatedAt: Date;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | null;
        error: string | null;
        difficulty: "easy" | "medium" | "hard" | "extreme" | null;
        questionCount: number | null;
        description: string | null;
        tags: string[] | null;
        totalAttempts: number;
        averageScore: number;
        totalTimeSpent: number;
        averageTimeSpent: number;
    }[], {
        id: string;
        title: string;
        quizType: "multiple-choice" | "yes-no" | "theory";
        documentLink: string;
        createdAt: Date;
        updatedAt: Date;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | null;
        error: string | null;
        difficulty: "easy" | "medium" | "hard" | "extreme" | null;
        questionCount: number | null;
        description: string | null;
        tags: string[] | null;
        totalAttempts: number;
        averageScore: number;
        totalTimeSpent: number;
        averageTimeSpent: number;
    }[]>, Record<never, never>, Record<never, never>>;
    getOnlyQuizTitle: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        limit: z.ZodNumber;
        offset: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        limit: number;
        offset: number;
    }, {
        userId: string;
        limit: number;
        offset: number;
    }>, import("@orpc/server").Schema<{
        id: string;
        title: string;
    }[], {
        id: string;
        title: string;
    }[]>, Record<never, never>, Record<never, never>>;
    create: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
    }>, {
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
    } & Record<never, never>, import("@orpc/server").MergedCurrentContext<{
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
    }>>, import("@orpc/server").MergedCurrentContext<import("@orpc/server").MergedCurrentContext<{
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
    }>, {
        featureCheck: {
            allowed: boolean;
            limit?: number;
            current?: number;
            message?: string;
        };
        session: NonNullable<{
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
        }>;
    }>, z.ZodObject<{
        title: z.ZodString;
        quizType: z.ZodEnum<["multiple-choice", "yes-no", "theory"]>;
        documentLink: z.ZodString;
        userId: z.ZodString;
        difficulty: z.ZodEnum<["easy", "medium", "hard", "extreme"]>;
        tags: z.ZodArray<z.ZodString, "many">;
        questionCount: z.ZodNumber;
        description: z.ZodOptional<z.ZodString>;
        customePrompt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        title: string;
        documentLink: string;
        quizType: "multiple-choice" | "yes-no" | "theory";
        questionCount: number;
        difficulty: "easy" | "medium" | "hard" | "extreme";
        tags: string[];
        description?: string | undefined;
        customePrompt?: string | undefined;
    }, {
        userId: string;
        title: string;
        documentLink: string;
        quizType: "multiple-choice" | "yes-no" | "theory";
        questionCount: number;
        difficulty: "easy" | "medium" | "hard" | "extreme";
        tags: string[];
        description?: string | undefined;
        customePrompt?: string | undefined;
    }>, import("@orpc/server").Schema<{
        quizId: `${string}-${string}-${string}-${string}-${string}`;
        jobId: `${string}-${string}-${string}-${string}-${string}`;
        error?: undefined;
    } | {
        error: string;
        quizId?: undefined;
        jobId?: undefined;
    }, {
        quizId: `${string}-${string}-${string}-${string}-${string}`;
        jobId: `${string}-${string}-${string}-${string}-${string}`;
        error?: undefined;
    } | {
        error: string;
        quizId?: undefined;
        jobId?: undefined;
    }>, Record<never, never>, Record<never, never>>;
    getQuizById: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        quizId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        quizId: string;
    }, {
        userId: string;
        quizId: string;
    }>, import("@orpc/server").Schema<{
        totalAttempts: number;
        averageScore: number;
        totalTimeSpent: number;
        averageTimeSpent: number;
        id: string;
        quizData: unknown;
        title: string;
        quizType: "multiple-choice" | "yes-no" | "theory";
        documentLink: string;
        createdAt: Date;
        updatedAt: Date;
        questionCount: number | null;
        description: string | null;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | null;
        error: string | null;
        difficulty: "easy" | "medium" | "hard" | "extreme" | null;
        tags: string[] | null;
    }, {
        totalAttempts: number;
        averageScore: number;
        totalTimeSpent: number;
        averageTimeSpent: number;
        id: string;
        quizData: unknown;
        title: string;
        quizType: "multiple-choice" | "yes-no" | "theory";
        documentLink: string;
        createdAt: Date;
        updatedAt: Date;
        questionCount: number | null;
        description: string | null;
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | null;
        error: string | null;
        difficulty: "easy" | "medium" | "hard" | "extreme" | null;
        tags: string[] | null;
    }>, Record<never, never>, Record<never, never>>;
    delete: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        quizId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        quizId: string;
    }, {
        userId: string;
        quizId: string;
    }>, import("@orpc/server").Schema<{
        success: boolean;
    }, {
        success: boolean;
    }>, Record<never, never>, Record<never, never>>;
    startAttempt: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        quizId: z.ZodString;
        userId: z.ZodString;
        mode: z.ZodEnum<["practice", "exam", "review"]>;
    }, "strip", z.ZodTypeAny, {
        mode: "practice" | "exam" | "review";
        userId: string;
        quizId: string;
    }, {
        mode: "practice" | "exam" | "review";
        userId: string;
        quizId: string;
    }>, import("@orpc/server").Schema<{
        attemptId: `${string}-${string}-${string}-${string}-${string}`;
    }, {
        attemptId: `${string}-${string}-${string}-${string}-${string}`;
    }>, Record<never, never>, Record<never, never>>;
    getAttempt: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        attemptId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        attemptId: string;
    }, {
        userId: string;
        attemptId: string;
    }>, import("@orpc/server").Schema<{
        id: string;
        mode: "practice" | "exam" | "review";
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        quizId: string | null;
        status: "in_progress" | "completed";
        startTime: Date;
        endTime: Date | null;
        answers: unknown;
        score: number | null;
    }, {
        id: string;
        mode: "practice" | "exam" | "review";
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        quizId: string | null;
        status: "in_progress" | "completed";
        startTime: Date;
        endTime: Date | null;
        answers: unknown;
        score: number | null;
    }>, Record<never, never>, Record<never, never>>;
    updateAttempt: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        attemptId: z.ZodString;
        userId: z.ZodString;
        answers: z.ZodOptional<z.ZodAny>;
        score: z.ZodOptional<z.ZodNumber>;
        endTime: z.ZodOptional<z.ZodDate>;
        status: z.ZodOptional<z.ZodEnum<["in_progress", "completed"]>>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        attemptId: string;
        status?: "in_progress" | "completed" | undefined;
        endTime?: Date | undefined;
        answers?: any;
        score?: number | undefined;
    }, {
        userId: string;
        attemptId: string;
        status?: "in_progress" | "completed" | undefined;
        endTime?: Date | undefined;
        answers?: any;
        score?: number | undefined;
    }>, import("@orpc/server").Schema<{
        success: boolean;
    }, {
        success: boolean;
    }>, Record<never, never>, Record<never, never>>;
    completeAttempt: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        attemptId: z.ZodString;
        userId: z.ZodString;
        answers: z.ZodAny;
        score: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        score: number;
        attemptId: string;
        answers?: any;
    }, {
        userId: string;
        score: number;
        attemptId: string;
        answers?: any;
    }>, import("@orpc/server").Schema<{
        success: boolean;
    }, {
        success: boolean;
    }>, Record<never, never>, Record<never, never>>;
    getUserAttempts: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        quizId: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<["practice", "exam", "review"]>>;
        status: z.ZodOptional<z.ZodEnum<["in_progress", "completed"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        limit: number;
        offset: number;
        mode?: "practice" | "exam" | "review" | undefined;
        quizId?: string | undefined;
        status?: "in_progress" | "completed" | undefined;
    }, {
        userId: string;
        mode?: "practice" | "exam" | "review" | undefined;
        quizId?: string | undefined;
        status?: "in_progress" | "completed" | undefined;
        limit?: number | undefined;
        offset?: number | undefined;
    }>, import("@orpc/server").Schema<{
        id: string;
        quizId: string | null;
        mode: "practice" | "exam" | "review";
        startTime: Date;
        endTime: Date | null;
        score: number | null;
        status: "in_progress" | "completed";
        createdAt: Date;
        quizTitle: string | null;
        quizType: "multiple-choice" | "yes-no" | "theory" | null;
        duration: number;
    }[], {
        id: string;
        quizId: string | null;
        mode: "practice" | "exam" | "review";
        startTime: Date;
        endTime: Date | null;
        score: number | null;
        status: "in_progress" | "completed";
        createdAt: Date;
        quizTitle: string | null;
        quizType: "multiple-choice" | "yes-no" | "theory" | null;
        duration: number;
    }[]>, Record<never, never>, Record<never, never>>;
    getAttemptDetails: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        attemptId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        attemptId: string;
    }, {
        userId: string;
        attemptId: string;
    }>, import("@orpc/server").Schema<{
        attempt: {
            id: string;
            mode: "practice" | "exam" | "review";
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            quizId: string | null;
            status: "in_progress" | "completed";
            startTime: Date;
            endTime: Date | null;
            answers: unknown;
            score: number | null;
        };
        quiz: {
            id: string;
            data: unknown;
            title: string;
            quizType: "multiple-choice" | "yes-no" | "theory";
        } | null;
        meta: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string | null;
            description: string | null;
            questionCount: number;
            questionsAsPdf: string | null;
            difficulty: "easy" | "medium" | "hard" | "extreme";
            tags: string[] | null;
        } | null;
    }, {
        attempt: {
            id: string;
            mode: "practice" | "exam" | "review";
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            quizId: string | null;
            status: "in_progress" | "completed";
            startTime: Date;
            endTime: Date | null;
            answers: unknown;
            score: number | null;
        };
        quiz: {
            id: string;
            data: unknown;
            title: string;
            quizType: "multiple-choice" | "yes-no" | "theory";
        } | null;
        meta: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string | null;
            description: string | null;
            questionCount: number;
            questionsAsPdf: string | null;
            difficulty: "easy" | "medium" | "hard" | "extreme";
            tags: string[] | null;
        } | null;
    }>, Record<never, never>, Record<never, never>>;
    deleteAttempt: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        attemptId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        attemptId: string;
    }, {
        userId: string;
        attemptId: string;
    }>, import("@orpc/server").Schema<{
        success: boolean;
    }, {
        success: boolean;
    }>, Record<never, never>, Record<never, never>>;
    getQuizStats: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        quizId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        quizId: string;
    }, {
        userId: string;
        quizId: string;
    }>, import("@orpc/server").Schema<{
        totalAttempts: number;
        completedAttempts: number;
        averageScore: number;
        highestScore: number;
        lowestScore: number;
        averageDuration: number;
        practiceAttempts: number;
        examAttempts: number;
        reviewAttempts: number;
    }, {
        totalAttempts: number;
        completedAttempts: number;
        averageScore: number;
        highestScore: number;
        lowestScore: number;
        averageDuration: number;
        practiceAttempts: number;
        examAttempts: number;
        reviewAttempts: number;
    }>, Record<never, never>, Record<never, never>>;
    getUserQuizStats: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        byDifficulty: any;
        byQuizType: {
            [k: string]: number;
        };
        bestScore: {
            bestScore: number;
        }[];
        totalQuizzes: number;
        totalAttempts: number;
        completedAttempts: number;
        averageScore: number;
        totalTimeSpent: number;
    }, {
        byDifficulty: any;
        byQuizType: {
            [k: string]: number;
        };
        bestScore: {
            bestScore: number;
        }[];
        totalQuizzes: number;
        totalAttempts: number;
        completedAttempts: number;
        averageScore: number;
        totalTimeSpent: number;
    }>, Record<never, never>, Record<never, never>>;
    getRecentActivity: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        limit: number;
    }, {
        userId: string;
        limit?: number | undefined;
    }>, import("@orpc/server").Schema<{
        id: string;
        quizId: string | null;
        quizTitle: string | null;
        mode: "practice" | "exam" | "review";
        status: "in_progress" | "completed";
        score: number | null;
        startTime: Date;
        endTime: Date | null;
        duration: number;
    }[], {
        id: string;
        quizId: string | null;
        quizTitle: string | null;
        mode: "practice" | "exam" | "review";
        status: "in_progress" | "completed";
        score: number | null;
        startTime: Date;
        endTime: Date | null;
        duration: number;
    }[]>, Record<never, never>, Record<never, never>>;
    bulkDeleteAttempts: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        attemptIds: z.ZodArray<z.ZodString, "many">;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        attemptIds: string[];
    }, {
        userId: string;
        attemptIds: string[];
    }>, import("@orpc/server").Schema<{
        success: boolean;
        deletedCount: number;
    }, {
        success: boolean;
        deletedCount: number;
    }>, Record<never, never>, Record<never, never>>;
    exportQuizData: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        quizId: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        quizId: string;
    }, {
        userId: string;
        quizId: string;
    }>, import("@orpc/server").Schema<{
        quiz: {
            quiz: {
                id: string;
                data: unknown;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                title: string;
                jobId: string | null;
                documentLink: string;
                customePrompt: string | null;
                quizType: "multiple-choice" | "yes-no" | "theory";
            };
            quiz_meta: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                quizId: string | null;
                description: string | null;
                questionCount: number;
                questionsAsPdf: string | null;
                difficulty: "easy" | "medium" | "hard" | "extreme";
                tags: string[] | null;
            } | null;
        };
        attempts: {
            id: string;
            mode: "practice" | "exam" | "review";
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            quizId: string | null;
            status: "in_progress" | "completed";
            startTime: Date;
            endTime: Date | null;
            answers: unknown;
            score: number | null;
        }[];
        exportedAt: Date;
    }, {
        quiz: {
            quiz: {
                id: string;
                data: unknown;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                title: string;
                jobId: string | null;
                documentLink: string;
                customePrompt: string | null;
                quizType: "multiple-choice" | "yes-no" | "theory";
            };
            quiz_meta: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                quizId: string | null;
                description: string | null;
                questionCount: number;
                questionsAsPdf: string | null;
                difficulty: "easy" | "medium" | "hard" | "extreme";
                tags: string[] | null;
            } | null;
        };
        attempts: {
            id: string;
            mode: "practice" | "exam" | "review";
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            quizId: string | null;
            status: "in_progress" | "completed";
            startTime: Date;
            endTime: Date | null;
            answers: unknown;
            score: number | null;
        }[];
        exportedAt: Date;
    }>, Record<never, never>, Record<never, never>>;
};
