import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { googleSignIn } from "@/lib/google-sign-in";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  MenuIcon,
  FileText,
  Brain,
  Settings,
  Download,
  Share2,
  Clock,
  Crown,
  Check,
  Star,
  Users,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  Mail,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants for scroll-triggered animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Reusable scroll animation component
const ScrollReveal = ({
  children,
  variants = fadeInUp,
  className = "",
}: {
  children: React.ReactNode;
  variants?: any;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Smart Document Analysis",
      description:
        "Upload PDFs and our AI extracts key concepts to generate relevant questions automatically.",
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Generation",
      description:
        "Advanced AI creates multiple choice, theory, and yes/no questions with customizable difficulty levels.",
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Flexible Customization",
      description:
        "Control question count, difficulty, add custom instructions, and organize with tags.",
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Export & Share",
      description:
        "Download quizzes as PDFs or share them with students and colleagues seamlessly.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Instant Results",
      description:
        "Generate comprehensive quizzes in seconds, not hours. Perfect for tight deadlines.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description:
        "Your documents are processed securely with enterprise-grade encryption and privacy protection.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "3 quiz generations per day",
        "Up to 10 questions per quiz",
        "3 PDF exports per month",
        "Basic question types",
        "Community support",
      ],
      limitations: [
        "Limited concurrent jobs (1)",
        "Daily generation limits",
        "Monthly export limits",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For educators and professionals",
      features: [
        "Unlimited quiz generations",
        "Up to 30 questions per quiz",
        "Unlimited PDF exports",
        "All question types & difficulties",
        "Custom instructions & tags",
        "Priority support",
        "Advanced analytics",
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited questions per quiz",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "High School Teacher",
      avatar: "SC",
      content:
        "Xyen AI has transformed how I create assessments. What used to take hours now takes minutes, and the questions are always relevant and well-crafted.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "University Professor",
      avatar: "MR",
      content:
        "The ability to generate different difficulty levels from the same material is incredible. My students love the variety in their practice quizzes.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Corporate Trainer",
      avatar: "EJ",
      content:
        "Perfect for creating training assessments from our documentation. The AI understands context beautifully and creates meaningful questions.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How does the AI generate questions from my documents?",
      answer:
        "Our advanced AI analyzes your PDF documents to understand key concepts, definitions, and important information. It then creates relevant questions that test comprehension, application, and knowledge retention based on the content.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "Currently, we support PDF files up to 5MB in size. We're working on adding support for additional formats like DOCX, TXT, and more in future updates.",
    },
    {
      question: "Can I customize the generated questions?",
      answer:
        "Yes! You can specify question types (multiple choice, theory, yes/no), difficulty levels (easy to extreme), question count, and even add custom instructions to guide the AI's question generation.",
    },
    {
      question: "Is there a limit on how many quizzes I can create?",
      answer:
        "Free users can create 3 quizzes per day with up to 10 questions each. Pro users have unlimited quiz generation with up to 30 questions per quiz. Enterprise users have no limits.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take security seriously. All documents are processed with enterprise-grade encryption, and we don't store your files longer than necessary for processing. Your data is never shared with third parties.",
    },
    {
      question: "Can I export and share my quizzes?",
      answer:
        "Absolutely! You can export quizzes as PDF files and share them with students, colleagues, or anyone who needs them. Pro users get unlimited exports, while free users get 3 exports per month.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Quizzes Generated" },
    { number: "10K+", label: "Happy Users" },
    { number: "500K+", label: "Questions Created" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-10 py-3 bg-sidebar/60 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold">
            Xyen AI
          </Link>
          <nav className="md:flex items-center justify-center gap-2 hidden">
            <Button asChild variant="link">
              <a href="#features">Features</a>
            </Button>
            <Button asChild variant="link">
              <a href="#pricing">Pricing</a>
            </Button>
            <Button asChild variant="link">
              <a href="#testimonials">Testimonials</a>
            </Button>
            <Button asChild variant="link">
              <a href="#faq">FAQ</a>
            </Button>
          </nav>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="md:flex items-center justify-center gap-2 hidden">
            <Button asChild aria-label="Sign in" variant="outline">
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button
              type="button"
              aria-label="Continue with Google"
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
              Google
            </Button>
          </div>
          <Drawer>
            <DrawerTrigger className="md:hidden" aria-label="Menu">
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="md:hidden" role="navigation">
              <DrawerHeader>
                <DrawerTitle>Xyen AI</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button asChild variant="outline">
                  <a href="#features">Features</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#pricing">Pricing</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#testimonials">Testimonials</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#faq">FAQ</a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/sign-in">Sign in</Link>
                </Button>
                <Button
                  type="button"
                  aria-label="Continue with Google"
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
                  Google
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-16 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={scaleIn}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal>
        <section id="features" className="py-24">
          <div className="container max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features for Modern Learning
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create engaging, effective quizzes from
                any document
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Pricing Section */}
      <ScrollReveal>
        <section id="pricing" className="py-24 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start free and upgrade as you grow. All plans include our core
                AI features.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={plan.popular ? scaleIn : fadeInUp}
                >
                  <Card
                    className={`relative h-full ${
                      plan.popular
                        ? "border-primary shadow-lg scale-105"
                        : "border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-3 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        {plan.period !== "pricing" && (
                          <span className="text-muted-foreground">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-4">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => {
                          if (plan.name === "Free") {
                            void googleSignIn();
                          }
                        }}
                      >
                        {plan.name === "Enterprise" && (
                          <Users className="w-4 h-4 mr-2" />
                        )}
                        {plan.name === "Pro" && (
                          <Crown className="w-4 h-4 mr-2" />
                        )}
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
        <section id="testimonials" className="py-24">
          <div className="container max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Loved by Educators Worldwide
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how teachers, professors, and trainers are transforming
                their assessment creation
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={slideInLeft}>
                  <Card className="border-0 shadow-lg h-full">
                    <CardContent className="pt-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal>
        <section id="faq" className="py-24 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Xyen AI
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-0">
                      <button
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                        onClick={() =>
                          setOpenFaq(openFaq === index ? null : index)
                        }
                      >
                        <span className="font-medium pr-4">{faq.question}</span>
                        <motion.div
                          animate={{ rotate: openFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: openFaq === index ? "auto" : 0,
                          opacity: openFaq === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        {openFaq === index && (
                          <div className="px-6 pb-6">
                            <p className="text-muted-foreground">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-24">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Teaching?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of educators who are already creating better
                assessments with AI. Start your free account today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => void googleSignIn()}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Today
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Link to="/demo" className="flex items-center">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <footer className="bg-muted/50 border-t">
          <div className="container max-w-6xl mx-auto px-6 py-12">
            <motion.div
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <motion.div className="space-y-4" variants={slideInLeft}>
                <h3 className="text-lg font-semibold">Xyen AI</h3>
                <p className="text-muted-foreground text-sm">
                  Transform any document into intelligent quizzes with the power
                  of AI.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={fadeInUp}>
                <h4 className="font-medium">Product</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <a
                      href="#features"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </a>
                  </div>
                  <div>
                    <a
                      href="#pricing"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </a>
                  </div>
                  <div>
                    <Link
                      to="/demo"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Demo
                    </Link>
                  </div>
                  <div>
                    <a
                      href="#faq"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      FAQ
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={fadeInUp}>
                <h4 className="font-medium">Company</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <Link
                      to="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={slideInRight}>
                <h4 className="font-medium">Support</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Help Center
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Status
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <a
                      href="mailto:support@xyen.ai"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      support@xyen.ai
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <p>&copy; 2024 Xyen AI. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </ScrollReveal>
    </section>
  );
}
