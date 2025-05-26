import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { toast } from "sonner";
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
              enum: ["user", "admin", "tester"],
        },
      },
    }),
  ],
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
