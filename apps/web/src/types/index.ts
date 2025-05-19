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
