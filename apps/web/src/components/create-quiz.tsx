import type React from "react"

import { AlertCircle, FileText, Loader2, Upload, CheckCircle } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "./ui/button"
import { uploadFile } from "@/utils/upload-file"
import { orpc } from "@/utils/orpc"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const MAX_FILE_SIZE = 5 * 1024 * 1024
type QuestionType = "multiple-choice" | "yes-no"
const ALLOWED_FILE_TYPES = ["application/pdf"]

const CreateQuiz = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("")
  const [questionType, setQuestionType] = useState<QuestionType>("multiple-choice")
  const [success, setSuccess] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null)
      return
    }

    const selectedFile = e.target.files[0]

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Only PDF documents are allowed")
      setFile(null)
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        `File size exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit (${(selectedFile.size / (1024 * 1024)).toFixed(
          2,
        )}MB)`,
      )
      setFile(null)
      return
    }

    setError(null)
    setFile(selectedFile)
    setSuccess(false)
  }

  const generateQuiz = async () => {
    if (!file || !title.trim() || !userId) {
      setError("Please fill in all fields")
      return
    }

    setUploading(true)
    setUploadProgress(10)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.floor(Math.random() * 10)
      })
    }, 500)

    const { url, error } = await uploadFile(file, userId, title)

    clearInterval(progressInterval)
    setUploadProgress(95)

    if (error) {
      setError(error)
      setUploading(false)
      setUploadProgress(0)
      return
    }

    if (url) {
      setUploadProgress(100)

      const {
        quizId,
        jobId,
        error: createError,
      } = await orpc.quiz.create.call({
        title,
        quizType: questionType,
        documentLink: url,
        userId,
      })

      if (createError) {
        setError(createError)
        setUploading(false)
        setUploadProgress(0)
        return
      }

      if (quizId && jobId) {
        setError(null)
        setUploading(false)
        setSuccess(true)

        // Reset form after 3 seconds of showing success
        setTimeout(() => {
          setFile(null)
          setTitle("")
          setQuestionType("multiple-choice")
          setUploadProgress(0)
        }, 3000)

        return
      }
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!uploading) {
      e.currentTarget.classList.add("border-primary")
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("border-primary")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("border-primary")

    if (uploading) return

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]

      if (!ALLOWED_FILE_TYPES.includes(droppedFile.type)) {
        setError("Only PDF documents are allowed")
        setFile(null)
        return
      }

      if (droppedFile.size > MAX_FILE_SIZE) {
        setError(
          `File size exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit (${(droppedFile.size / (1024 * 1024)).toFixed(
            2,
          )}MB)`,
        )
        setFile(null)
        return
      }

      setError(null)
      setFile(droppedFile)
      setSuccess(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center">Create New Quiz</CardTitle>
          <CardDescription className="text-center">Upload a PDF document to generate quiz questions</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-500 text-green-500 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your quiz has been created successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">
                Quiz Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your quiz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={uploading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionType" className="text-base font-medium">
                Question Type
              </Label>
              <Select
                value={questionType}
                onValueChange={(value: QuestionType) => setQuestionType(value)}
                disabled={uploading}
              >
                <SelectTrigger id="questionType" className="h-11">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="yes-no">Yes/No</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Multiple choice questions have 4 options, while Yes/No questions have 2 options.
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <Label className="text-base font-medium">
                Upload Document <span className="text-destructive">*</span>
              </Label>

              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 transition-colors
                  ${file ? "border-primary/50 bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50"}
                  ${uploading ? "cursor-not-allowed opacity-70" : ""}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center gap-3 relative">
                  {file ? (
                    <>
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-lg truncate max-w-xs">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)} · PDF Document</p>
                      </div>
                      {!uploading && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-primary/10 hover:bg-primary/20" 
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Change File
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <div
                        className="flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Click to upload</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            or drag and drop PDF documents (up to 5MB)
                          </p>
                        </div>
                      </div>
                    </>
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
            </div>

            {uploading && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Please wait while we process your document and generate quiz questions
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-6">
          <Button
            onClick={generateQuiz}
            disabled={!file || uploading || !title.trim()}
            className="w-full h-12 text-base font-medium"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <a href="#" className="text-primary hover:underline">
            View our documentation
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default CreateQuiz
