import { auth } from "./auth";
export async function createContext({ context }) {
    const session = await auth.api.getSession({
        headers: context.req.raw.headers,
    });
    return {
        session,
    };
}
