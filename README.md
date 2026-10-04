# Xyen AI

**Turn lecture notes and other PDFs into quizzes.** Upload a document, choose a question type and difficulty, and Xyen generates the quiz with Gemini. You can take it in the app or export it as a styled PDF.

**Live:** [xyen-ai-web.vercel.app](https://xyen-ai-web.vercel.app)

## What it does

- **Three question types:** multiple choice, yes/no, and theory.
- **Four difficulty levels** (easy, medium, hard, extreme), 5–30 questions, and an optional custom prompt to steer the content.
- **PDF export** of any quiz, generated on the server with `pdfmake`.
- **Freemium plans with usage limits stored in the database:** free and pro tiers with daily and monthly quotas, usage tracking and automatic resets. A middleware layer checks limits before any expensive work runs.
- **Accounts:** email/password and Google sign-in with Better Auth, plus email verification.
- An installable PWA with light and dark themes.

## How it works

1. The web app uploads the PDF to Supabase Storage and creates a quiz record and a `PENDING` job, all through type-safe oRPC calls.
2. A **background worker** claims jobs from a Postgres-backed queue using `SELECT … FOR UPDATE SKIP LOCKED`. Several workers can run at once without claiming the same job, and no separate queue service is needed.
3. The worker sends the PDF to **Gemini 2.0 Flash** with a strict JSON schema in the system prompt, validates the response, and saves the questions.
4. The app reads the job's status from the jobs API and shows the quiz when it's ready.

## Stack

| | |
| :--- | :--- |
| **Frontend** | React 19, Vite, TanStack Router + Query, Tailwind CSS 4, shadcn/ui, Framer Motion, GSAP, vite-plugin-pwa |
| **API** | Hono on Node, oRPC (end-to-end types), Zod |
| **Data** | PostgreSQL, Drizzle ORM |
| **AI** | Google Gemini (`@google/genai`) |
| **Auth & storage** | Better Auth, Supabase Storage, Nodemailer |

This is a pnpm monorepo with `apps/web` and `apps/server`, scaffolded with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack).

## Running it locally

```bash
pnpm install
# create apps/server/.env and apps/web/.env with the variables listed below
pnpm db:push                                   # apply the Drizzle schema
pnpm dev                                       # web on :3001, API on :3000
```

The worker and seed scripts are in `apps/server/src/scripts/`. `seed-feature-limits.ts` creates the default plan limits.

### Environment variables

**Server:** `DATABASE_URL`, `CORS_ORIGIN`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `GOOGLE_GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET`, `MAILER_EMAIL`, `MAILER_PASSWORD`

**Web:** `VITE_SERVER_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

---

Built by [Donald Amoke](https://www.donaldamoke.com).
