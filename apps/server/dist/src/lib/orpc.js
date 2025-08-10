import { ORPCError, os } from "@orpc/server";
export const o = os.$context();
export const publicProcedure = o;
const requireAuth = o.middleware(async ({ context, next }) => {
    if (!context.session?.user) {
        throw new ORPCError("UNAUTHORIZED");
    }
    return next({
        context: {
            ...context,
            session: context.session,
        },
    });
});
const requireAdmin = o.middleware(async ({ context, next }) => {
    if (context.session?.user.role !== "admin") {
        throw new ORPCError("UNAUTHORIZED");
    }
    return next({
        context: { ...context, session: context.session },
    });
});
export const protectedProcedure = publicProcedure.use(requireAuth);
export const adminProcedure = protectedProcedure.use(requireAdmin);
