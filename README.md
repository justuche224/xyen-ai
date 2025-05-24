# Xyen AI - Intelligent Quiz Generator

Transform any document into comprehensive quizzes using the power of AI. Xyen AI helps students, educators, and professionals generate exam questions from PDF documents in seconds.

![Xyen AI Platform](https://img.shields.io/badge/Platform-Quiz%20Generation-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 🚀 Features

### Core Functionality

- **AI-Powered Question Generation** - Advanced AI analyzes PDF documents to create relevant questions
- **Multiple Question Types** - Multiple choice, theory, and yes/no questions
- **Customizable Difficulty** - Easy, medium, hard, and extreme difficulty levels
- **Smart Document Analysis** - Extracts key concepts and important information automatically
- **PDF Export** - Download generated quizzes as professional PDF documents
- **Question Count Control** - Generate 5, 10, 20, or 30 questions per quiz

### Freemium Business Model

- **Free Tier** - 3 daily quiz generations, up to 10 questions, 3 monthly PDF exports
- **Pro Tier** - Unlimited generations, up to 30 questions, unlimited exports
- **Enterprise Tier** - Custom solutions with team collaboration and API access
- **Feature Limiting System** - Database-driven limits with automatic usage tracking and resets

### User Experience

- **Animated Landing Page** - Smooth scroll-triggered animations throughout
- **Interactive Platform Demo** - Auto-cycling tabs showing the 3-step workflow
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** - Theme switching with system preference detection
- **Progressive Web App** - Installable PWA with offline capabilities

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety across the application
- **TanStack Router** - File-based routing with type-safe navigation
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide Icons** - Consistent iconography

### Backend

- **Hono** - Ultra-fast, lightweight web framework
- **ORPC** - End-to-end type-safe APIs with OpenAPI integration
- **Node.js** - JavaScript runtime environment
- **Better Auth** - Secure authentication with email/password and OAuth

### Database & ORM

- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - TypeScript-first database toolkit
- **Database Studio** - Visual database management interface

### AI & File Processing

- **OpenAI Integration** - GPT-powered question generation
- **PDF Processing** - Secure file upload and text extraction
- **Custom Prompting** - Optimized prompts for educational content

## 🏗️ Architecture

### Database Schema

```
├── users/               # User authentication and profiles
├── userPlans/          # Subscription plan management
├── featureLimits/      # Configurable feature limits per plan
├── featureUsage/       # Usage tracking with automatic resets
├── quiz/               # Quiz metadata and configuration
├── jobs/               # Background job processing
└── questions/          # Generated quiz questions and answers
```

### Feature Limiting System

- **Plan-based Limits** - Different limits for free, pro, and enterprise users
- **Usage Tracking** - Real-time monitoring of feature usage
- **Automatic Resets** - Daily, monthly, or never-expiring limits
- **Concurrent Job Management** - Prevent resource abuse
- **Scalable Architecture** - Easy to add new features and limits

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/justuche224/xyen-ai.git
cd xyen-ai
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment Setup**

```bash
# Copy environment files
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env

# Update with your configuration:
# - PostgreSQL connection string
# - OpenAI API key
# - Authentication secrets
# - File upload settings
```

4. **Database Setup**

```bash
# Push schema to database
pnpm db:push

# Seed with default feature limits
pnpm db:seed
```

5. **Start Development Server**

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.
API server runs at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
xyen-ai/
├── apps/
│   ├── web/                    # React frontend application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── routes/         # File-based routing
│   │   │   └── utils/          # Utility functions
│   │   └── public/             # Static assets
│   └── server/                 # Hono backend API
│       ├── src/
│       │   ├── db/             # Database schemas and migrations
│       │   ├── routes/         # API route handlers
│       │   ├── services/       # Business logic services
│       │   └── middleware/     # Custom middleware
│       └── uploads/            # File upload storage
└── packages/                   # Shared packages and configurations
```

## 🎯 Key Features Implementation

### Quiz Generation Workflow

1. **Document Upload** - Secure PDF upload with validation
2. **AI Processing** - Extract text and generate questions using OpenAI
3. **Customization** - Apply user preferences for type, difficulty, count
4. **Background Jobs** - Async processing for better UX
5. **Result Delivery** - Structured quiz data with export options

### Feature Limiting Implementation

```typescript
// Example: Check if user can create quiz
const canCreate = await featureLimitService.checkLimit(
  userId,
  "daily_generations"
);

if (!canCreate) {
  throw new Error("Daily generation limit reached");
}

// Track usage after successful operation
await featureLimitService.trackUsage(userId, "daily_generations");
```

## 📊 Available Scripts

```bash
# Development
pnpm dev              # Start all applications
pnpm dev:web          # Start frontend only
pnpm dev:server       # Start backend only

# Database
pnpm db:push          # Apply schema changes
pnpm db:studio        # Open database studio
pnpm db:seed          # Seed default data

# Production
pnpm build            # Build all applications
pnpm start            # Start production servers

# Utilities
pnpm check-types      # TypeScript type checking
pnpm lint             # Code linting
pnpm format           # Code formatting
```

## 🔧 Configuration

### Environment Variables

**Server (`apps/server/.env`)**

```env
CORS_ORIGIN
BETTER_AUTH_SECRET
BETTER_AUTH_URL
DATABASE_URL
MAILER_EMAIL
MAILER_PASSWORD
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI
GOOGLE_GEMINI_API_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_URL
SUPABASE_BUCKET
```

**Web (`apps/web/.env`)**

```env
VITE_SERVER_URL
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## 🚀 Deployment

The application is ready for deployment on platforms like:

- **Vercel** - Frontend deployment with edge functions
- **Railway/Render** - Backend API deployment
- **Supabase/PlanetScale** - Managed PostgreSQL database
- **Supabase Bucket** - File storage for uploads

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation** - [docs.xyen.ai](https://docs.xyen.ai)
- **Email** - support@xyen.ai
- **Discord** - [Join our community](https://discord.gg/xyen-ai)

---

Built with ❤️ using [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
