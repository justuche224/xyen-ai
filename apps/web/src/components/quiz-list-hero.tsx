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

  const formatScore = (score: number | undefined | null): string => {
    if (!score && score !== 0) return "0";
    return (Math.round(score * 10) / 10).toString();
  };

  const formatTime = (seconds: number | undefined | null): string => {
    console.log("seconds", seconds);
    if (!seconds && seconds !== 0) return "0";

    const totalMinutes = Math.round(seconds / 60);

    if (totalMinutes < 60) {
      return `${totalMinutes}m`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="mb-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-violet-900/20 backdrop-blur-md p-3 md:p-6 text-white shadow-lg">
      {/* Header - Horizontal on mobile */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight">
            Your Quizzes
          </h1>
          <p className="text-xs md:text-base opacity-90 hidden md:block">
            Track progress, analyze performance, and create new quizzes
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="gap-1 bg-white text-blue-600 hover:bg-white/90 flex-shrink-0 ml-2"
        >
          <Link to="/dashboard/quizzes/new">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Quiz</span>
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 md:grid md:grid-cols-3 md:gap-4">
        <div className="bg-white/10 rounded-lg p-2 md:p-4 flex-shrink-0 w-28 md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-90">
                Quizzes
              </p>
              {stats.isLoading ? (
                <Loader className="animate-spin h-4 w-4 mx-auto md:mx-0" />
              ) : (
                <h3 className="text-lg md:text-2xl font-bold">
                  {stats.data?.totalQuizzes}
                </h3>
              )}
            </div>
            <BookMarked className="h-4 w-4 md:h-8 md:w-8 opacity-80 hidden md:block" />
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-2 md:p-4 flex-shrink-0 w-28 md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-90">
                Score
              </p>
              {stats.isLoading ? (
                <Loader className="animate-spin h-4 w-4 mx-auto md:mx-0" />
              ) : (
                <h3 className="text-lg md:text-2xl font-bold">
                  {formatScore(stats.data?.averageScore)}%
                </h3>
              )}
            </div>
            <Award className="h-4 w-4 md:h-8 md:w-8 opacity-80 hidden md:block" />
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-2 md:p-4 flex-shrink-0 w-28 md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-90">
                Time
              </p>
              {stats.isLoading ? (
                <Loader className="animate-spin h-4 w-4 mx-auto md:mx-0" />
              ) : (
                <h3 className="text-lg md:text-2xl font-bold">
                  {formatTime(stats.data?.totalTimeSpent)}
                </h3>
              )}
            </div>
            <Clock3 className="h-4 w-4 md:h-8 md:w-8 opacity-80 hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizListHero;