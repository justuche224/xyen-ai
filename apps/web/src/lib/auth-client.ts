import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        // const retryAfter = response.headers.get("X-Retry-After");
        toast.error(`Clicking too fast! Please wait`);
      }
    },
  },
  baseURL: import.meta.env.VITE_SERVER_URL,
});
