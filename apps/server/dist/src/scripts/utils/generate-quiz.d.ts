import "dotenv/config";
declare function generateQuiz(documentLink: string, quiztype: "multiple-choice" | "yes-no" | "theory", difficulty: "easy" | "medium" | "hard" | "extreme" | null, questionCount: number | null, customePrompt?: string): Promise<{
    data: unknown;
    error: null;
} | {
    error: string;
    data?: undefined;
}>;
export { generateQuiz };
