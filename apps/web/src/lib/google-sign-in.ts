import { defaultRedirect } from "@/routes";

import { authClient } from "./auth-client";

export const googleSignIn = async (callbackURL?: string) => {
  await authClient.signIn.social({
    provider: "google",
    errorCallbackURL: `${window.location.origin}/error`,
    callbackURL: callbackURL
      ? `${window.location.origin}${callbackURL}`
      : `${window.location.origin}${defaultRedirect}`,
  });
};
