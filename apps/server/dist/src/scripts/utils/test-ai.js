import { generateQuiz } from "./generate-quiz.js";
import { writeFileSync } from "fs";
async function GenerateQuizTest() {
    console.log("starting test");
    try {
        const documentLink = "https://lcasmcbhfijvxhjxkahp.supabase.co/storage/v1/object/public/pdf/pdf/V6AIFeudMutV6yymarSqRFZGQaZLJS5d-COS%20421%20Database%20design%20and%20management%20Note%20B-1747667257285.pdf";
        const quiztype = "multiple-choice";
        const difficulty = "medium";
        const questionCount = 20;
        const customPrompt = "Generate very precise and detailed questions.";
        console.log("generating quiz");
        const { data, error } = await generateQuiz(documentLink, quiztype, difficulty, questionCount, customPrompt);
        if (error) {
            console.log("Error generating quiz:", error);
            process.exit(1);
        }
        // console.log(data);
        // writeFileSync("quiz.json", data as string);
        // return data;
        console.log("Quiz generated successfully:");
    }
    catch (error) {
        console.error(error);
    }
}
GenerateQuizTest();
