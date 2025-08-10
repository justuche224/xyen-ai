import { z } from "zod";
export declare const getAllUserQuizHandler: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
