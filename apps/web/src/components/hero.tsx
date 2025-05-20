import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { googleSignIn } from "@/lib/google-sign-in";

const Hero = () => {
  return (
    <section className="overflow-hidden max-w-7xl mx-auto min-h-screen">
      <div className="container mx-auto pt-24 lg:pt-32 px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:gap-16 lg:flex-row lg:items-center">
          <motion.div
            className="flex flex-col gap-6 lg:gap-8 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/20 text-primary">
                  AI-Powered Learning
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Transform Documents into{" "}
                <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
                  Intelligent Quizzes
                </span>
              </motion.h1>
              
                <motion.p
                  className="text-md lg:text-xl text-muted-foreground leading-relaxed max-w-[600px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Xyen AI helps students, educators, and professionals
                  generate comprehensive exam questions from any document.
                  Upload files or use AI prompts to create customized quizzes in
                  seconds.
                </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                aria-label="Get Started"
              >
                <Link to="/sign-in" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  void googleSignIn();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                Continue with Google
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No credit card required</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
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
                      DOC, DOCX, CSV, or RTF format. Alternatively, you can use
                      our AI prompt feature to generate questions from scratch.
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
                              Question 3 of 10
                            </span>
                            <h4 className="font-medium mt-1">
                              What is the primary function of mitochondria in a
                              cell?
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
