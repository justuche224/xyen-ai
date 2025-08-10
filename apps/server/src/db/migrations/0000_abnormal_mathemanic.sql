CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"quiz_id" text,
	"status" text NOT NULL,
	"error" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"data" json,
	"jobId" text,
	"documentLink" text NOT NULL,
	"customePrompt" text,
	"quizType" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"quiz_id" text,
	"user_id" text,
	"mode" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"answers" json,
	"score" integer,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_meta" (
	"id" text PRIMARY KEY NOT NULL,
	"quiz_id" text,
	"question_count" integer NOT NULL,
	"questions_as_pdf" text,
	"description" text,
	"difficulty" text NOT NULL,
	"tags" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feature_limits" (
	"id" text PRIMARY KEY NOT NULL,
	"plan_type" text NOT NULL,
	"feature_key" text NOT NULL,
	"limit_type" text NOT NULL,
	"limit_value" integer NOT NULL,
	"reset_period" text,
	"enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feature_usage" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"feature_key" text NOT NULL,
	"usage_count" integer DEFAULT 0 NOT NULL,
	"last_used" timestamp,
	"reset_date" timestamp,
	"metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_plans" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_type" text DEFAULT 'free' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_jobId_jobs_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_meta" ADD CONSTRAINT "quiz_meta_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature_usage" ADD CONSTRAINT "feature_usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;