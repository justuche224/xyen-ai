import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const tabContentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

interface PlatformDemoProps {
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

const PlatformDemo = ({
  autoplay = true,
  interval = 4000,
  className = "",
}: PlatformDemoProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const tabs = ["upload", "generate", "practice"];

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <motion.div
            key="upload"
            className="flex flex-col lg:flex-row items-center gap-4 md:gap-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="lg:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Upload Your Documents
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Simply drag and drop your study materials in PDF format. Our AI
                will analyze your content and extract key concepts to generate
                relevant questions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>PDF document support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Secure file handling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 5MB file size</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden border border-primary/20 bg-card">
                <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pt-10 p-3 md:p-6">
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 md:p-8 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <FileText className="h-12 w-12 text-primary/50 mb-4" />
                    </motion.div>
                    <p className="text-center text-sm md:text-base text-muted-foreground mb-4">
                      Drag and drop your files here, or click to browse
                    </p>
                    <Button size="sm" variant="outline">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "generate":
        return (
          <motion.div
            key="generate"
            className="flex flex-col lg:flex-row items-center gap-4 md:gap-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="lg:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Generate Questions
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Our advanced AI analyzes your content and generates relevant
                questions across different formats including multiple choice,
                theory, and yes/no questions.
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
              <div className="relative rounded-lg overflow-hidden border border-primary/20 bg-card">
                <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pt-10 p-3 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Question Type</span>
                      <motion.span
                        className="text-sm bg-primary/10 text-primary px-2 py-1 rounded"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Multiple Choice
                      </motion.span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Difficulty</span>
                      <div className="flex">
                        <motion.span
                          className="h-2 w-8 bg-primary rounded-l-full"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.span
                          className="h-2 w-8 bg-primary/60 rounded-r-full"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Number of Questions</span>
                      <motion.span
                        animate={{
                          color: [
                            "rgb(156 163 175)",
                            "rgb(59 130 246)",
                            "rgb(156 163 175)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        10
                      </motion.span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full mt-4">Generate Quiz</Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "practice":
        return (
          <motion.div
            key="practice"
            className="flex flex-col lg:flex-row items-center gap-4 md:gap-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="lg:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Practice & Learn
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Take the generated quiz, review your answers, and get instant
                feedback. Save quizzes for later or share them with others for
                collaborative learning.
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
              <div className="relative rounded-lg overflow-hidden border border-primary/20 bg-card">
                <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pt-10 p-3 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <motion.span
                        className="text-xs md:text-sm text-muted-foreground"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Question 3 of 10
                      </motion.span>
                      <h4 className="text-sm md:text-base font-medium mt-1">
                        What is the primary function of mitochondria in a cell?
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center gap-2 p-2 rounded border border-primary/20 bg-primary/5"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <span className="text-sm md:text-base">
                          Energy production
                        </span>
                      </motion.div>
                      <div className="flex items-center gap-2 p-2 rounded border border-muted">
                        <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                        <span className="text-sm md:text-base">
                          Protein synthesis
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded border border-muted">
                        <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                        <span className="text-sm md:text-base">
                          Cell division
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded border border-muted">
                        <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                        <span className="text-sm md:text-base">
                          Waste removal
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="sm">Next</Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto ${className}`}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upload" className="relative">
            1. Upload
            {activeTab === "upload" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="generate" className="relative">
            2. Generate
            {activeTab === "generate" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="practice" className="relative">
            3. Practice
            {activeTab === "practice" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabsTrigger>
        </TabsList>

        <div className="relative min-h-[300px] md:min-h-[400px]">
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </div>
      </Tabs>
    </motion.div>
  );
};

export { PlatformDemo };
