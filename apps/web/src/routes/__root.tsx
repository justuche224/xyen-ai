import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { InstallPWA } from "@/components/install-pwa";
import { link, orpc, ORPCContext } from "@/utils/orpc";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import type { RouterClient } from "@orpc/server";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { appRouter } from "../../../server/src/routers";
import { createORPCClient } from "@orpc/client";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

export interface RouterAppContext {
  orpc: typeof orpc;
  queryClient: QueryClient;
}

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Xyen AI Quizzer",
  url: "https://xyen-ai.vercel.app",
  image: "https://xyen-ai.vercel.app/images/preview.png",
  description:
    "An AI-powered quiz and exam generator that allows users to create and practice tests from documents and prompts.",
  applicationCategory: "Education",
  operatingSystem: "Web",
  author: {
    "@type": "Organization",
    name: "Xyen AI",
  },
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Xyen AI Quizzer - Generate & Practice Exam Questions with AI",
      },
      {
        name: "description",
        content:
          "Xyen AI Quizzer helps you generate and practice exam questions from PDF, TXT, DOC, DOCX, CSV, and RTF files or AI-powered prompts. Perfect for students, teachers, and professionals preparing for exams.",
      },
      {
        name: "keywords",
        content:
          "AI Exam Generator, AI Quiz Generator, Exam AI, Practice Tests, Exam Questions AI, Quiz AI, Test Preparation, Study AI, Mock Tests, Online Quiz Generator, AI-powered Study Tool, Exam Revision, Self Assessment AI, Practice Exams, Education AI",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "author",
        content: "Xyen AI Team",
      },
      {
        name: "theme-color",
        content: "#ddffb3",
      },
      // OpenGraph meta tags
      {
        property: "og:title",
        content: "Xyen AI Quizzer - Generate & Practice Exam Questions with AI",
      },
      {
        property: "og:description",
        content:
          "Generate and practice exam questions from PDF, TXT, DOC, DOCX, CSV, RTF files, or AI-generated prompts. Perfect for students, educators, and professionals.",
      },
      {
        property: "og:url",
        content: "https://xyen-ai.vercel.app",
      },
      {
        property: "og:site_name",
        content: "Xyen AI Quizzer",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:image",
        content: "https://xyen-ai.vercel.app/images/preview.png",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: "Xyen AI Quizzer - AI-powered Exam and Quiz Generator",
      },
      // Twitter meta tags
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Xyen AI Quizzer - Generate & Practice Exam Questions with AI",
      },
      {
        name: "twitter:description",
        content:
          "Generate and practice exam questions from PDF, TXT, DOC, DOCX, CSV, and RTF files or AI-powered prompts. Perfect for students, teachers, and professionals.",
      },
      {
        name: "twitter:site",
        content: "https://xyen-ai.vercel.app",
      },
      {
        name: "twitter:creator",
        content: "@xyen_ai",
      },
      {
        name: "twitter:image",
        content: "https://xyen-ai.vercel.app/images/preview.png",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "canonical",
        href: "https://xyen-ai.vercel.app",
      },
      {
        rel: "apple-touch-icon",
        href: "/icons/web/apple-touch-icon.png",
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  const [client] = useState<RouterClient<typeof appRouter>>(() =>
    createORPCClient(link)
  );
  const [orpcUtils] = useState(() => createORPCReactQueryUtils(client));

  return (
    <>
      <HeadContent />
      <ORPCContext.Provider value={orpcUtils}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="grid grid-rows-[auto_1fr] h-svh">
            {isFetching ? <Loader /> : <Outlet />}
          </div>
          <Toaster richColors position="top-center" />
          <InstallPWA />
        </ThemeProvider>
      </ORPCContext.Provider>
      {/* <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" /> */}
    </>
  );
}
