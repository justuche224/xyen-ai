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
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
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
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const generateQuiz = async () => {
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
    if (!uploading) {
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

    if (uploading) return;

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

  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-6 bg-background rounded">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Quiz</h1>
          <p className="text-muted-foreground">Generate quiz questions from your PDF documents using AI</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-500 text-green-500 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your quiz has been created successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <FileUp className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Upload Document</CardTitle>
                </div>
                <CardDescription>Upload a PDF file to generate questions from</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer
                    ${file 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-300 hover:border-primary hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                    }
                    ${uploading ? "pointer-events-none opacity-60" : ""}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !uploading && document.getElementById("file-upload")?.click()}
                >
                  <div className="text-center">
                    {file ? (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                        {!uploading && (
                          <Button variant="outline" size="sm">
                            Change File
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PDF files up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                    accept=".pdf"
                  />
                </div>

                {uploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Creating quiz...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiz Details */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Quiz Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={uploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    placeholder="Brief description of the quiz (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={uploading}
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Question Count</Label>
                    <Select
                      value={questionCount.toString()}
                      onValueChange={(value) => setQuestionCount(Number(value) as QuestionCount)}
                      disabled={uploading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Questions</SelectItem>
                        <SelectItem value="10">10 Questions</SelectItem>
                        <SelectItem value="20">20 Questions</SelectItem>
                        <SelectItem value="30">30 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={questionType}
                      onValueChange={(value: QuestionType) => setQuestionType(value)}
                      disabled={uploading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="theory">Theory</SelectItem>
                        <SelectItem value="yes-no">Yes/No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={difficulty}
                    onValueChange={(value: Difficulty) => setDifficulty(value)}
                    disabled={uploading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="extreme">Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Custom Instructions</Label>
                  <textarea
                    id="prompt"
                    placeholder="Add specific instructions..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={uploading}
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      disabled={uploading}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={uploading || !tagInput.trim()}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            disabled={uploading}
                            className="ml-1 h-3 w-3"
                          >
                            <X className="h-2 w-2" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={generateQuiz}
              disabled={!file || uploading || !title.trim()}
              className="w-full h-12"
              size="lg"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Quiz...
                </>
              ) : (
                `Generate Quiz`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;