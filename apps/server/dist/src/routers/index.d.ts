export declare const appRouter: {
    healthCheck: import("@orpc/server").DecoratedProcedure<{
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
    }, import("@orpc/server").Schema<unknown, unknown>, import("@orpc/server").Schema<string, string>, Record<never, never>, Record<never, never>>;
    privateData: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<{
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
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined | undefined;
        };
    }, {
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined | undefined;
        };
    }>, Record<never, never>, Record<never, never>>;
    todo: {
        getAll: import("@orpc/server").DecoratedProcedure<{
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
        }, import("@orpc/server").Schema<unknown, unknown>, import("@orpc/server").Schema<{
            id: number;
            text: string;
            completed: boolean;
        }[], {
            id: number;
            text: string;
            completed: boolean;
        }[]>, Record<never, never>, Record<never, never>>;
        create: import("@orpc/server").DecoratedProcedure<{
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
        }, import("zod").ZodObject<{
            text: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            text: string;
        }, {
            text: string;
        }>, import("@orpc/server").Schema<{
            id: number;
            text: string;
            completed: boolean;
        }, {
            id: number;
            text: string;
            completed: boolean;
        }>, Record<never, never>, Record<never, never>>;
        toggle: import("@orpc/server").DecoratedProcedure<{
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
        }, import("zod").ZodObject<{
            id: import("zod").ZodNumber;
            completed: import("zod").ZodBoolean;
        }, "strip", import("zod").ZodTypeAny, {
            id: number;
            completed: boolean;
        }, {
            id: number;
            completed: boolean;
        }>, import("@orpc/server").Schema<{
            success: boolean;
        }, {
            success: boolean;
        }>, Record<never, never>, Record<never, never>>;
        delete: import("@orpc/server").DecoratedProcedure<{
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
        }, import("zod").ZodObject<{
            id: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>, import("@orpc/server").Schema<{
            success: boolean;
        }, {
            success: boolean;
        }>, Record<never, never>, Record<never, never>>;
    };
    quiz: {
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
        }>, import("zod").ZodObject<{
            fileName: import("zod").ZodString;
            mimeType: import("zod").ZodLiteral<"application/pdf">;
            size: import("zod").ZodNumber;
            contentBase64: import("zod").ZodString;
            uploadType: import("zod").ZodEnum<["quiz", "note"]>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            quizId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
            limit: import("zod").ZodNumber;
            offset: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            title: import("zod").ZodString;
            quizType: import("zod").ZodEnum<["multiple-choice", "yes-no", "theory"]>;
            documentLink: import("zod").ZodString;
            userId: import("zod").ZodString;
            difficulty: import("zod").ZodEnum<["easy", "medium", "hard", "extreme"]>;
            tags: import("zod").ZodArray<import("zod").ZodString, "many">;
            questionCount: import("zod").ZodNumber;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            customePrompt: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            quizId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            quizId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            quizId: import("zod").ZodString;
            userId: import("zod").ZodString;
            mode: import("zod").ZodEnum<["practice", "exam", "review"]>;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            quizId: string;
            mode: "practice" | "exam" | "review";
        }, {
            userId: string;
            quizId: string;
            mode: "practice" | "exam" | "review";
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
        }>, import("zod").ZodObject<{
            attemptId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            attemptId: string;
        }, {
            userId: string;
            attemptId: string;
        }>, import("@orpc/server").Schema<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            status: "completed" | "in_progress";
            quizId: string | null;
            mode: "practice" | "exam" | "review";
            startTime: Date;
            endTime: Date | null;
            answers: unknown;
            score: number | null;
        }, {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            status: "completed" | "in_progress";
            quizId: string | null;
            mode: "practice" | "exam" | "review";
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
        }>, import("zod").ZodObject<{
            attemptId: import("zod").ZodString;
            userId: import("zod").ZodString;
            answers: import("zod").ZodOptional<import("zod").ZodAny>;
            score: import("zod").ZodOptional<import("zod").ZodNumber>;
            endTime: import("zod").ZodOptional<import("zod").ZodDate>;
            status: import("zod").ZodOptional<import("zod").ZodEnum<["in_progress", "completed"]>>;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            attemptId: string;
            status?: "completed" | "in_progress" | undefined;
            endTime?: Date | undefined;
            answers?: any;
            score?: number | undefined;
        }, {
            userId: string;
            attemptId: string;
            status?: "completed" | "in_progress" | undefined;
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
        }>, import("zod").ZodObject<{
            attemptId: import("zod").ZodString;
            userId: import("zod").ZodString;
            answers: import("zod").ZodAny;
            score: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
            quizId: import("zod").ZodOptional<import("zod").ZodString>;
            mode: import("zod").ZodOptional<import("zod").ZodEnum<["practice", "exam", "review"]>>;
            status: import("zod").ZodOptional<import("zod").ZodEnum<["in_progress", "completed"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            offset: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            limit: number;
            offset: number;
            status?: "completed" | "in_progress" | undefined;
            quizId?: string | undefined;
            mode?: "practice" | "exam" | "review" | undefined;
        }, {
            userId: string;
            status?: "completed" | "in_progress" | undefined;
            quizId?: string | undefined;
            mode?: "practice" | "exam" | "review" | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
        }>, import("@orpc/server").Schema<{
            id: string;
            quizId: string | null;
            mode: "practice" | "exam" | "review";
            startTime: Date;
            endTime: Date | null;
            score: number | null;
            status: "completed" | "in_progress";
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
            status: "completed" | "in_progress";
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
        }>, import("zod").ZodObject<{
            attemptId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            attemptId: string;
        }, {
            userId: string;
            attemptId: string;
        }>, import("@orpc/server").Schema<{
            attempt: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                status: "completed" | "in_progress";
                quizId: string | null;
                mode: "practice" | "exam" | "review";
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
                description: string | null;
                quizId: string | null;
                questionCount: number;
                questionsAsPdf: string | null;
                difficulty: "easy" | "medium" | "hard" | "extreme";
                tags: string[] | null;
            } | null;
        }, {
            attempt: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                status: "completed" | "in_progress";
                quizId: string | null;
                mode: "practice" | "exam" | "review";
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
                description: string | null;
                quizId: string | null;
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
        }>, import("zod").ZodObject<{
            attemptId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            quizId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
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
            status: "completed" | "in_progress";
            score: number | null;
            startTime: Date;
            endTime: Date | null;
            duration: number;
        }[], {
            id: string;
            quizId: string | null;
            quizTitle: string | null;
            mode: "practice" | "exam" | "review";
            status: "completed" | "in_progress";
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
        }>, import("zod").ZodObject<{
            attemptIds: import("zod").ZodArray<import("zod").ZodString, "many">;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            quizId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            quizId: string;
        }, {
            userId: string;
            quizId: string;
        }>, import("@orpc/server").Schema<{
            quiz: {
                quiz: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    data: unknown;
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
                    description: string | null;
                    quizId: string | null;
                    questionCount: number;
                    questionsAsPdf: string | null;
                    difficulty: "easy" | "medium" | "hard" | "extreme";
                    tags: string[] | null;
                } | null;
            };
            attempts: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                status: "completed" | "in_progress";
                quizId: string | null;
                mode: "practice" | "exam" | "review";
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
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    data: unknown;
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
                    description: string | null;
                    quizId: string | null;
                    questionCount: number;
                    questionsAsPdf: string | null;
                    difficulty: "easy" | "medium" | "hard" | "extreme";
                    tags: string[] | null;
                } | null;
            };
            attempts: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                status: "completed" | "in_progress";
                quizId: string | null;
                mode: "practice" | "exam" | "review";
                startTime: Date;
                endTime: Date | null;
                answers: unknown;
                score: number | null;
            }[];
            exportedAt: Date;
        }>, Record<never, never>, Record<never, never>>;
    };
    jobs: {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            jobId: import("zod").ZodString;
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
    user: {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
            featureKey: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
            featureKey: import("zod").ZodEnum<["concurrent_jobs", "daily_generations", "pdf_exports", "max_questions", "quiz_attempts"]>;
            requestedAmount: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            name: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
        }, "strip", import("zod").ZodTypeAny, {
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
    admin: {
        updateFeatureLimit: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            planType: import("zod").ZodEnum<["free", "pro", "enterprise"]>;
            featureKey: import("zod").ZodString;
            limitValue: import("zod").ZodNumber;
            enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            planType: "free" | "pro" | "enterprise";
            featureKey: string;
            limitValue: number;
            enabled?: boolean | undefined;
        }, {
            planType: "free" | "pro" | "enterprise";
            featureKey: string;
            limitValue: number;
            enabled?: boolean | undefined;
        }>, import("@orpc/server").Schema<{
            success: boolean;
        }, {
            success: boolean;
        }>, Record<never, never>, Record<never, never>>;
        getFeatureLimits: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
            enabled: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planType: "free" | "pro" | "enterprise";
            featureKey: string;
            limitType: "count" | "daily" | "monthly" | "concurrent";
            limitValue: number;
            resetPeriod: "never" | "daily" | "monthly" | null;
        }[], {
            enabled: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planType: "free" | "pro" | "enterprise";
            featureKey: string;
            limitType: "count" | "daily" | "monthly" | "concurrent";
            limitValue: number;
            resetPeriod: "never" | "daily" | "monthly" | null;
        }[]>, Record<never, never>, Record<never, never>>;
        upgradeUserPlan: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            userId: import("zod").ZodString;
            planType: import("zod").ZodEnum<["free", "pro", "enterprise"]>;
        }, "strip", import("zod").ZodTypeAny, {
            userId: string;
            planType: "free" | "pro" | "enterprise";
        }, {
            userId: string;
            planType: "free" | "pro" | "enterprise";
        }>, import("@orpc/server").Schema<{
            success: boolean;
        }, {
            success: boolean;
        }>, Record<never, never>, Record<never, never>>;
        getAllUsers: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            search: import("zod").ZodOptional<import("zod").ZodString>;
            role: import("zod").ZodOptional<import("zod").ZodEnum<["user", "admin", "tester"]>>;
            emailVerified: import("zod").ZodOptional<import("zod").ZodBoolean>;
            sortBy: import("zod").ZodDefault<import("zod").ZodEnum<["createdAt", "updatedAt", "name", "email"]>>;
            sortOrder: import("zod").ZodDefault<import("zod").ZodEnum<["asc", "desc"]>>;
        } & {
            page: import("zod").ZodDefault<import("zod").ZodNumber>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            page: number;
            sortBy: "email" | "createdAt" | "updatedAt" | "name";
            sortOrder: "asc" | "desc";
            role?: "user" | "admin" | "tester" | undefined;
            emailVerified?: boolean | undefined;
            search?: string | undefined;
        }, {
            role?: "user" | "admin" | "tester" | undefined;
            emailVerified?: boolean | undefined;
            search?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
            sortBy?: "email" | "createdAt" | "updatedAt" | "name" | undefined;
            sortOrder?: "asc" | "desc" | undefined;
        }>, import("@orpc/server").Schema<{
            users: {
                currentPlan: {
                    id: string;
                    status: "active" | "cancelled" | "expired";
                    planType: "free" | "pro" | "enterprise";
                    startDate: Date;
                    endDate: Date | null;
                } | {
                    id: null;
                    planType: "free" | "pro" | "enterprise";
                    status: string;
                    startDate: null;
                    endDate: null;
                };
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: "user" | "admin" | "tester";
                createdAt: Date;
                updatedAt: Date;
            }[];
            pagination: {
                page: number;
                limit: number;
                totalCount: number;
                totalPages: number;
                hasNext: boolean;
                hasPrev: boolean;
            };
        }, {
            users: {
                currentPlan: {
                    id: string;
                    status: "active" | "cancelled" | "expired";
                    planType: "free" | "pro" | "enterprise";
                    startDate: Date;
                    endDate: Date | null;
                } | {
                    id: null;
                    planType: "free" | "pro" | "enterprise";
                    status: string;
                    startDate: null;
                    endDate: null;
                };
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: "user" | "admin" | "tester";
                createdAt: Date;
                updatedAt: Date;
            }[];
            pagination: {
                page: number;
                limit: number;
                totalCount: number;
                totalPages: number;
                hasNext: boolean;
                hasPrev: boolean;
            };
        }>, Record<never, never>, Record<never, never>>;
        getUser: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            id: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            id: string;
        }, {
            id: string;
        }>, import("@orpc/server").Schema<{
            currentPlan: {
                id: string;
                status: "active" | "cancelled" | "expired";
                planType: "free" | "pro" | "enterprise";
                startDate: Date;
                endDate: Date | null;
            } | {
                id: null;
                planType: "free" | "pro" | "enterprise";
                status: string;
                startDate: null;
                endDate: null;
            };
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: "user" | "admin" | "tester";
            createdAt: Date;
            updatedAt: Date;
        }, {
            currentPlan: {
                id: string;
                status: "active" | "cancelled" | "expired";
                planType: "free" | "pro" | "enterprise";
                startDate: Date;
                endDate: Date | null;
            } | {
                id: null;
                planType: "free" | "pro" | "enterprise";
                status: string;
                startDate: null;
                endDate: null;
            };
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: "user" | "admin" | "tester";
            createdAt: Date;
            updatedAt: Date;
        }>, Record<never, never>, Record<never, never>>;
        updateUser: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            id: import("zod").ZodString;
            name: import("zod").ZodOptional<import("zod").ZodString>;
            email: import("zod").ZodOptional<import("zod").ZodString>;
            role: import("zod").ZodOptional<import("zod").ZodEnum<["user", "admin", "tester"]>>;
            emailVerified: import("zod").ZodOptional<import("zod").ZodBoolean>;
            image: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
        }, "strip", import("zod").ZodTypeAny, {
            id: string;
            role?: "user" | "admin" | "tester" | undefined;
            email?: string | undefined;
            name?: string | undefined;
            emailVerified?: boolean | undefined;
            image?: string | null | undefined;
        }, {
            id: string;
            role?: "user" | "admin" | "tester" | undefined;
            email?: string | undefined;
            name?: string | undefined;
            emailVerified?: boolean | undefined;
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
        deleteUser: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            id: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            id: string;
        }, {
            id: string;
        }>, import("@orpc/server").Schema<{
            success: boolean;
            message: string;
        }, {
            success: boolean;
            message: string;
        }>, Record<never, never>, Record<never, never>>;
        getUserStats: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
            totalUsers: number;
            totalAdmins: number;
            totalTesters: number;
            totalRegularUsers: number;
            verifiedUsers: number;
            unverifiedUsers: number;
        }, {
            totalUsers: number;
            totalAdmins: number;
            totalTesters: number;
            totalRegularUsers: number;
            verifiedUsers: number;
            unverifiedUsers: number;
        }>, Record<never, never>, Record<never, never>>;
        changeUserRole: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            id: import("zod").ZodString;
            role: import("zod").ZodEnum<["user", "admin", "tester"]>;
        }, "strip", import("zod").ZodTypeAny, {
            role: "user" | "admin" | "tester";
            id: string;
        }, {
            role: "user" | "admin" | "tester";
            id: string;
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
        bulkUpdateUsers: import("@orpc/server").DecoratedProcedure<import("@orpc/server").MergedInitialContext<import("@orpc/server").MergedInitialContext<{
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
        }>, import("zod").ZodObject<{
            userIds: import("zod").ZodArray<import("zod").ZodString, "many">;
            updates: import("zod").ZodObject<{
                role: import("zod").ZodOptional<import("zod").ZodEnum<["user", "admin", "tester"]>>;
                emailVerified: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
                role?: "user" | "admin" | "tester" | undefined;
                emailVerified?: boolean | undefined;
            }, {
                role?: "user" | "admin" | "tester" | undefined;
                emailVerified?: boolean | undefined;
            }>;
        }, "strip", import("zod").ZodTypeAny, {
            userIds: string[];
            updates: {
                role?: "user" | "admin" | "tester" | undefined;
                emailVerified?: boolean | undefined;
            };
        }, {
            userIds: string[];
            updates: {
                role?: "user" | "admin" | "tester" | undefined;
                emailVerified?: boolean | undefined;
            };
        }>, import("@orpc/server").Schema<{
            updatedCount: number;
            users: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: "user" | "admin" | "tester";
                createdAt: Date;
                updatedAt: Date;
            }[];
        }, {
            updatedCount: number;
            users: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: "user" | "admin" | "tester";
                createdAt: Date;
                updatedAt: Date;
            }[];
        }>, Record<never, never>, Record<never, never>>;
    };
};
export type AppRouter = typeof appRouter;
