import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({}),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
      manifest: {
        name: "Xyen AI Quizzer",
        short_name: "Xyen Quizzer",
        description:
          "Generate and Practice Exam questions from PDF, TXT, DOC, DOCX, CSV, RTF documents or Prompts",
        start_url: "/dashboard/quizzes",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        theme_color: "#ddffb3",
        background_color: "#ddffb3",
        icons: [
          {
            src: "/icons/web/favicon.ico",
            type: "image/x-icon",
            sizes: "32x32",
          },
          {
            src: "/icons/web/icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icons/web/icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/icons/web/icon-192-maskable.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/icons/web/icon-512-maskable.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        categories: [
          "education",
          "quiz",
          "exam",
          "question",
          "answer",
          "study",
          "practice",
          "generator",
          "ai",
        ],
        screenshots: [
          {
            src: "/screenshots/screenshot-3.png",
            type: "image/png",
            sizes: "1082x2400",
            form_factor: "narrow",
            label: "Quiz Dashboard",
          },
          {
            src: "/screenshots/screenshot-1.png",
            type: "image/png",
            sizes: "1866x959",
            form_factor: "wide",
            label: "Landing page",
          },
          {
            src: "/screenshots/screenshot-2.png",
            type: "image/png",
            sizes: "1866x959",
            form_factor: "wide",
            label: "Sign in page",
          },
          {
            src: "/screenshots/screenshot-4.png",
            type: "image/png",
            sizes: "1866x959",
            form_factor: "wide",
            label: "Generate Quiz",
          },
          {
            src: "/screenshots/screenshot-5.png",
            type: "image/png",
            sizes: "1866x959",
            form_factor: "wide",
            label: "Quiz Overview",
          },
          {
            src: "/screenshots/screenshot-6.png",
            type: "image/png",
            sizes: "1866x959",
            form_factor: "wide",
            label: "Quiz Screen",
          },
        ],
        scope: "/",
        lang: "en-US",
        dir: "ltr",
        orientation: "portrait",
        prefer_related_applications: false,
        related_applications: [],
        shortcuts: [
          {
            name: "New Quiz",
            description: "Create a new quiz",
            url: "/dashboard/quizzes/new",
            icons: [
              {
                src: "/icons/web/xyen-add.png",
                type: "image/png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Quizzes",
            description: "View all quizzes",
            url: "/dashboard/quizzes",
            icons: [
              {
                src: "/icons/web/xyen-quiz.png",
                type: "image/png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Settings",
            description: "Manage your account settings",
            url: "/dashboard/settings",
            icons: [
              {
                src: "/icons/web/xyen-settings.png",
                type: "image/png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Account",
            description: "Manage your account",
            url: "/dashboard/account",
            icons: [
              {
                src: "/icons/web/xyen-account.png",
                type: "image/png",
                sizes: "96x96",
              },
            ],
          },
        ],
      },
      pwaAssets: {
        disabled: false,
        config: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
