import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute('/demo')({  
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto py-16 px-6 lg:px-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Platform Demo</h1>
      
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="upload" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="upload">1. Upload</TabsTrigger>
            <TabsTrigger value="generate">2. Generate</TabsTrigger>
            <TabsTrigger value="practice">3. Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  Upload Your Documents
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Simply drag and drop your study materials in PDF, TXT,
                  DOC, DOCX, CSV, or RTF format. Alternatively, you can
                  use our AI prompt feature to generate questions from
                  scratch.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Supports multiple file formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Secure file handling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>No file size limitations</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-lg overflow-hidden border border-primary/20">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="pt-10 p-6 bg-card">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-primary/50 mb-4" />
                      <p className="text-center text-muted-foreground mb-4">
                        Drag and drop your files here, or click to browse
                      </p>
                      <Button aria-label="Browse Files" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="generate">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  Generate Questions
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our advanced AI analyzes your content and generates
                  relevant questions across different formats including
                  multiple choice, true/false, and short answer questions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Customizable question types</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Adjustable difficulty levels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Focus on specific topics</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-lg overflow-hidden border border-primary/20">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="pt-10 p-6 bg-card">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Question Type</span>
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          Multiple Choice
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Difficulty</span>
                        <div className="flex">
                          <span className="h-2 w-8 bg-primary rounded-l-full"></span>
                          <span className="h-2 w-8 bg-primary/60 rounded-r-full"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          Number of Questions
                        </span>
                        <span>10</span>
                      </div>
                      <Button
                        aria-label="Generate Quiz"
                        className="w-full mt-4"
                      >
                        Generate Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="practice">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  Practice & Learn
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Take the generated quiz, review your answers, and get
                  instant feedback. Save quizzes for later or share them
                  with others for collaborative learning.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Instant feedback and explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Track your progress over time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Share quizzes with classmates or students</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-lg overflow-hidden border border-primary/20">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="pt-10 p-6 bg-card">
                    <div className="space-y-6">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Question 1 of 10
                        </span>
                        <h4 className="text-lg font-medium mt-1">
                          What is the primary function of mitochondria in
                          a cell?
                        </h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded border border-primary/20 bg-primary/5">
                          <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span>Energy production</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded border border-muted">
                          <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                          <span>Protein synthesis</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded border border-muted">
                          <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                          <span>Cell division</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded border border-muted">
                          <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                          <span>Waste removal</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button aria-label="Previous" variant="outline">
                          Previous
                        </Button>
                        <Button aria-label="Next">Next</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
