import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { googleSignIn } from "@/lib/google-sign-in";
import { PlatformDemo } from "@/components/platform-demo";

// Animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99], // Custom easing for smoother motion
    },
  },
};

const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const slideInRight = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Hero = () => {
  return (
    <section className="overflow-hidden max-w-7xl mx-auto min-h-screen">
      <div className="container mx-auto pt-24 lg:pt-32 px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:gap-16 lg:flex-row lg:items-center">
          <motion.div
            className="flex flex-col gap-6 lg:gap-8 lg:w-1/2"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/20 text-primary">
                  AI-Powered Learning
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-6xl font-bold tracking-tight"
                variants={itemVariants}
              >
                Transform Documents into{" "}
                <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
                  Intelligent Quizzes
                </span>
              </motion.h1>

              <motion.p
                className="text-md lg:text-xl text-muted-foreground leading-relaxed max-w-[600px]"
                variants={itemVariants}
              >
                Xyen AI helps students, educators, and professionals generate
                comprehensive exam questions from any document. Upload files or
                use AI prompts to create customized quizzes in seconds.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Button aria-label="Get Started">
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
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No credit card required</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            <PlatformDemo autoplay={true} interval={5000} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
