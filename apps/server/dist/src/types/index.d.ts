export interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}
import { z } from "zod";
export declare const ChoiceSchema: z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    isCorrect: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    isCorrect: boolean;
}, {
    id: string;
    text: string;
    isCorrect: boolean;
}>;
export type Choice = z.infer<typeof ChoiceSchema>;
export declare const QuestionSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    type: z.ZodEnum<["multiple-choice", "yes-no"]>;
    choices: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        isCorrect: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        text: string;
        isCorrect: boolean;
    }, {
        id: string;
        text: string;
        isCorrect: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}>, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}>, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}>;
export type Question = z.infer<typeof QuestionSchema>;
export declare const QuizDataSchema: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    type: z.ZodEnum<["multiple-choice", "yes-no"]>;
    choices: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        isCorrect: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        text: string;
        isCorrect: boolean;
    }, {
        id: string;
        text: string;
        isCorrect: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}>, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}>, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}, {
    id: string;
    text: string;
    type: "multiple-choice" | "yes-no";
    choices: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}>, "many">;
export declare const TheoryQuestionSchema: z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    type: z.ZodLiteral<"theory">;
    answer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    type: "theory";
    answer: string;
}, {
    id: string;
    text: string;
    type: "theory";
    answer: string;
}>;
export type TheoryQuestion = z.infer<typeof TheoryQuestionSchema>;
export declare const TheoryQuizDataSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    type: z.ZodLiteral<"theory">;
    answer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    type: "theory";
    answer: string;
}, {
    id: string;
    text: string;
    type: "theory";
    answer: string;
}>, "many">;
export type Status = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
export type QuizType = "multiple-choice" | "yes-no" | "theory";
