import { z } from "zod";
export declare const createQuizHandler: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
