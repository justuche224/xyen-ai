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
  quiztype: "multiple-choice" | "yes-no"
) {
  try {
    const document = await fetch(documentLink).then((response) =>
      response.arrayBuffer()
    );

    const contents = [
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
        systemInstruction: `You are an expert quiz generator. Your task is to output a quiz in valid JSON format only—do not include any extra text or commentary, Generate a quiz with 5 ${
          quiztype === "multiple-choice" ? "multiple choice" : "yes or no"
        } question. The JSON should follow this structure:
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
                                : `{
                                "id": "q1",
                                "text": "Is the sky blue?",
                                "type": "yes-no",
                                "choices": [
                                { "id": "a", "text": "Yes", "isCorrect": true },
                                { "id": "b", "text": "No", "isCorrect": false }
                                ]
                            }`
                            }]
                            "The output must be a valid JSON string, starting with [ or { and ending with ] or } respectively, with no other characters or formatting before or after."
                            "Ensure the response body is exclusively the JSON data, without any surrounding text or Markdown."
                            "Output pure valid JSON, nothing else".
                            "None of those new line encodings, just plain json nothing else.
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

    // writeFileSync("output.json", text);

    return { data: parsed, error: null };
  } catch (error) {
    return { error: (error as Error).message || "Unknown error" };
  }
}

export { generateQuiz };
