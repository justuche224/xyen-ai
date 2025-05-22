import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { writeFileSync } from "fs";
const apikey = process.env.GOOGLE_GEMINI_API_KEY as string;

if (!apikey) {
  console.log("GOOGLE_GEMINI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: apikey });

async function generateQuiz(
  documentLink: string,
  quiztype: "multiple-choice" | "yes-no" | "theory",
  difficulty: "easy" | "medium" | "hard" | "extreme" | null,
  questionCount: number | null,
  customePrompt?: string
) {
  try {
    const document = await fetch(documentLink).then((response) =>
      response.arrayBuffer()
    );

    const contents = [
      { text: `Generate quiz from.${customePrompt}. Dificulty level = ${difficulty ?? "medium"}` },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(document).toString("base64"),
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction: `You are an expert quiz generator. Your task is to output a quiz in valid JSON format only—do not include any extra text or commentary. Generate a quiz with ${questionCount ?? 10} ${
          quiztype === "multiple-choice"
            ? "multiple choice"
            : quiztype === "yes-no"
            ? "yes or no"
            : "theory"
        } questions. The JSON should follow this structure:
        JSON:
        [
          ${
            quiztype === "multiple-choice"
              ? `{
              "id": "q1",
              "text": "What is the capital of France?",
              "type": "multiple-choice",
              "choices": [
                { "id": "a", "text": "Paris", "isCorrect": true },
                { "id": "b", "text": "Berlin", "isCorrect": false },
                { "id": "c", "text": "Madrid", "isCorrect": false },
                { "id": "d", "text": "Rome", "isCorrect": false }
              ]
            }`
              : quiztype === "yes-no"
              ? `{
              "id": "q1",
              "text": "Is the sky blue?",
              "type": "yes-no",
              "choices": [
                { "id": "a", "text": "Yes", "isCorrect": true },
                { "id": "b", "text": "No", "isCorrect": false }
              ]
            }`
              : `{
              "id": "q1",
              "text": "Explain the significance of the French Revolution.",
              "type": "theory",
              "answer": "The French Revolution was significant because..."
            }`
          }
        ]
        The output must be a valid JSON string, starting with [ or { and ending with ] or } respectively, with no other characters or formatting before or after.
        Output pure valid JSON, nothing else.
        No new line encodings or markdown formatting.
        `,
        responseMimeType: "application/json",
      },
    });

    const text = response.text ?? "";
    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch (parseErr) {
      throw new Error("AI didn’t return valid JSON: " + parseErr);
    }

    // writeFileSync("output-theory.json", text);

    return { data: parsed, error: null };
  } catch (error) {
    return { error: (error as Error).message || "Unknown error" };
  }
}

export { generateQuiz };
