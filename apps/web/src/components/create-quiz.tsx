import type React from "react";

import {
  AlertCircle,
  FileText,
  Loader2,
  Upload,
  CheckCircle,
  X,
  Settings,
  FileUp,
  Brain,
  Crown,
  Clock,
  Zap,
  Plus,
  BookOpen,
  Target,
  Hash,
} from "lucide-react";
import { useState, type ChangeEvent, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { uploadFile } from "@/utils/upload-file";
import { orpc } from "@/utils/orpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFeatureLimits, useFeatureUsage } from "@/hooks/useFeatureLimits";
import { useCanCreateQuiz } from "@/hooks/useFeatureCheck";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
type QuestionType = "multiple-choice" | "yes-no" | "theory";
type Difficulty = "easy" | "medium" | "hard" | "extreme";
type QuestionCount = 5 | 10 | 20 | 30;
const ALLOWED_FILE_TYPES = ["application/pdf"];

const CreateQuiz = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questionType, setQuestionType] =
    useState<QuestionType>("multiple-choice");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [success, setSuccess] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const navigate = useNavigate();

  // Feature limiting hooks
  const { data: limitsData, isLoading: limitsLoading } =
    useFeatureLimits(userId);
  const { data: dailyUsage } = useFeatureUsage(userId, "daily_generations");
  const {
    canCreate,
    reasons,
    isLoading: checkingLimits,
  } = useCanCreateQuiz(userId, questionCount);

  // Get user's question limit
  const maxQuestionsLimit =
    limitsData?.limits.find(
      (limit: any) => limit.featureKey === "max_questions"
    )?.limitValue || 10;

  const dailyGenerationsLimit =
    limitsData?.limits.find(
      (limit: any) => limit.featureKey === "daily_generations"
    )?.limitValue || 3;

  const isPro = limitsData?.planType === "pro";
  const isEnterprise = limitsData?.planType === "enterprise";

  // Reset question count if it exceeds the user's limit
  useEffect(() => {
    if (maxQuestionsLimit !== -1 && questionCount > maxQuestionsLimit) {
      setQuestionCount(Math.min(maxQuestionsLimit, 10) as QuestionCount);
    }
  }, [maxQuestionsLimit, questionCount]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }

    const selectedFile = e.target.files[0];

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Only PDF documents are allowed");
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        `File size exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit (${(
          selectedFile.size /
          (1024 * 1024)
        ).toFixed(2)}MB)`
      );
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setSuccess(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const generateQuiz = async () => {
    if (!canCreate) {
      setError(reasons[0] || "You cannot create a quiz at this time");
      return;
    }

    if (!file || !title.trim() || !userId) {
      setError("Please fill in all required fields");
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 500);

    const { url, error } = await uploadFile(file, userId, title);

    clearInterval(progressInterval);
    setUploadProgress(95);

    if (error) {
      setError(error);
      setUploading(false);
      setUploadProgress(0);
      return;
    }

    if (url) {
      setUploadProgress(100);

      const {
        quizId,
        jobId,
        error: createError,
      } = await orpc.quiz.create.call({
        title,
        quizType: questionType,
        documentLink: url,
        userId,
        difficulty,
        tags,
        questionCount,
        description,
        customePrompt: prompt,
      });

      if (createError) {
        setError(createError);
        setUploading(false);
        setUploadProgress(0);
        return;
      }

      if (quizId && jobId) {
        setError(null);
        setUploading(false);
        setSuccess(true);

        setTimeout(() => {
          setFile(null);
          setTitle("");
          setDescription("");
          setQuestionType("multiple-choice");
          setQuestionCount(10);
          setPrompt("");
          setDifficulty("medium");
          setTags([]);
          setTagInput("");
          setUploadProgress(0);
        }, 3000);

        navigate({ to: "/dashboard/quizzes/$quizId", params: { quizId } });
        return;
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uploading && canCreate) {
      e.currentTarget.classList.add("border-primary");
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-primary");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-primary");

    if (uploading || !canCreate) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];

      if (!ALLOWED_FILE_TYPES.includes(droppedFile.type)) {
        setError("Only PDF documents are allowed");
        setFile(null);
        return;
      }

      if (droppedFile.size > MAX_FILE_SIZE) {
        setError(
          `File size exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit (${(
            droppedFile.size /
            (1024 * 1024)
          ).toFixed(2)}MB)`
        );
        setFile(null);
        return;
      }

      setError(null);
      setFile(droppedFile);
      setSuccess(false);
    }
  };

  const getResetTimeMessage = () => {
    if (dailyGenerationsLimit === -1) return "";

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const hoursUntilReset = Math.ceil(
      (tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    return `Resets in ${hoursUntilReset} hour${
      hoursUntilReset === 1 ? "" : "s"
    }`;
  };

  // Loading state
  if (limitsLoading || checkingLimits) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your plan details...</p>
        </div>
      </div>
    );
  }

  // Blocked state - user has reached their limits
  if (!canCreate && reasons.length > 0) {
    const isConcurrentJobsIssue = reasons.some(
      (reason) =>
        typeof reason === "string" &&
        (reason.includes("concurrent") ||
          reason.includes("current quiz generation to complete"))
    );
    const isDailyGenerationsIssue = reasons.some(
      (reason) =>
        typeof reason === "string" &&
        (reason.includes("daily_generations") ||
          (reason.includes("limit reached") && reason.includes("daily")))
    );
    const isQuestionCountIssue = reasons.some(
      (reason) =>
        typeof reason === "string" &&
        (reason.includes("Question count") ||
          reason.includes("max_questions") ||
          reason.includes("exceeds limit"))
    );

    return (
      <div className="min-h-screen">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Quiz</h1>
            <p className="text-muted-foreground">
              Generate quiz questions from your PDF documents using AI
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-xl">
                {isConcurrentJobsIssue
                  ? "Quiz Generation In Progress"
                  : isDailyGenerationsIssue
                  ? "Daily Limit Reached"
                  : isQuestionCountIssue
                  ? "Question Count Limit"
                  : "Limit Reached"}
              </CardTitle>
              <CardDescription>
                {isConcurrentJobsIssue
                  ? "You already have a quiz being generated. Please wait for it to complete."
                  : isDailyGenerationsIssue
                  ? "You've reached your quiz creation limit for today"
                  : isQuestionCountIssue
                  ? "The selected question count exceeds your plan limit"
                  : "You cannot create a quiz at this time"}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {/* Show specific limit info based on the blocking reason */}
              {isDailyGenerationsIssue && dailyGenerationsLimit !== -1 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Daily Generations
                    </span>
                    <Badge variant="outline">
                      {dailyUsage?.usageCount || 0} / {dailyGenerationsLimit}
                    </Badge>
                  </div>
                  <Progress
                    value={
                      dailyGenerationsLimit > 0
                        ? ((dailyUsage?.usageCount || 0) /
                            dailyGenerationsLimit) *
                          100
                        : 0
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {getResetTimeMessage()}
                  </p>
                </div>
              )}

              {isConcurrentJobsIssue && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-sm font-medium">
                      Quiz Generation in Progress
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Check your existing quizzes to see the generation progress
                  </p>
                </div>
              )}

              {isQuestionCountIssue && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Question Count Limit
                    </span>
                    <Badge variant="outline">
                      Max {maxQuestionsLimit} questions
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your current plan allows up to {maxQuestionsLimit} questions
                    per quiz
                  </p>
                </div>
              )}

              <div className="text-sm text-muted-foreground mb-4">
                {reasons.map((reason, index) => (
                  <div key={index} className="mb-1">
                    {reason}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {!isPro && !isEnterprise && !isConcurrentJobsIssue && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Upgrade to Pro for unlimited quiz generations and advanced
                      features
                    </p>
                    <Button className="w-full" size="lg">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </div>
                )}

                {isConcurrentJobsIssue ? (
                  <p className="text-xs text-muted-foreground">
                    Go to your dashboard to check the status of your current
                    quiz generation
                  </p>
                ) : isDailyGenerationsIssue ? (
                  <p className="text-xs text-muted-foreground">
                    Or come back tomorrow when your limit resets
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Upgrade your plan to continue creating quizzes
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Create Quiz
              </h1>
              {isPro && (
                <Crown className="w-5 h-5 text-yellow-500 inline ml-2" />
              )}
              {isEnterprise && (
                <Zap className="w-5 h-5 text-purple-500 inline ml-2" />
              )}
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your PDF documents into interactive quizzes using advanced
            AI technology
          </p>

          {/* Status Bar */}
          <div className="flex items-center justify-center gap-6 mt-6 p-4 bg-card rounded-xl border">
            <Badge
              variant={isPro || isEnterprise ? "default" : "secondary"}
              className="text-sm"
            >
              {limitsData?.planType.toUpperCase()} Plan
            </Badge>
            {dailyGenerationsLimit !== -1 && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Daily generations:{" "}
                  <span className="font-medium text-foreground">
                    {dailyUsage?.usageCount || 0}
                  </span>{" "}
                  / {dailyGenerationsLimit}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-8 shadow-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!canCreate && reasons.length > 0 && (
          <Alert variant="destructive" className="mb-8 shadow-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Cannot Create Quiz</AlertTitle>
            <AlertDescription>
              {reasons.map((reason, index) => (
                <div key={index}>{reason}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-8 border-green-500 text-green-700 bg-green-50 dark:bg-green-900/20 shadow-sm">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your quiz has been created successfully and is being generated!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload Section */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Upload Document</CardTitle>
                    <CardDescription className="text-base">
                      Select a PDF file to generate quiz questions from
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer group
                    ${
                      file
                        ? "border-primary bg-primary/5 shadow-inner"
                        : "border-gray-300 hover:border-primary hover:bg-gray-50/50 dark:border-gray-600 dark:hover:bg-gray-800/50"
                    }
                    ${
                      uploading || !canCreate
                        ? "pointer-events-none opacity-60"
                        : ""
                    }
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    canCreate &&
                    !uploading &&
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <div className="text-center">
                    {file ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center">
                          <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        {!uploading && canCreate && (
                          <Button variant="outline" size="sm" className="mt-4">
                            <Upload className="w-4 h-4 mr-2" />
                            Change File
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {canCreate
                              ? "Drop your PDF here or click to browse"
                              : "Upload disabled - limit reached"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Supports PDF files up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading || !canCreate}
                    accept=".pdf"
                  />
                </div>

                {uploading && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                    <div className="flex justify-between text-sm font-medium mb-3">
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating your quiz...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-3" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiz Configuration */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Quiz Configuration
                    </CardTitle>
                    <CardDescription className="text-base">
                      Customize your quiz settings and preferences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Quiz Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={uploading || !canCreate}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Question Count
                    </Label>
                    <Select
                      value={questionCount.toString()}
                      onValueChange={(value) =>
                        setQuestionCount(Number(value) as QuestionCount)
                      }
                      disabled={uploading || !canCreate}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="5"
                          disabled={
                            maxQuestionsLimit !== -1 && 5 > maxQuestionsLimit
                          }
                        >
                          5 Questions{" "}
                          {maxQuestionsLimit !== -1 &&
                            5 > maxQuestionsLimit &&
                            "(Pro)"}
                        </SelectItem>
                        <SelectItem
                          value="10"
                          disabled={
                            maxQuestionsLimit !== -1 && 10 > maxQuestionsLimit
                          }
                        >
                          10 Questions{" "}
                          {maxQuestionsLimit !== -1 &&
                            10 > maxQuestionsLimit &&
                            "(Pro)"}
                        </SelectItem>
                        <SelectItem
                          value="20"
                          disabled={
                            maxQuestionsLimit !== -1 && 20 > maxQuestionsLimit
                          }
                        >
                          20 Questions{" "}
                          {maxQuestionsLimit !== -1 &&
                            20 > maxQuestionsLimit &&
                            "(Pro)"}
                        </SelectItem>
                        <SelectItem
                          value="30"
                          disabled={
                            maxQuestionsLimit !== -1 && 30 > maxQuestionsLimit
                          }
                        >
                          30 Questions{" "}
                          {maxQuestionsLimit !== -1 &&
                            30 > maxQuestionsLimit &&
                            "(Pro)"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {maxQuestionsLimit !== -1 && (
                      <p className="text-xs text-muted-foreground">
                        Your plan allows up to {maxQuestionsLimit} questions
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Add a brief description of your quiz (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={uploading || !canCreate}
                    className="flex min-h-24 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    rows={3}
                  />
                </div>

                {/* Quiz Settings */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Question Type
                    </Label>
                    <Select
                      value={questionType}
                      onValueChange={(value: QuestionType) =>
                        setQuestionType(value)
                      }
                      disabled={uploading || !canCreate}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="theory">Theory Questions</SelectItem>
                        <SelectItem value="yes-no">Yes/No Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Difficulty Level
                    </Label>
                    <Select
                      value={difficulty}
                      onValueChange={(value: Difficulty) =>
                        setDifficulty(value)
                      }
                      disabled={uploading || !canCreate}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">🟢 Easy</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="hard">🟠 Hard</SelectItem>
                        <SelectItem value="extreme">🔴 Extreme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Advanced Options */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Advanced Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="prompt" className="text-sm font-medium">
                    Custom Instructions
                  </Label>
                  <textarea
                    id="prompt"
                    placeholder="Add specific instructions for the AI..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={uploading || !canCreate}
                    className="flex min-h-24 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tags" className="text-sm font-medium">
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      disabled={uploading || !canCreate}
                      className="flex-1 h-10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={uploading || !canCreate || !tagInput.trim()}
                      size="sm"
                      className="h-10 px-3"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 text-xs flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            disabled={uploading || !canCreate}
                            className="hover:text-destructive transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button
              onClick={generateQuiz}
              disabled={!file || uploading || !title.trim() || !canCreate}
              className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              size="lg"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  Creating Quiz...
                </>
              ) : !canCreate ? (
                "Limit Reached"
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-3" />
                  Generate Quiz
                </>
              )}
            </Button>

            {/* Upgrade Card */}
            {!isPro && !isEnterprise && (
              <Card className="border-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-800 dark:to-yellow-700 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-lg">Upgrade to Pro</CardTitle>
                  </div>
                  <CardDescription>
                    Unlock advanced features and unlimited access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Unlimited quiz generations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Up to 30 questions per quiz
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Advanced customization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button size="sm" className="w-full">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
