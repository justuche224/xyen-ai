import "dotenv/config";
import { z } from "zod";
export declare const generateQuizPDFHandler: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
