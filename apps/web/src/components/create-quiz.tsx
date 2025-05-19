import { AlertCircle, Loader2, Upload } from "lucide-react";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
type QuestionType = "multiple-choice" | "yes-no";
// type QuizStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  // "text/plain",
  // "application/msword",
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // "text/csv",
  // "application/rtf",
];

const CreateQuiz = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [questionType, setQuestionType] =
    useState<QuestionType>("multiple-choice");

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
        `File size exceeds the ${MAX_FILE_SIZE} limit (${(
          selectedFile.size /
          (1024 * 1024)
        ).toFixed(2)}MB)`
      );
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const generateQuiz = async () => {
    if (!file || !title.trim() || !userId) {
      setError("Please fill in all fields");
      return;
    }
    setUploading(true);
    const { url, error } = await uploadFile(file, userId, title);
    if (error) {
      setError(error);
      setUploading(false);
      return;
    }
    if (url) {
      const {
        quizId,
        jobId,
        error: createError,
      } = await orpc.quiz.create.call({
        title,
        quizType: questionType,
        documentLink: url,
        userId,
      });
      if (createError) {
        setError(createError);
        setUploading(false);
        return;
      }
      if (quizId && jobId) {
        setError(null);
        setUploading(false);
        setFile(null);
        setTitle("");
        setQuestionType("multiple-choice");
        return;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Create New Quiz</h1>
      <div className="grid grid-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="title" className="font-medium">
            Quiz Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={uploading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="questionType" className="font-medium">
            Question Type
          </Label>
          <Select
            value={questionType}
            onValueChange={(value: QuestionType) => setQuestionType(value)}
            disabled={uploading}
          >
            <SelectTrigger id="questionType">
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="yes-no">Yes/No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="font-medium">
              {file ? file.name : "Click or drag and drop to upload"}
            </p>
            <p className="text-sm text-muted-foreground">
              Only PDF documents are allowed
            </p>
          </div>
        </div>
      </div>
      <Button
        onClick={generateQuiz}
        disabled={!file || uploading || !title.trim()}
        className="w-full"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Generate Quiz"
        )}
      </Button>
    </div>
  );
};

export default CreateQuiz;
