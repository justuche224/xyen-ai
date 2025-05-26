import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Flag,
  BarChart2,
  Clock,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { orpc } from "@/utils/orpc";
import type { Question } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function Quiz({
  allQuestions,
  quizId,
  userId,
  mode = "practice",
}: {
  allQuestions: Question[];
  quizId: string;
  userId: string;
  mode?: "practice" | "exam" | "review";
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { questionId: string; value: string; type: string }>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startMutation = useMutation(orpc.quiz.startAttempt.mutationOptions());

  const updateMutation = useMutation(orpc.quiz.updateAttempt.mutationOptions());

  const completeMutation = useMutation(
    orpc.quiz.completeAttempt.mutationOptions()
  );

  // Initialize quiz attempt when component mounts
  useEffect(() => {
    const startQuizAttempt = async () => {
      try {
        setIsLoading(true);
        const result = await startMutation.mutateAsync({
          quizId,
          userId,
          mode,
        });

        if (result.attemptId) {
          setAttemptId(result.attemptId);
          toast.success(
            `${mode.charAt(0).toUpperCase() + mode.slice(1)} mode started`
          );
        } else {
          toast.error("Failed to start quiz attempt");
        }
      } catch (error) {
        console.error("Error starting quiz attempt:", error);
        toast.error("Error starting quiz attempt");
      } finally {
        setIsLoading(false);
      }
    };

    startQuizAttempt();

    // Start timer
    const timer = setInterval(() => {
      if (!showResults) {
        setCurrentTime(Date.now());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quizId, userId, mode, showResults]);

  // Add warning when user tries to close or refresh the page
  useEffect(() => {
    // Only add the event listener if quiz is in progress (not in results view)
    if (showResults) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Save the user's progress before they leave
      if (attemptId && Object.keys(answers).length > 0) {
        try {
          updateMutation.mutate({
            attemptId,
            userId,
            answers,
          });
        } catch (error) {
          console.error("Error saving progress before unload:", error);
        }
      }

      const confirmationMessage =
        "You are in the middle of a quiz. Your progress will be saved, but are you sure you want to leave?";
      e.preventDefault();
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showResults, attemptId, answers, userId]);

  // Update attempt data periodically
  useEffect(() => {
    if (!attemptId || showResults) return;

    const updateInterval = setInterval(async () => {
      try {
        await updateMutation.mutateAsync({
          attemptId,
          userId,
          answers,
        });
      } catch (error) {
        console.error("Error updating attempt:", error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(updateInterval);
  }, [attemptId, userId, answers, showResults]);

  const quizData = allQuestions;
  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        value,
        type: "choice",
      },
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = async () => {
    let correctAnswers = 0;

    quizData.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer) {
        const correctChoice = question.choices.find(
          (choice) => choice.isCorrect
        );
        if (correctChoice && userAnswer.value === correctChoice.id) {
          correctAnswers++;
        }
      }
    });

    setScore(correctAnswers);
    setShowResults(true);
    setShowSubmitDialog(false);

    if (attemptId) {
      try {
        setIsLoading(true);
        await completeMutation.mutateAsync({
          attemptId,
          userId,
          answers,
          score: correctAnswers,
        });
        toast.success("Quiz completed and results saved");
      } catch (error) {
        console.error("Error completing quiz attempt:", error);
        toast.error("Failed to save quiz results");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetQuiz = async () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setShowReview(false);
    setFlaggedQuestions([]);
    const now = Date.now();
    setStartTime(now);
    setCurrentTime(now);

    try {
      setIsLoading(true);
      const result = await startMutation.mutateAsync({
        quizId,
        userId,
        mode,
      });

      if (result.attemptId) {
        setAttemptId(result.attemptId);
        toast.success(`New ${mode} attempt started`);
      } else {
        toast.error("Failed to start new quiz attempt");
      }
    } catch (error) {
      console.error("Error starting new quiz attempt:", error);
      toast.error("Error starting new quiz attempt");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFlagQuestion = (questionId: string) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const isCurrentQuestionAnswered = answers[currentQuestion?.id] !== undefined;
  const isCurrentQuestionFlagged = flaggedQuestions.includes(
    currentQuestion?.id
  );
  const answeredQuestionsCount = Object.keys(answers).length;
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (showResults) {
    if (showReview) {
      return (
        <div className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-bold">Quiz Review</h2>
            <Button
              variant="outline"
              onClick={() => setShowReview(false)}
              size="sm"
            >
              Back to Results
            </Button>
          </div>

          <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
            {quizData.map((question, index) => {
              const userAnswerId = answers[question.id];
              const userAnswer = question.choices.find(
                (choice) =>
                  choice.id === (userAnswerId ? userAnswerId.value : null)
              );
              const correctAnswer = question.choices.find(
                (choice) => choice.isCorrect
              );
              const isCorrect = userAnswer?.isCorrect;

              return (
                <div
                  key={question.id}
                  className={`border rounded-lg p-3 sm:p-4 ${
                    isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                      : "border-red-500 bg-red-50 dark:bg-red-900/10"
                  }`}
                >
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start mb-3 gap-2">
                    <h3 className="text-sm sm:text-base font-medium">
                      Question {index + 1}
                    </h3>
                    {isCorrect ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-500 text-xs self-start"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Correct
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-500 text-xs self-start"
                      >
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Incorrect
                      </Badge>
                    )}
                  </div>

                  <p className="mb-3 text-xs sm:text-sm leading-tight">
                    {question.text}
                  </p>

                  <div className="space-y-2">
                    {question.choices.map((choice) => {
                      const isUserChoice =
                        choice.id ===
                        (userAnswerId ? userAnswerId.value : null);
                      const isCorrectChoice = choice.isCorrect;

                      let className =
                        "flex items-center p-2 rounded-md text-xs";

                      if (isUserChoice && isCorrectChoice) {
                        className +=
                          " bg-green-100 dark:bg-green-900/20 border border-green-500";
                      } else if (isUserChoice && !isCorrectChoice) {
                        className +=
                          " bg-red-100 dark:bg-red-900/20 border border-red-500";
                      } else if (isCorrectChoice) {
                        className += " bg-primary/10 border border-primary";
                      } else {
                        className += " bg-muted/20";
                      }

                      return (
                        <div key={choice.id} className={className}>
                          <div className="flex-1 text-xs leading-tight">
                            {choice.text}
                          </div>
                          {isUserChoice && (
                            <div className="text-xs text-muted-foreground ml-2 shrink-0">
                              Your answer
                            </div>
                          )}
                          {isCorrectChoice && !isUserChoice && (
                            <div className="text-xs text-primary ml-2 shrink-0">
                              Correct answer
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
            <Button onClick={resetQuiz} size="sm" className="w-full sm:w-auto">
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-3 sm:p-6">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Quiz Results</h2>
            <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4">
              <div className="bg-primary/10 rounded-full p-3 sm:p-4 h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center shrink-0 mx-auto xs:mx-0">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {score}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    of {totalQuestions}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-2 flex justify-between text-xs sm:text-sm">
                  <span>Score</span>
                  <span className="font-medium">
                    {Math.round((score / totalQuestions) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(score / totalQuestions) * 100}
                  className="h-2 mb-3 sm:mb-4"
                />

                <div className="text-xs sm:text-sm text-muted-foreground">
                  {score === totalQuestions ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                      <span className="leading-tight">
                        Perfect score! Excellent work!
                      </span>
                    </div>
                  ) : score >= totalQuestions / 2 ? (
                    <div className="flex items-center text-amber-500">
                      <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                      <span className="leading-tight">
                        Good job! You passed the quiz.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <AlertCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                      <span className="leading-tight">
                        You might need to study more.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-1 sm:gap-2 mb-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    Time Taken
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  {formatTime(elapsedTime)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  minutes:seconds
                </p>
              </div>

              <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-1 sm:gap-2 mb-2">
                  <BarChart2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    Accuracy
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  {answeredQuestionsCount > 0
                    ? Math.round((score / answeredQuestionsCount) * 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  of answered questions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-3 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Performance Breakdown
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>Correct Answers</span>
                  <span>
                    {score} of {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(score / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>Incorrect Answers</span>
                  <span>
                    {totalQuestions - score} of {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${
                        ((totalQuestions - score) / totalQuestions) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>Unanswered</span>
                  <span>
                    {totalQuestions - answeredQuestionsCount} of{" "}
                    {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${
                        ((totalQuestions - answeredQuestionsCount) /
                          totalQuestions) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <Separator className="my-3 sm:my-4" />

              <div className="flex flex-col xs:flex-row gap-2 xs:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowReview(true)}
                  size="sm"
                  className="w-full xs:w-auto"
                >
                  Review Answers
                </Button>
                <Button
                  onClick={resetQuiz}
                  size="sm"
                  className="w-full xs:w-auto"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Processing...</p>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
        <div className="md:col-span-2">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <Badge variant="outline" className="bg-primary/10 text-xs">
                  Q {currentQuestionIndex + 1}/{totalQuestions}
                </Badge>
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {answeredQuestionsCount} answered
                </span>
                <Badge
                  variant={mode === "practice" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFlagQuestion(currentQuestion.id)}
                  className={`h-8 w-8 p-0 ${
                    isCurrentQuestionFlagged
                      ? "text-amber-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {formatTime(elapsedTime)}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-medium leading-tight">
              {currentQuestion.text}
            </h2>

            <RadioGroup
              value={answers[currentQuestion.id]?.value || ""}
              onValueChange={handleAnswerChange}
              className="space-y-2 sm:space-y-3 mt-4 sm:mt-6"
            >
              {currentQuestion.choices.map((choice) => {
                const isSelected =
                  answers[currentQuestion.id]?.value === choice.id;
                return (
                  <div
                    key={choice.id}
                    className={`flex items-center space-x-2 rounded-md border p-2 sm:p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                      isSelected ? "bg-primary/10 border-primary" : ""
                    }`}
                    onClick={() => handleAnswerChange(choice.id)}
                  >
                    <RadioGroupItem
                      value={choice.id}
                      id={`${currentQuestion.id}-${choice.id}`}
                      className="shrink-0"
                    />
                    <Label
                      htmlFor={`${currentQuestion.id}-${choice.id}`}
                      className="flex-grow cursor-pointer text-sm sm:text-base leading-tight"
                    >
                      {choice.text}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="flex justify-between mt-6 sm:mt-8 mb-4 sm:mb-6 gap-2">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              size="sm"
              className="flex-1 max-w-[120px]"
            >
              <ChevronLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </Button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                onClick={goToNextQuestion}
                size="sm"
                className="flex-1 max-w-[120px]"
              >
                <span className="hidden xs:inline">Next</span>
                <span className="xs:hidden">Next</span>
                <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                size="sm"
                className="flex-1 max-w-[120px]"
              >
                Submit
              </Button>
            )}
          </div>

          {/* Mobile Question Navigator */}
          <div className="md:hidden bg-muted/30 p-3 sm:p-4 rounded-lg mt-4">
            <h3 className="text-sm font-medium mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              {quizData.map((question, index) => {
                const isAnswered = answers[question.id] !== undefined;
                const isFlagged = flaggedQuestions.includes(question.id);
                const isCurrent = index === currentQuestionIndex;

                return (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="sm"
                    className={`h-7 w-7 sm:h-8 sm:w-8 p-0 relative text-xs ${
                      isCurrent
                        ? "bg-primary/20 border-primary/70 dark:bg-primary/40 dark:border-primary"
                        : isAnswered
                        ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/10"
                        : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                    )}
                  </Button>
                );
              })}
            </div>

            <div className="mt-3 sm:mt-4 grid grid-cols-1 xs:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-primary/5 border rounded shrink-0"></div>
                <span className="truncate">
                  Answered: {answeredQuestionsCount}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-3 w-3 border rounded shrink-0"></div>
                <span className="truncate">
                  Unanswered: {totalQuestions - answeredQuestionsCount}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-3 w-3 border rounded relative shrink-0">
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                </div>
                <span className="truncate">
                  Flagged: {flaggedQuestions.length}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 sm:mt-4"
              onClick={handleSubmit}
            >
              Submit Quiz
            </Button>
          </div>
        </div>

        <div className="hidden md:block bg-muted/30 p-4 rounded-lg h-fit">
          <h3 className="text-sm font-medium mb-3">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {quizData.map((question, index) => {
              const isAnswered = answers[question.id] !== undefined;
              const isFlagged = flaggedQuestions.includes(question.id);
              const isCurrent = index === currentQuestionIndex;

              return (
                <Button
                  key={question.id}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 relative ${
                    isCurrent
                      ? "bg-primary/20 border-primary/70 dark:bg-primary/40 dark:border-primary"
                      : isAnswered
                      ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/10"
                      : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                  )}
                </Button>
              );
            })}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-primary/5 border rounded"></div>
                <span>Answered</span>
              </div>
              <span className="font-medium">{answeredQuestionsCount}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 border rounded"></div>
                <span>Unanswered</span>
              </div>
              <span className="font-medium">
                {totalQuestions - answeredQuestionsCount}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 border rounded relative">
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                </div>
                <span>Flagged</span>
              </div>
              <span className="font-medium">{flaggedQuestions.length}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        </div>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredQuestionsCount} out of {totalQuestions}{" "}
              questions.
              {answeredQuestionsCount < totalQuestions && (
                <span className="block mt-2 text-amber-500">
                  Warning: You have {totalQuestions - answeredQuestionsCount}{" "}
                  unanswered questions.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
