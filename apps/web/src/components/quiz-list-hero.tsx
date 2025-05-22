import { Button } from "./ui/button";
import { Loader, Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { BookMarked, Award, Clock3, CalendarClock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

const QuizListHero = ({ userId }: { userId: string }) => {
  const stats = useQuery(
    orpc.quiz.getUserQuizStats.queryOptions({ input: { userId } })
  );

  // const {
  //   totalQuizzes,
  //   totalAttempts,
  //   completedAttempts,
  //   averageScore,
  //   totalTimeSpent,
  //   byDifficulty,
  //   byQuizType,
  // } = data;
  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-900/20 to-violet-900/20 backdrop-blur-md p-6 text-white shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your Quiz Dashboard
          </h1>
          <p className="mt-1 opacity-90">
            Track progress, analyze performance, and create new quizzes
          </p>
        </div>
        <Button
          asChild
          className="gap-2 bg-white text-blue-600 hover:bg-white/90"
        >
          <Link to="/dashboard/quizzes/new">
            <Plus className="h-4 w-4" />
            <span>Create Quiz</span>
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="bg-white/10 border-none shadow-none text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-90">
                  Total Quizzes
                </p>
                {stats.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <h3 className="text-2xl font-bold">
                    {stats.data?.totalQuizzes}
                  </h3>
                )}
              </div>
              <BookMarked className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-none shadow-none text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-90">
                  Avg. Score
                </p>
                {stats.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <h3 className="text-2xl font-bold">
                    {stats.data?.averageScore ?? 0}%
                  </h3>
                )}
              </div>
              <Award className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-none shadow-none text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-90">
                  Time Spent
                </p>
                {stats.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <h3 className="text-2xl font-bold">
                    {stats.data?.totalTimeSpent ?? 0}m
                  </h3>
                )}
              </div>
              <Clock3 className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-none shadow-none text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-90">
                  Recent Activity
                </p>
                {stats.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <h3 className="text-sm font-medium line-clamp-1">
                    Completed 'Database design' quiz
                  </h3>
                )}
              </div>
              <CalendarClock className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizListHero;
