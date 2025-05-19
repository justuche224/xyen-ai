import { generateQuiz } from "./generate-quiz";
import { writeFileSync } from "fs";
async function GenerateQuizTest() {
  console.log("starting test");

  try {
    const documentLink =
      "https://lcasmcbhfijvxhjxkahp.supabase.co/storage/v1/object/public/pdf//COS%20441Net%20Centric%20Computing%20LectureNotes%20vs2%20Bakpo&Onyima1.doc.pdf";
    const quiztype = "multiple-choice";

    console.log("generating quiz");

    const { data, error } = await generateQuiz(documentLink, quiztype);

    if (error) {
      throw new Error(error);
    }
    // console.log(data);
    writeFileSync("quiz.json", data as string);
    return data;
  } catch (error) {
    console.error(error);
  }
}
export default GenerateQuizTest;
