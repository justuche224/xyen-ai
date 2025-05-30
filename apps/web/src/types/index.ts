import { z } from "zod";

export const ChoiceSchema = z.object({
  id: z.string().min(1, "Choice ID cannot be empty."),
  text: z.string().min(1, "Choice text cannot be empty."),
  isCorrect: z.boolean(),
});
export type Choice = z.infer<typeof ChoiceSchema>;

export const QuestionSchema = z
  .object({
    id: z.string().min(1, "Question ID cannot be empty."),
    text: z.string().min(1, "Question text cannot be empty."),
    type: z.enum(["multiple-choice", "yes-no"]),
    choices: z
      .array(ChoiceSchema)
      .min(2, "A question must have at least two choices."),
  })
  .refine(
    (question) => {
      return question.choices.some((choice) => choice.isCorrect);
    },
    {
      message:
        "At least one choice must be marked as correct for each question.",
      path: ["choices"],
    }
  )
  .refine(
    (question) => {
      if (question.type === "yes-no") {
        if (question.choices.length !== 2) return false;
        const texts = question.choices.map((c) => c.text.toLowerCase());
        return texts.includes("yes") && texts.includes("no");
      }
      return true;
    },
    {
      message:
        "Yes/No questions must have exactly two choices: one 'Yes' and one 'No'.",
      path: ["choices"],
    }
  );
export type Question = z.infer<typeof QuestionSchema>;

export const QuizDataSchema = z
  .array(QuestionSchema)
  .min(1, "A quiz must have at least one question.");

export const TheoryQuestionSchema = z.object({
  id: z.string().min(1, "Question ID cannot be empty."),
  text: z.string().min(1, "Question text cannot be empty."),
  type: z.literal("theory"),
  answer: z.string().min(1, "Theory answer cannot be empty."),
});
export type TheoryQuestion = z.infer<typeof TheoryQuestionSchema>;

export const TheoryQuizDataSchema = z
  .array(TheoryQuestionSchema)
  .min(1, "A theory quiz must have at least one question.");

export type Status = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export const userRoleSchema = z.enum(["user", "admin", "tester"]);

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const userSearchSchema = z
  .object({
    search: z.string().optional(),
    role: userRoleSchema.optional(),
    emailVerified: z.boolean().optional(),
    sortBy: z
      .enum(["createdAt", "updatedAt", "name", "email"])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .merge(paginationSchema);

 export type UserSearchSchema = z.infer<typeof userSearchSchema>;

export const userIdSchema = z.object({
  id: z.string().min(1),
});
