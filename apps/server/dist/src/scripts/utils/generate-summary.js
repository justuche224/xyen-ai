import "dotenv/config";
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
// import { writeFileSync } from "fs";
const apikey = process.env.GOOGLE_GEMINI_API_KEY;
if (!apikey) {
    // console.log("GOOGLE_GEMINI_API_KEY is not set");
    process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: apikey });
const LECTURE_NOTE_SYSTEM_PROMPT = `
You are an AI assistant specialized in converting PDF content into high-quality, lecture-note style summaries. Follow these rules exactly:

---

### 1. Primary Behavior

- **Write as if taking lecture notes**.  
  - Use concise bullet points or numbered lists when appropriate.
  - Include definitions, key concepts, and relationships.
  - Preserve technical terminology and important figures/data.

- **Do not** preface with meta-comments like “This chapter discusses…” or “The document talks about…”.  
- **Do not** refer to “the author” or “the text”; speak directly.

---

### 2. Tone & Style

- **Direct** and **objective**: e.g.,  
  > “Newton’s Second Law: Force = mass × acceleration.”  
- **Clear hierarchy**:  
  - Use headings (\`##\`, \`###\`) for major sections.  
  - Use bold for definitions or critical terms.  
- **Consistent formatting**: markdown only.

---

### 3. Structure of Each Summary

1. **Title:**  
   - Mirror the PDF’s section/chapter title exactly.

2. **High-Level Outline:**  
   - One or two lines summarizing the section’s purpose.

3. **Key Concepts & Details:**  
   - Bullet points covering:  
     - Definitions  
     - Important formulas or data  
     - Examples (if any)  
     - Sub-concepts in nested bullets

4. **Connections & Implications:**  
   - Brief notes on how concepts relate or why they matter.

---

### 4. Length & Detail Controls

- **Default (detailed)**:  
  - Provide a complete, standalone summary that could replace the original text without loss of context.  
- **If user requests “brief” or “short”**:  
  - Compress into **3–5 bullets** per major heading.  
- **If user requests “percent-based”** (e.g., “summarize at 30% length”):  
  - Limit summary to approximately that fraction of the word count.  
  - Preserve all major headings and critical details, reducing examples and peripheral commentary first.

---

### 5. Alternate Instructions Handling

- The user **may** include extra directives, such as:  
  - \`<<LENGTH: SHORT>>\`  
  - \`<<DEPTH: HIGH>>\`  
  - \`<<PERCENT: 25%>>\`  
- **Always** parse and apply these:
  - \`LENGTH\` → follow “brief” vs. “detailed” rules.
  - \`DEPTH\` → increase or decrease sub-bullet granularity.
  - \`PERCENT\` → adjust total word count accordingly.

---

### 6. Response Format

- Wrap each summary in a top-level fenced code block marked \`markdown\` if embedding in mixed output.
- No additional commentary outside the summary itself.
- Example invocation:

<<LENGTH: DETAILED>> Summary for Chapter 5.7: “Quantum Harmonic Oscillator”


---

### 7. Error Handling

- If the input PDF is empty or unreadable, reply:
> “⚠️ Unable to extract content. Please check the file and try again.”

- If conflicting directives appear (e.g., \`LENGTH: SHORT\` and \`PERCENT: 90%\`), prioritize **percent-based** instruction and warn:
> “⚠️ Conflicting length instructions; proceeding with 90% length.”

---

_End of system prompt._
`;
async function generateSummary(documentLink, options = {}) {
    const { detailLevel, outputPercentage, customUserPrompt } = options;
    try {
        // console.log(`Fetching document from: ${documentLink}`);
        const documentResponse = await fetch(documentLink);
        if (!documentResponse.ok) {
            throw new Error(`Failed to fetch document: ${documentResponse.status} ${documentResponse.statusText}`);
        }
        const document = await documentResponse.arrayBuffer();
        // console.log(`Document fetched, size: ${document.byteLength} bytes`);
        let userInstruction = "Generate a lecture-note style summary for the provided document.";
        const directives = [];
        if (outputPercentage && outputPercentage > 0 && outputPercentage <= 100) {
            directives.push(`<<PERCENT: ${outputPercentage}%>>`);
        }
        else {
            directives.push(`<<PERCENT: 30%>>`);
        }
        switch (detailLevel) {
            case "detailed":
                directives.push("<<LENGTH: DETAILED>>");
                break;
            case "very detailed":
                directives.push("<<LENGTH: DETAILED>>");
                directives.push("<<DEPTH: HIGH>>");
                break;
            case "shallow":
                directives.push("<<LENGTH: SHORT>>");
                directives.push("<<DEPTH: LOW>>");
                break;
            case "very short":
            case "quick summary":
                directives.push("<<LENGTH: SHORT>>");
                break;
            // If no detailLevel, it defaults to AI's interpretation of "detailed" from system prompt.
        }
        if (directives.length > 0) {
            userInstruction = `${directives.join(" ")} ${userInstruction}`;
        }
        if (customUserPrompt) {
            userInstruction = `${userInstruction} Additional instructions: ${customUserPrompt}`;
        }
        console.log("User instruction for AI:", userInstruction);
        const contents = [
            {
                text: userInstruction,
            },
            {
                inlineData: {
                    mimeType: "application/pdf",
                    data: Buffer.from(document).toString("base64"),
                },
            },
        ];
        // console.log("Sending request to Gemini API...");
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: {
                systemInstruction: LECTURE_NOTE_SYSTEM_PROMPT,
                responseMimeType: "text/plain",
                // TODO: Add max output tokens
                // maxOutputTokens: 8192,
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                ],
            },
        });
        const text = response.text;
        if (!text || text.trim() === "") {
            // This could happen if the AI returns an empty response or one of its canned error messages
            // that doesn't match our explicit error handling.
            if (response.promptFeedback?.blockReason) {
                throw new Error(`AI request blocked: ${response.promptFeedback.blockReason} - ${response.promptFeedback.blockReasonMessage}`);
            }
            throw new Error("AI returned an empty summary.");
        }
        function cleanMarkdownCodeBlock(text) {
            console.log("Cleaning markdown code block...");
            // Remove starting ```markdown or ``` line
            text = text.replace(/^```(?:markdown)?\s*/i, "");
            // Remove ending ```
            text = text.replace(/```$/, "");
            console.log("Cleaned markdown code block:", text.slice(0, 50));
            return text.trim();
        }
        // console.log("Summary generated successfully:");
        // console.log("Writing summary to file...");
        // writeFileSync("output-summary-hpc.md", cleanMarkdownCodeBlock(text));
        // console.log("Summary written to file successfully.");
        return { data: cleanMarkdownCodeBlock(text), error: null };
    }
    catch (error) {
        console.error("Error in generateSummary:", error);
        // If the error is from the Gemini API and has a specific message, use that
        let errorMessage = "Unknown error during summary generation";
        if (error.message) {
            errorMessage = error.message;
        }
        if (error.status && error.statusText) {
            // For fetch errors
            errorMessage = `Network error: ${error.status} ${error.statusText}`;
        }
        return { data: null, error: errorMessage };
    }
}
export { generateSummary };
