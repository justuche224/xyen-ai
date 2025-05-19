import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";
import QuizList from "@/components/quiz-list";
export const Route = createFileRoute("/dashboard/quizzes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();

  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!session && !isPending) {
      navigate({
        to: "/sign-in",
      });
    }
  }, [session, isPending]);

  if (isPending) {
    return <Loader />;
  }
  return <QuizList userId={session?.user.id ?? ""}/>;
}
