import ForgotPasswordForm from "@/components/forgot-password-form";
import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PlatformDemo } from "@/components/platform-demo";
import { z } from "zod";

export const Route = createFileRoute("/_pathlessLayout/(auth)/forgot-password")({
  component: RouteComponent,
  validateSearch: (Search) => {
    return z
      .object({
        callbackURL: z.string().optional(),
      })
      .parse(Search);
  },
});

function RouteComponent() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Brain className="size-4" />
            </div>
            Xyen AI
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted/30 lg:block">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">See How It Works</h2>
              <p className="text-muted-foreground">
                Transform your documents into intelligent quizzes in three
                simple steps
              </p>
            </div>
            <PlatformDemo autoplay={true} interval={3000} />
          </div>
        </div>
      </div>
    </div>
  );
}
