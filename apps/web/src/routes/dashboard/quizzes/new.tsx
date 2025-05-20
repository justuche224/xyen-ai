import { createFileRoute } from "@tanstack/react-router";
import CreateQuiz from "@/components/create-quiz";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";
export const Route = createFileRoute("/dashboard/quizzes/new")({
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
  return (
    <div className="mt-16">
      <CreateQuiz userId={session?.user.id ?? ""} />
    </div>
  );
}
