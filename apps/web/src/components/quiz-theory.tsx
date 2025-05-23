import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Flag,
  BarChart2,
  Clock,
  Info,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TheoryQuestion } from "@/types";
import { toast } from "sonner";
import { orpc } from "@/utils/orpc";
import { useMutation } from "@tanstack/react-query";

export function TheoryQuiz({
  allQuestions,
  quizId,
  userId,
  mode = "practice",
}: {
  allQuestions: TheoryQuestion[];
  quizId: string;
  userId: string;
  mode?: "practice" | "exam" | "review";
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers with a structure that works for both choice and theory questions
  const [answers, setAnswers] = useState<
    Record<string, { questionId: string; value: string; type: string }>
  >({});
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startMutation = useMutation(
    orpc.quiz.startAttempt.mutationOptions()
  );

  const updateMutation = useMutation(
    orpc.quiz.updateAttempt.mutationOptions()
  );

  const completeMutation = useMutation(
    orpc.quiz.completeAttempt.mutationOptions()
  );
  const [feedback, setFeedback] = useState<
    Record<string, { score: number; comments: string }>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [totalScore, setTotalScore] = useState(0);

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
          toast.success(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode started`);
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
            answers
          });
        } catch (error) {
          console.error("Error saving progress before unload:", error);
        }
      }
      
      // Standard way to show a confirmation dialog before leaving
      const confirmationMessage = "You are in the middle of a theory quiz. Your progress will be saved, but are you sure you want to leave?";
      e.preventDefault();
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
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
        type: "theory",
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

  // Simple algorithm to assess theory answers based on keyword matching and length
  const assessTheoryAnswer = (
    userAnswer: { value: string } | string,
    modelAnswer: string
  ): { score: number; comments: string } => {
    const userAnswerText = typeof userAnswer === "string" ? userAnswer : userAnswer.value;
    if (!userAnswerText.trim()) {
      return { score: 0, comments: "No answer provided." };
    }

    // Normalize both answers: lowercase and remove punctuation
    const normalizedUserAnswer = userAnswerText
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const normalizedModelAnswer = modelAnswer
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // Extract key terms from model answer (words with 4+ chars)
    const modelKeyTerms = normalizedModelAnswer
      .split(/\s+/)
      .filter((word) => word.length >= 4);

    // Count how many key terms appear in the user answer
    const matchedTerms = modelKeyTerms.filter((term) =>
      normalizedUserAnswer.includes(term)
    );

    const termMatchRatio = matchedTerms.length / modelKeyTerms.length;

    // Check answer length (too short or too long compared to model)
    const userWordCount = normalizedUserAnswer.split(/\s+/).length;
    const modelWordCount = normalizedModelAnswer.split(/\s+/).length;
    const lengthRatio = Math.min(userWordCount / modelWordCount, 2);

    // Calculate score (max 100%)
    let score = Math.round(
      (termMatchRatio * 0.7 + Math.min(lengthRatio, 1) * 0.3) * 100
    );
    score = Math.min(score, 100);

    // Generate feedback
    let comments = "";
    if (score >= 90) {
      comments = "Excellent answer! You've covered all the key points.";
    } else if (score >= 70) {
      comments = "Good answer. You've addressed most key concepts.";
    } else if (score >= 50) {
      comments = "Adequate answer, but missing some important points.";
    } else if (score >= 30) {
      comments = "Your answer needs improvement. Try to include more key concepts.";
    } else {
      comments = "This answer doesn't address the question effectively.";
    }

    if (userWordCount < modelWordCount * 0.5) {
      comments += " Your answer is quite brief compared to the expected length.";
    } else if (userWordCount > modelWordCount * 1.5) {
      comments += " Your answer might be more concise while still covering key points.";
    }

    return { score, comments };
  };

  const confirmSubmit = async () => {
    // Generate feedback for each question
    const newFeedback: Record<string, { score: number; comments: string }> = {};
    let total = 0;

    quizData.forEach((question) => {
      const userAnswer = answers[question.id];
      const assessment = assessTheoryAnswer(userAnswer || "", question.answer);
      newFeedback[question.id] = assessment;
      total += assessment.score;
    });

    const finalScore = Math.round(total / totalQuestions * 100);
    setFeedback(newFeedback);
    setTotalScore(finalScore);
    setShowResults(true);
    setShowSubmitDialog(false);

    // Complete the attempt if we have an attemptId
    if (attemptId) {
      try {
        setIsLoading(true);
        await completeMutation.mutateAsync({
          attemptId,
          userId,
          answers,
          score: finalScore,
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
    setFeedback({});
    setShowResults(false);
    setTotalScore(0);
    setShowReview(false);
    setFlaggedQuestions([]);
    const now = Date.now();
    setStartTime(now);
    setCurrentTime(now);

    // Start a new attempt
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
  const answeredQuestionsCount = Object.values(answers).filter((a) => a?.value?.trim()).length;
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (showResults) {
    if (showReview) {
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Quiz Review</h2>
            <Button variant="outline" onClick={() => setShowReview(false)}>
              Back to Results
            </Button>
          </div>

          <div className="space-y-8">
            {quizData.map((question, index) => {
              const userAnswer = answers[question.id];
              const questionFeedback = feedback[question.id] || {
                score: 0,
                comments: "Not evaluated",
              };
              const scoreColor =
                questionFeedback.score >= 80
                  ? "text-green-600 dark:text-green-400"
                  : questionFeedback.score >= 60
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400";

              return (
                <div
                  key={question.id}
                  className="border rounded-lg p-6 bg-card"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium">Question {index + 1}</h3>
                    <Badge
                      variant="outline"
                      className={`${
                        questionFeedback.score >= 80
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-500"
                          : questionFeedback.score >= 60
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-500"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-500"
                      }`}
                    >
                      <span className="mr-1">{questionFeedback.score}%</span>
                      {questionFeedback.score >= 80 ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : null}
                    </Badge>
                  </div>

                  <p className="mb-3 font-medium">{question.text}</p>

                  <div className="space-y-4">
                    <div className="rounded-md border p-4 bg-muted/30">
                      <div className="font-medium text-sm mb-2">Your Answer:</div>
                      <p className="whitespace-pre-wrap text-sm">
                        {userAnswer?.value || (
                          <span className="italic text-muted-foreground">
                            No answer provided
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="rounded-md border border-primary/30 p-4 bg-primary/5">
                      <Collapsible>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm mb-0">Model Answer:</div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Info className="h-4 w-4 mr-1" />
                              <span>View</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                          <Separator className="my-2" />
                          <p className="whitespace-pre-wrap text-sm">{question.answer}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md">
                      <div className="font-medium text-sm mb-2">Feedback:</div>
                      <p className="text-sm">{questionFeedback.comments}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-8">
            <Button onClick={resetQuiz}>Try Again</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quiz Results</h2>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-full p-4 h-24 w-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalScore}%</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Overall Score</span>
                  <span className="font-medium">
                    {totalScore}%
                  </span>
                </div>
                <Progress
                  value={totalScore}
                  className="h-2 mb-4"
                />

                <div className="text-sm text-muted-foreground">
                  {totalScore >= 90 ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Excellent work! Outstanding understanding of the material.</span>
                    </div>
                  ) : totalScore >= 70 ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Good job! You demonstrate solid knowledge.</span>
                    </div>
                  ) : totalScore >= 50 ? (
                    <div className="flex items-center text-amber-500">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Satisfactory. More study would improve your understanding.</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <Info className="mr-2 h-4 w-4" />
                      <span>You might need to review the material in more depth.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Time Taken</span>
                </div>
                <p className="text-2xl font-semibold">
                  {formatTime(elapsedTime)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  minutes:seconds
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Completion</span>
                </div>
                <p className="text-2xl font-semibold">
                  {Math.round((answeredQuestionsCount / totalQuestions) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  of questions answered
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Performance Breakdown</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>High Scores (80-100%)</span>
                  <span>
                    {Object.values(feedback).filter((f) => f.score >= 80).length} of{" "}
                    {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${
                        (Object.values(feedback).filter((f) => f.score >= 80).length /
                          totalQuestions) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Medium Scores (50-79%)</span>
                  <span>
                    {Object.values(feedback).filter(
                      (f) => f.score >= 50 && f.score < 80
                    ).length}{" "}
                    of {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${
                        (Object.values(feedback).filter(
                          (f) => f.score >= 50 && f.score < 80
                        ).length /
                          totalQuestions) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Low Scores (0-49%)</span>
                  <span>
                    {Object.values(feedback).filter((f) => f.score < 50).length} of{" "}
                    {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${
                        (Object.values(feedback).filter((f) => f.score < 50).length /
                          totalQuestions) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Unanswered</span>
                  <span>
                    {totalQuestions - answeredQuestionsCount} of {totalQuestions}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-500 rounded-full"
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

              <Separator className="my-4" />

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowReview(true)}>
                  Review Answers
                </Button>
                <Button onClick={resetQuiz}>Try Again</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  Question {currentQuestionIndex + 1}/{totalQuestions}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {answeredQuestionsCount} answered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFlagQuestion(currentQuestion.id)}
                  className={
                    isCurrentQuestionFlagged
                      ? "text-amber-500"
                      : "text-muted-foreground"
                  }
                >
                  <Flag className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {formatTime(elapsedTime)}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-medium">{currentQuestion.text}</h2>

            <div className="mt-6">
              <Label htmlFor="answer" className="text-sm mb-2 block">Your Answer:</Label>
              <Textarea
                id="answer"
                placeholder="Type your answer here..."
                value={answers[currentQuestion.id]?.value || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="min-h-40"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8 mb-6">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={goToNextQuestion}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Quiz</Button>
            )}
          </div>

          {/* Mobile Question Navigator */}
          <div className="md:hidden bg-muted/30 p-4 rounded-lg mt-4">
            <h3 className="text-sm font-medium mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {quizData.map((question, index) => {
                const isAnswered = answers[question.id]?.value?.trim() !== undefined && answers[question.id]?.value?.trim() !== "";
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

            <div className="mt-4 flex justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-primary/5 border rounded"></div>
                <span>Answered: {answeredQuestionsCount}</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-3 w-3 border rounded"></div>
                <span>
                  Unanswered: {totalQuestions - answeredQuestionsCount}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-3 w-3 border rounded relative">
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                </div>
                <span>Flagged: {flaggedQuestions.length}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
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
              const isAnswered = answers[question.id]?.value?.trim() !== undefined && answers[question.id]?.value?.trim() !== "";
              const isFlagged = flaggedQuestions.includes(question.id);
              const isCurrent = index === currentQuestionIndex;

              return (
                <TooltipProvider key={question.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
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
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs text-xs">
                      {question.text.length > 70 ? `${question.text.substring(0, 70)}...` : question.text}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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