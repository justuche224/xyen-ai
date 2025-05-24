import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  BookOpen,
  Target,
  Trophy,
  Timer,
  Users,
  Calendar,
  Tag,
  TrendingUp,
  Activity,
  Award,
  Zap,
  Brain,
  Star,
  ChevronRight,
  Download,
  Share2,
  Eye,
  MoreVertical,
  Bookmark,
  Heart,
  Shuffle,
  Repeat,
  Copy,
  BarChart3,
  Loader2,
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
import { TheoryQuiz } from "./quiz-theory";
import { toast } from "sonner";

const QuizPage = ({ quizId, userId }: { quizId: string; userId: string }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [quizType, setQuizType] = useState<"exam" | "practice" | "review">(
    "practice"
  );
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  // Helper functions for formatting numbers
  const formatScore = (score: number | undefined | null): string => {
    if (!score && score !== 0) return "0";
    return (Math.round(score * 10) / 10).toString();
  };

  const formatTime = (minutes: number | undefined | null): string => {
    if (!minutes && minutes !== 0) return "0m";

    const totalMinutes = Math.round(minutes);

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

  const handleStartQuiz = (mode: "exam" | "practice" | "review") => {
    setQuizType(mode);
    setShowQuiz(true);
  };

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

  const stats = useQuery(
    orpc.quiz.getQuizStats.queryOptions({
      input: { quizId, userId },
    })
  );

  const handleDownloadQuizAsPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const res = await orpc.quiz.generateQuizPDF.call({
        quizId,
        userId,
      });

      if (res.error) {
        toast.error("Failed to generate PDF");
        return;
      }

      if (res.success && res.pdfUrl) {
        const blob = await fetch(res.pdfUrl).then((res) => res.blob());
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${queryResult?.title}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getQuizTypeIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return <Target className="h-4 w-4" />;
      case "theory":
        return <Brain className="h-4 w-4" />;
      case "yes-no":
        return <Zap className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return <Target className="h-4 w-4" />;
      case "theory":
        return <Brain className="h-4 w-4" />;
      case "yes-no":
        return <Zap className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isQueryError) {
      return (
        <div className="min-h-screen ">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <Card className="border-red-500/20 bg-card">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  </div>
                  <CardTitle className="text-2xl text-red-400">
                    Failed to Load Quiz
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    We encountered an error while loading your quiz. Please try
                    again.
                  </CardDescription>
                </CardHeader>
                {queryError && (
                  <CardContent>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <p className="text-sm text-red-300 font-medium mb-2">
                        Error Details:
                      </p>
                      <p className="text-xs text-red-200 font-mono">
                        {queryError.message}
                      </p>
                    </div>
                  </CardContent>
                )}
                <CardFooter className="justify-center">
                  <Button
                    onClick={() => refetch()}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    if (!queryResult) {
      return (
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-slate-700">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="h-8 w-8 text-slate-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    Quiz Not Found
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    The quiz you're looking for doesn't exist or you don't have
                    permission to view it.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/quizzes">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Quizzes
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    const quizDetails = queryResult;

    if (
      quizDetails.status === "PENDING" ||
      quizDetails.status === "PROCESSING"
    ) {
      return (
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-slate-700">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                      <RefreshCw className="h-10 w-10 text-blue-400 animate-spin" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      Quiz is {quizDetails.status.toLowerCase()}
                    </h1>
                    <p className="text-slate-300 text-lg">
                      Your quiz "{quizDetails.title}" is being prepared. This
                      usually takes a few moments.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        {getQuizTypeIcon(quizDetails.quizType)}
                      </div>
                      <p className="text-sm text-slate-400">Type</p>
                      <p className="text-white font-medium capitalize">
                        {quizDetails.quizType.replace("-", " ")}
                      </p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <Calendar className="h-5 w-5 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-400">Created</p>
                      <p className="text-white font-medium">
                        {new Date(quizDetails.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <Activity className="h-5 w-5 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-400">Status</p>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {quizDetails.status}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    onClick={() => refetch()}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Check Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    // Failed State
    if (quizDetails.status === "FAILED") {
      return (
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-red-500/20">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle className="h-10 w-10 text-red-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-red-400 mb-2">
                      Quiz Generation Failed
                    </h1>
                    <p className="text-slate-300 text-lg">
                      We're sorry, but an error occurred while generating "
                      {quizDetails.title}".
                    </p>
                  </div>

                  {quizDetails.error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                      <p className="text-red-300 font-medium mb-2">
                        Error Details:
                      </p>
                      <pre className="text-xs text-red-200 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {quizDetails.error}
                      </pre>
                    </div>
                  )}

                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => refetch()} variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                    <Button asChild>
                      <Link to="/dashboard/quizzes">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Quizzes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    // Completed Quiz
    if (quizDetails.status === "COMPLETED") {
      if (!quizDetails.quizData) {
        return (
          <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="bg-card border-amber-500/20">
                  <CardHeader className="text-center">
                    <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-amber-400">
                      Quiz Data Missing
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      The quiz is marked as complete, but its content is
                      missing.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        );
      }

      const quizDataSchema =
        quizDetails.quizType === "theory"
          ? TheoryQuizDataSchema
          : QuizDataSchema;
      const parsedQuizData = quizDataSchema.safeParse(quizDetails.quizData);

      if (!parsedQuizData.success) {
        return (
          <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card className="bg-card border-orange-500/20">
                  <CardHeader className="text-center">
                    <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-orange-400">
                      Quiz Data Issue
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      The quiz content has an invalid structure.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        );
      }

      const validatedQuestions =
        quizDetails.quizType === "theory"
          ? (parsedQuizData.data as TheoryQuestion[])
          : (parsedQuizData.data as Question[]);

      if (showQuiz) {
        return (
          <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-8">
              <Card className="bg-card border-slate-700 max-w-4xl mx-auto">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                      <CardTitle className="text-xl text-white">
                        {quizDetails.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExitConfirmation(true)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Exit Quiz
                    </Button>

                    <AlertDialog
                      open={showExitConfirmation}
                      onOpenChange={setShowExitConfirmation}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to exit? Your progress will be
                            saved, but you'll need to start a new attempt to
                            continue.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => setShowQuiz(false)}>
                            Exit Quiz
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {quizDetails.quizType === "theory" && (
                    <TheoryQuiz
                      allQuestions={validatedQuestions as TheoryQuestion[]}
                      quizId={quizDetails.id}
                      userId={userId}
                      mode={quizType}
                    />
                  )}
                  {quizDetails.quizType !== "theory" && (
                    <Quiz
                      allQuestions={validatedQuestions as Question[]}
                      quizId={quizDetails.id}
                      userId={userId}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen ">
          <div className="container mx-auto px-4 py-8 max-w-7xl bg-background rounded">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 mb-6 border border-blue-500/20 backdrop-blur-md">
              <div className="border-b border-slate-900/50 bg-slate-900/50 backdrop-blur-sm rounded-2xl mb-2">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        asChild
                        variant="ghost"
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <Link to="/dashboard/quizzes">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            Back to Quiz List
                          </span>
                        </Link>
                      </Button>
                      <div className="h-6 w-px bg-slate-700"></div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">
                          Ready
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      {getTypeIcon(queryResult?.quizType)}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1">
                        {queryResult?.title}
                      </h1>
                      <p className="text-slate-300">
                        {queryResult?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-1">
                      <div
                        className={`w-3 h-3 rounded-full ${getDifficultyColor(
                          queryResult.difficulty!
                        )}`}
                      ></div>
                      <span className="text-white text-sm font-medium capitalize">
                        {queryResult.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <FileText className="h-4 w-4" />
                      {queryResult.questionCount} Questions
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Clock className="h-4 w-4" />
                      {formatTime(queryResult.totalTimeSpent)}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Users className="h-4 w-4" />
                      {queryResult.totalAttempts} Attempts
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {queryResult?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleStartQuiz("exam")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all transform hover:scale-105"
                  >
                    <PlayCircle className="h-5 w-5" />
                    Start Exam
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStartQuiz("practice")}
                      className="bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Shuffle className="h-4 w-4" />
                      Practice
                    </button>
                    <button
                      onClick={() => handleStartQuiz("review")}
                      className="bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-card backdrop-blur-md rounded-xl p-4 border border-slate-700/50 ">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  {stats.isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : stats.isError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {stats?.data?.highestScore ?? 0}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">Best Score</p>
              </div>

              <div className="bg-card backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  {stats.isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : stats.isError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {formatScore(stats?.data?.averageScore)}%
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">Average Score</p>
              </div>

              <div className="bg-card backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  {stats.isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : stats.isError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {stats?.data?.completedAttempts ?? 0}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">Completed Attempts</p>
              </div>

              <div className="bg-card backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <Repeat className="h-5 w-5 text-purple-400" />
                  <span className="text-2xl font-bold text-white">
                    {queryResult.totalAttempts ?? 0}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">Attempts</p>
              </div>

              <div className="bg-card backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <Timer className="h-5 w-5 text-orange-400" />
                  <span className="text-2xl font-bold text-white">
                    {formatTime(queryResult.totalTimeSpent)}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">Avg Time</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button
                disabled={isGeneratingPDF}
                onClick={handleDownloadQuizAsPDF}
                className="bg-slate-700/50 hover:bg-slate-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
              >
                {isGeneratingPDF ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {isGeneratingPDF ? "Generating PDF..." : "Download as PDF"}
              </button>

              <button className="bg-slate-700/50 hover:bg-slate-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
                <Share2 className="h-4 w-4" />
                Share Progress
              </button>

              <button className="bg-slate-700/50 hover:bg-slate-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
                <Copy className="h-4 w-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-slate-700">
              <CardHeader className="text-center">
                <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <CardTitle className="text-2xl text-white">
                  Unknown Quiz Status
                </CardTitle>
                <CardDescription className="text-slate-300">
                  The quiz "{quizDetails.title}" has an unrecognized status:{" "}
                  {quizDetails.status}.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default QuizPage;
