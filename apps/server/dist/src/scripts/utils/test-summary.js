"use strict";
// #!/usr/bin/env ts-node
// import "dotenv/config";
// import { db } from "../../db/index.js";
// import { generateSummary } from "./generate-summary.js";
// import { summary } from "../../db/schema/summary";
// async function GenerateQuizTest() {
//   console.log("starting test");
//   try {
//     const documentLink =
//       "https://lcasmcbhfijvxhjxkahp.supabase.co/storage/v1/object/public/pdf/quiz-pdfs/Intro_to_HPC.pdf";
//     console.log("generating summary");
//     const { data, error } = await generateSummary(documentLink, {
//       detailLevel: "quick summary",
//       outputPercentage: 30,
//       customUserPrompt:
//         "Generate a lecture-note style summary for the provided document.",
//     });
//     if (error) {
//       console.log("Error generating summary:", error);
//       process.exit(1);
//     }
//     console.log("about to insert summary");
//     // if (data) {
//     //   await db.insert(summary).values({
//     //     id: crypto.randomUUID(),
//     //     summary: data,
//     //   });
//     // }
//     console.log("Summary generated successfully:");
//     console.log(data?.slice(0, 100));
//   } catch (error) {
//     console.error(error);
//   }
// }
// GenerateQuizTest();
