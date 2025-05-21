import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  AlertCircle,
  Info,
  PlayCircle,
  RefreshCw,
  AlertTriangle,
  X,
  FileText,
  HelpCircle,
  CheckCircle,
  Clock,
  BarChart,
  BookOpen,
} from "lucide-react";

import Loader from "./loader";
import { orpc } from "@/utils/orpc";
import {
  QuizDataSchema,
  TheoryQuizDataSchema,
  type Question,
  type TheoryQuestion,
} from "@/types";
import { Quiz } from "./quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TheoryQuiz } from "./quiz-theory";

const QuizPage = ({ quizId, userId }: { quizId: string; userId: string }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const {
    data: queryResult,
    isLoading,
    isError: isQueryError,
    error: queryError,
    refetch,
  } = useQuery(
    orpc.quiz.getQuizById.queryOptions({
      input: { quizId, userId },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader />
          <p className="mt-4 text-muted-foreground">Loading quiz details...</p>
        </div>
      );
    }

    if (isQueryError) {
      return (
        <Card className="border-destructive bg-destructive/5 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 rounded-full p-2">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-destructive">
                  Error Loading Quiz
                </CardTitle>
                <CardDescription className="text-destructive-foreground">
                  We couldn't fetch the quiz details. Please try again.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          {queryError && (
            <CardContent className="pt-4">
              <div className="bg-destructive/20 p-3 rounded-md text-sm text-destructive-foreground mb-4 text-left">
                <p className="font-semibold">Error details:</p>
                <p className="break-words">{queryError.message}</p>
              </div>
            </CardContent>
          )}
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => refetch()}
              variant="destructive"
              className="bg-destructive hover:bg-destructive/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </CardFooter>
        </Card>
      );
    }

    if (!queryResult || queryResult.length === 0) {
      return (
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-full p-2">
                <HelpCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle>Quiz Not Found</CardTitle>
                <CardDescription>
                  The quiz you're looking for doesn't exist or you don't have
                  permission to view it.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="pt-6">
            <Button variant="outline" asChild>
              <Link to="/dashboard/quizzes">Go to Quizzes</Link>
            </Button>
          </CardFooter>
        </Card>
      );
    }

    const quizDetails = queryResult[0];

    if (
      quizDetails.status === "PENDING" ||
      quizDetails.status === "PROCESSING"
    ) {
      const isProcessing = quizDetails.status === "PROCESSING";
      return (
        <Card className="shadow-lg max-w-3xl mx-auto">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`rounded-full p-2 ${
                    isProcessing ? "bg-sky-500/10" : "bg-amber-500/10"
                  }`}
                >
                  <RefreshCw
                    className={`h-6 w-6 ${
                      isProcessing
                        ? "text-sky-500 animate-spin"
                        : "text-amber-500 animate-ping"
                    }`}
                  />
                </div>
                <h2 className="text-2xl font-bold">
                  Quiz is {quizDetails.status.toLowerCase()}
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Your quiz "{quizDetails.title}" is currently being{" "}
                {isProcessing ? "processed" : "prepared"}. This might take a few
                moments.
              </p>

              <div className="flex flex-col items-center justify-center py-8">
                <Loader />
                <p className="text-sm text-muted-foreground mt-4">
                  Feel free to refresh, or check back in a bit.
                </p>
              </div>

              <Button
                onClick={() => refetch()}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh Status
              </Button>
            </div>

            <div className="md:col-span-2 bg-muted/30 p-6 md:p-8 border-t md:border-t-0 md:border-l">
              <h3 className="text-lg font-medium mb-4">Quiz Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge
                    variant={
                      quizDetails.quizType === "multiple-choice"
                        ? "default"
                        : quizDetails.quizType === "theory"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {quizDetails.quizType === "multiple-choice"
                      ? "Multiple Choice"
                      : quizDetails.quizType === "theory"
                      ? "Theory"
                      : "Yes/No"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Created:
                  </span>
                  <span className="text-sm">
                    {new Date(quizDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {quizDetails.updatedAt &&
                  new Date(quizDetails.updatedAt).getTime() !==
                    new Date(quizDetails.createdAt).getTime() && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Updated:
                      </span>
                      <span className="text-sm">
                        {new Date(quizDetails.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                <div className="pt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard/quizzes">Go to Quizzes</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (quizDetails.status === "FAILED") {
      return (
        <Card className="shadow-lg max-w-3xl mx-auto">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-destructive/10 rounded-full p-2">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold text-destructive">
                  Quiz Generation Failed
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                We're sorry, but an error occurred while generating your quiz "
                {quizDetails.title}".
              </p>

              {quizDetails.error && (
                <div className="bg-destructive/20 p-4 rounded-md text-sm text-destructive-foreground mb-6 text-left">
                  <p className="font-semibold mb-1">Error details:</p>
                  <pre className="whitespace-pre-wrap text-xs max-h-60 overflow-y-auto">
                    {quizDetails.error}
                  </pre>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Refreshing
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/dashboard/quizzes">Go to Quizzes</Link>
                </Button>
              </div>
            </div>

            <div className="md:col-span-2 bg-muted/30 p-6 md:p-8 border-t md:border-t-0 md:border-l">
              <h3 className="text-lg font-medium mb-4">Quiz Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge
                    variant={
                      quizDetails.quizType === "multiple-choice"
                        ? "default"
                        : quizDetails.quizType === "theory"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {quizDetails.quizType === "multiple-choice"
                      ? "Multiple Choice"
                      : quizDetails.quizType === "theory"
                      ? "Theory"
                      : "Yes/No"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant="destructive">Failed</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Created:
                  </span>
                  <span className="text-sm">
                    {new Date(quizDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {quizDetails.updatedAt &&
                  new Date(quizDetails.updatedAt).getTime() !==
                    new Date(quizDetails.createdAt).getTime() && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Updated:
                      </span>
                      <span className="text-sm">
                        {new Date(quizDetails.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (quizDetails.status === "COMPLETED") {
      if (!quizDetails.quizData) {
        return (
          <Card className="border-amber-500 bg-amber-500/5 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 rounded-full p-2">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-amber-700 dark:text-amber-500">
                    Quiz Data Missing
                  </CardTitle>
                  <CardDescription className="text-amber-600 dark:text-amber-400">
                    The quiz "{quizDetails.title}" is marked as complete, but
                    its content is missing. This might be an internal error.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="pt-6">
              <Button variant="outline" asChild>
                <Link to="/dashboard/quizzes">Go to Quizzes</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      }

      const quizDataSchema =
        quizDetails.quizType === "theory"
          ? TheoryQuizDataSchema
          : QuizDataSchema;
      const parsedQuizData = quizDataSchema.safeParse(quizDetails.quizData);

      if (!parsedQuizData.success) {
        console.error(
          "Quiz data validation failed:",
          parsedQuizData.error.flatten()
        );
        return (
          <Card className="shadow-lg max-w-3xl mx-auto">
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-3 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500/10 rounded-full p-2">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Quiz Data Issue</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  The quiz "{quizDetails.title}" is complete, but its content
                  has an invalid structure. Please report this issue if it
                  persists.
                </p>

                <div className="bg-orange-500/10 p-3 rounded-md text-sm text-orange-700 dark:text-orange-300 mb-4 text-left max-h-60 overflow-y-auto">
                  <p className="font-semibold">Validation Errors:</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    {parsedQuizData.error.errors.map((err, idx) => (
                      <li key={idx}>
                        <strong>Path:</strong> {err.path.join(".")} -{" "}
                        {err.message}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" asChild className="w-full">
                  <Link to="/dashboard/quizzes">Go to Quizzes</Link>
                </Button>
              </div>

              <div className="md:col-span-2 bg-muted/30 p-6 md:p-8 border-t md:border-t-0 md:border-l">
                <h3 className="text-lg font-medium mb-4">Quiz Details</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <Badge
                      variant={
                        quizDetails.quizType === "multiple-choice"
                          ? "default"
                          : quizDetails.quizType === "theory"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {quizDetails.quizType === "multiple-choice"
                        ? "Multiple Choice"
                        : quizDetails.quizType === "theory"
                        ? "Theory"
                        : "Yes/No"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Created:
                    </span>
                    <span className="text-sm">
                      {new Date(quizDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {quizDetails.updatedAt &&
                    new Date(quizDetails.updatedAt).getTime() !==
                      new Date(quizDetails.createdAt).getTime() && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Updated:
                        </span>
                        <span className="text-sm">
                          {new Date(quizDetails.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </Card>
        );
      }

      const validatedQuestions =
        quizDetails.quizType === "theory"
          ? (parsedQuizData.data as TheoryQuestion[])
          : (parsedQuizData.data as Question[]);

      if (validatedQuestions.length === 0) {
        return (
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="bg-sky-500/10 rounded-full p-2">
                  <Info className="h-6 w-6 text-sky-500" />
                </div>
                <div>
                  <CardTitle>Quiz Ready, No Questions</CardTitle>
                  <CardDescription>
                    The quiz "{quizDetails.title}" is ready, but it seems to
                    have no questions. This might be an issue with the source
                    document or generation process.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="pt-6">
              <Button variant="outline" asChild>
                <Link to="/dashboard/quizzes">Go to Quizzes</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      }

      if (showQuiz) {
        return (
          <Card className="shadow-lg w-full max-w-4xl mx-auto">
            <CardHeader className="pb-2 pt-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">
                    {quizDetails.title}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuiz(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <X className="h-4 w-4 mr-1" /> Exit Quiz
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {quizDetails.quizType === "theory" && (
                <TheoryQuiz
                  allQuestions={validatedQuestions as TheoryQuestion[]}
                />
              )}
              {quizDetails.quizType !== "theory" && (
                <Quiz allQuestions={validatedQuestions as Question[]} />
              )}
            </CardContent>
          </Card>
        );
      }

      return (
        <Card className="shadow-lg max-w-3xl mx-auto">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/10 rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">{quizDetails.title}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Your quiz is ready! Test your knowledge with{" "}
                {validatedQuestions.length} questions.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Estimated time: {Math.ceil(validatedQuestions.length * 1.5)}{" "}
                    minutes
                  </span>
                </div>

                {quizDetails.documentLink && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={quizDetails.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline truncate max-w-[250px]"
                      title={quizDetails.documentLink}
                    >
                      Source document
                    </a>
                  </div>
                )}
              </div>

              <Button
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="w-full transform hover:scale-105 transition-transform duration-150"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Quiz
              </Button>
            </div>

            <div className="md:col-span-2 bg-muted/30 p-6 md:p-8 border-t md:border-t-0 md:border-l">
              <h3 className="text-lg font-medium mb-4">Quiz Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge
                    variant={
                      quizDetails.quizType === "multiple-choice"
                        ? "default"
                        : quizDetails.quizType === "theory"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {quizDetails.quizType === "multiple-choice"
                      ? "Multiple Choice"
                      : quizDetails.quizType === "theory"
                      ? "Theory"
                      : "Yes/No"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Questions:
                  </span>
                  <span className="font-medium">
                    {validatedQuestions.length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Created:
                  </span>
                  <span className="text-sm">
                    {new Date(quizDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {quizDetails.updatedAt &&
                  new Date(quizDetails.updatedAt).getTime() !==
                    new Date(quizDetails.createdAt).getTime() && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Updated:
                      </span>
                      <span className="text-sm">
                        {new Date(quizDetails.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                <Separator className="my-2" />

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Difficulty</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Beginner
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Advanced
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-muted rounded-full p-2">
              <HelpCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <CardTitle>Unknown Quiz Status</CardTitle>
              <CardDescription>
                The quiz "{quizDetails.title}" has an unrecognized status:{" "}
                {quizDetails.status}.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="pt-6">
          <Button variant="outline" asChild>
            <Link to="/dashboard/quizzes">Go to Quizzes</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild size="sm">
          <Link to=".." className="flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      {renderContent()}
    </div>
  );
};

export default QuizPage;
