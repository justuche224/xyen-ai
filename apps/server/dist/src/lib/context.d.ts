import type { Context as HonoContext } from "hono";
export type CreateContextOptions = {
    context: HonoContext;
};
export declare function createContext({ context }: CreateContextOptions): Promise<{
    session: {
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined | undefined;
            userAgent?: string | null | undefined | undefined;
        };
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
}>;
export type Context = Awaited<ReturnType<typeof createContext>>;
