import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileQuestion,
  Loader2,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
const QuizList = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, refetch } = useQuery(
    orpc.quiz.getAll.queryOptions({ input: { userId } })
  );
  const [searchQuery, setSearchQuery] = useState("");
  const filteredQuizzes = data?.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string | null) => {
    if (!status)
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string | null) => {
    if (!status) return <Clock className="h-4 w-4" />;

    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "PROCESSING":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "COMPLETED":
        return <CheckCircle2 className="h-4 w-4" />;
      case "FAILED":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await orpc.quiz.delete.call({
        quizId,
        userId,
      });
      toast.success("Quiz deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Quizzes</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and view all your created quizzes
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/dashboard/quizzes/new">
            <Plus className="h-4 w-4" />
            <span>Create Quiz</span>
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search quizzes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Quizzes
            </CardTitle>
            <CardDescription>
              There was a problem loading your quizzes. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" onClick={() => refetch()}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
      ) : filteredQuizzes?.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No quizzes found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery
              ? "No quizzes match your search criteria."
              : "You haven't created any quizzes yet."}
          </p>
          {searchQuery ? (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          ) : (
            <Button className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              <span>Create Your First Quiz</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes?.map((quiz) => (
            <Card
              key={quiz.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge
                    className={cn(
                      "gap-1 font-normal",
                      getStatusColor(quiz.status)
                    )}
                  >
                    {getStatusIcon(quiz.status)}
                    <span>{quiz.status || "Unknown"}</span>
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    {quiz.quizType === "multiple-choice"
                      ? "Multiple Choice"
                      : quiz.quizType === "theory"
                      ? "Theory"
                      : "Yes/No"}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-1 text-xl">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="line-clamp-1">
                  {quiz.documentLink}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Document-based quiz</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created{" "}
                    {quiz.createdAt
                      ? format(new Date(quiz.createdAt), "MMM d, yyyy")
                      : "Unknown date"}
                  </span>
                </div>
                {quiz.error && (
                  <div className="mt-3 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                    <p className="font-semibold">Error:</p>
                    <p className="line-clamp-2">{quiz.error}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="default" className="gap-1">
                  <Link
                    to="/dashboard/quizzes/$quizId"
                    params={{ quizId: quiz.id }}
                  >
                    <span>View Quiz</span>
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this quiz? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
