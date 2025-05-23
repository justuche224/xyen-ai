import { useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  FileQuestion,
  Plus,
  Search,
  Trash2,
  BarChart3,
  FileText,
  Star,
  StarHalf,
  ArrowUpDown,
  Users,
  Sparkles,
  Brain,
  GraduationCap,
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import {
  getStatusColor,
  getStatusIcon,
  getDifficultyColor,
} from "@/utils/utils";
import { toast } from "sonner";
import QuizListHero from "./quiz-list-hero";
const QuizList = ({ userId }: { userId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for recommended quizzes
  const recommendedQuizzes = [
    { id: "rec1", title: "Advanced SQL Queries", type: "Multiple Choice" },
    { id: "rec2", title: "Data Structures Fundamentals", type: "Theory" },
  ];

  const data = useQuery(
    orpc.quiz.getAll.queryOptions({ input: { userId } })
  );


  type Quiz = NonNullable<typeof data.data>[number]

  // Filter and sort quizzes
  const filteredQuizzes = data.data
    ?.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterType === "all" || quiz.quizType === filterType) &&
        (activeTab === "all" ||
          (activeTab === "completed" && quiz.status === "COMPLETED") ||
          (activeTab === "pending" &&
            ["PENDING", "PROCESSING"].includes(quiz.status ?? "")) ||
          (activeTab === "failed" && quiz.status === "FAILED"))
    )
    .sort((a, b) => {
      if (sortField === "createdAt") {
        return sortOrder === "desc"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "title") {
        return sortOrder === "desc"
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
      return 0;
    });

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await orpc.quiz.delete.call({
        quizId,
        userId,
      });
      toast.success("Quiz deleted successfully");
      data.refetch();
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl bg-background rounded">
      {/* Hero section with stats */}
      <QuizListHero userId={userId} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar with filters and recommendations */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Quiz Type</p>
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        variant={filterType === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType("all")}
                        className="justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        All Types
                      </Button>
                      <Button
                        variant={
                          filterType === "multiple-choice"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setFilterType("multiple-choice")}
                        className="justify-start"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Multiple Choice
                      </Button>
                      <Button
                        variant={
                          filterType === "theory" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setFilterType("theory")}
                        className="justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Theory
                      </Button>
                      <Button
                        variant={
                          filterType === "yes-no" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setFilterType("yes-no")}
                        className="justify-start"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Yes/No
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">Sort By</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-between"
                        >
                          <span>
                            {sortField === "createdAt"
                              ? "Date Created"
                              : "Title"}
                          </span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortField("createdAt");
                            setSortOrder("desc");
                          }}
                        >
                          Newest First
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortField("createdAt");
                            setSortOrder("asc");
                          }}
                        >
                          Oldest First
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortField("title");
                            setSortOrder("asc");
                          }}
                        >
                          Title (A-Z)
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortField("title");
                            setSortOrder("desc");
                          }}
                        >
                          Title (Z-A)
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle>Recommended</CardTitle>
                <CardDescription>Quizzes you might like</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                        <Brain className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {quiz.type}
                        </p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Sparkles className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to My Quizzes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle>Study Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Completed</p>
                      {/* Todo: stats study progress */}
                      <p className="text-sm text-muted-foreground">9/23</p>
                    </div>
                    <Progress value={8 * 100} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Learning streak:</span>
                    </div>
                    <span className="font-semibold">8 days</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>People learning:</span>
                    </div>
                    <span className="font-semibold">1,203</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <TabsList className="grid w-full sm:w-auto grid-cols-4 bg-card">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs sm:text-sm">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs sm:text-sm">
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="failed" className="text-xs sm:text-sm">
                    Failed
                  </TabsTrigger>
                </TabsList>

                <div className="relative flex-1 sm:max-w-xs bg-card">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search quizzes..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                {filteredQuizzes ? renderQuizzes(filteredQuizzes) : null}
              </TabsContent>
              <TabsContent value="completed" className="m-0">
                {filteredQuizzes ? renderQuizzes(filteredQuizzes) : null}
              </TabsContent>
              <TabsContent value="pending" className="m-0">
                {filteredQuizzes ? renderQuizzes(filteredQuizzes) : null}
              </TabsContent>
              <TabsContent value="failed" className="m-0">
                {filteredQuizzes ? renderQuizzes(filteredQuizzes) : null}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );

  function renderQuizzes(quizzes: Quiz[]) {
    if ( data.isPending ) {
      return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden bg-card"
            >
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
      );
    }

    if (quizzes.length === 0 && !data.isPending) {
      return (
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
            <Button asChild className="mt-4 gap-2">
              <Link to="/dashboard/quizzes/new">
                <Plus className="h-4 w-4" />
                <span>Create Your First Quiz</span>
              </Link>
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className={cn(
              "overflow-hidden transition-all hover:shadow-md bg-card",
              quiz.status === "COMPLETED"
                ? "border-l-4 border-l-green-500"
                : quiz.status === "FAILED"
                ? "border-l-4 border-l-red-500"
                : ""
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Badge
                      className={cn(
                        "gap-1 font-normal",
                        getStatusColor(quiz.status!)
                      )}
                    >
                      {getStatusIcon(quiz.status!)}
                      <span>
                        {quiz.status === "COMPLETED"
                          ? "Ready"
                          : quiz.status || "Unknown"}
                      </span>
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Quiz Status</h4>
                        <p className="text-sm">
                          {quiz.status === "COMPLETED"
                            ? "Quiz is ready to take. Click 'View Quiz' to start."
                            : quiz.status === "PENDING"
                            ? "Quiz is in queue and will be processed soon."
                            : quiz.status === "PROCESSING"
                            ? "Quiz is being processed. Please check back soon."
                            : "Quiz generation failed. See error details below."}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal">
                    {quiz.quizType === "multiple-choice"
                      ? "Multiple Choice"
                      : quiz.quizType === "theory"
                      ? "Theory"
                      : "Yes/No"}
                  </Badge>

                  {quiz.difficulty && (
                    <Badge
                      className={cn(
                        "font-normal",
                        getDifficultyColor(quiz.difficulty)
                      )}
                    >
                      {quiz.difficulty}
                    </Badge>
                  )}
                </div>
              </div>

              <CardTitle className="line-clamp-1 text-xl group">
                <span className="group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </span>
                {quiz.status === "COMPLETED" && quiz.averageScore && (
                  <div className="mt-1 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(quiz.averageScore) ? (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : i === Math.floor(quiz.averageScore) &&
                          quiz.averageScore % 5 > 0 ? (
                          <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <Star className="h-4 w-4 text-gray-300" />
                        )}
                      </span>
                    ))}
                    <span className="ml-1 text-sm font-medium">
                      {quiz.averageScore}/{quiz.totalAttempts}
                    </span>
                  </div>
                )}
              </CardTitle>

              <CardDescription className="line-clamp-1">
                {quiz.documentLink}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Document-based quiz</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created {format(new Date(quiz.createdAt), "MMM d, yyyy")}
                  </span>
                </div>

                {quiz.status === "COMPLETED" && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {/* <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-950">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        Completion
                      </p>
                      <div className="mt-1 flex items-center">
                        <div className="w-full bg-blue-100 rounded-full h-1.5 dark:bg-blue-900">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-400"
                            // TODO: calculate completion rate
                            // style={{ width: `${quiz.completionRate}%` }}
                            style={{ width: `${56}%` }}
                          ></div>
                        </div>
                        {/* <span className="ml-2 text-xs font-medium">{quiz.completionRate}%</span> 
                        <span className="ml-2 text-xs font-medium">{56}%</span>
                      </div>
                    </div> */}

                    <div className="rounded-md bg-purple-50 p-2 dark:bg-purple-950">
                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        Time Spent
                      </p>
                      <p className="text-sm font-medium">
                        {quiz.totalTimeSpent ?? 0}m
                      </p>
                    </div>
                  </div>
                )}

                {quiz.tags && quiz.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {quiz.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs px-2 py-0 h-5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {quiz.error && (
                  <div className="mt-3 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                    <p className="font-semibold">Error:</p>
                    <p className="line-clamp-2">{quiz.error}</p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                asChild
                variant={quiz.status === "COMPLETED" ? "default" : "outline"}
                className="gap-1"
              >
                <Link
                  to="/dashboard/quizzes/$quizId"
                  params={{ quizId: quiz.id }}
                >
                  <span>
                    {quiz.status === "COMPLETED"
                      ? "Review Results"
                      : "View Quiz"}
                  </span>
                </Link>
              </Button>

              <div className="flex gap-2">
                {quiz.status === "COMPLETED" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Analytics</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

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
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};

export default QuizList;
