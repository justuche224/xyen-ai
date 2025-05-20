import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";
import QuizPage from "@/components/quiz-page";
export const Route = createFileRoute("/dashboard/quizzes/$quizId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();
  const { quizId } = Route.useParams();

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
  return (
    <div className="mt-16">
      <QuizPage quizId={quizId} userId={session?.user.id ?? ""} />
    </div>
  );
}
