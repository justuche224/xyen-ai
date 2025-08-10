import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../../db/index.js";
import { quiz, quizMeta } from "../../db/schema/quiz.js";
import { protectedProcedure } from "../../lib/orpc.js";
import { requireFeature } from "../../lib/feature-middleware.js";
import { generateQuizPDFWithPdfMake } from "./pdfMake.js";
function createServerSupabaseClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseBucket = process.env.SUPABASE_BUCKET;
    if (!supabaseUrl || !supabaseServiceKey || !supabaseBucket) {
        throw new Error("Missing Supabase environment variables");
    }
    return createClient(supabaseUrl, supabaseServiceKey);
}
async function uploadPDFToSupabase(pdfBuffer, userId, quizTitle) {
    const supabase = createServerSupabaseClient();
    const fileName = `${userId}-${quizTitle.replace(/[^a-zA-Z0-9]/g, "_")}-${Date.now()}.pdf`;
    const filePath = `quiz-pdfs/${fileName}`;
    const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET ?? "")
        .upload(filePath, pdfBuffer, {
        contentType: "application/pdf",
        upsert: false,
    });
    if (error) {
        throw new Error(`Failed to upload PDF: ${error.message}`);
    }
    const { data: { publicUrl }, } = supabase.storage
        .from(process.env.SUPABASE_BUCKET ?? "")
        .getPublicUrl(filePath);
    return publicUrl;
}
export const generateQuizPDFHandler = protectedProcedure
    .use(requireFeature("pdf_exports"))
    .input(z.object({
    quizId: z.string(),
    userId: z.string(),
}))
    .handler(async ({ input }) => {
    try {
        const quizResult = await db
            .select({
            id: quiz.id,
            title: quiz.title,
            data: quiz.data,
            quizType: quiz.quizType,
            userId: quiz.userId,
            metaId: quizMeta.id,
            tags: quizMeta.tags,
            questionsAsPdf: quizMeta.questionsAsPdf,
        })
            .from(quiz)
            .leftJoin(quizMeta, eq(quiz.id, quizMeta.quizId))
            .where(and(eq(quiz.id, input.quizId), eq(quiz.userId, input.userId)))
            .limit(1);
        if (quizResult[0]?.questionsAsPdf) {
            return {
                success: true,
                pdfUrl: quizResult[0].questionsAsPdf,
                message: "PDF already generated",
            };
        }
        if (!quizResult.length) {
            throw new Error("Quiz not found or unauthorized");
        }
        const quizData = quizResult[0];
        if (!quizData.data) {
            throw new Error("Quiz has no data to convert to PDF");
        }
        if (!quizData.metaId) {
            throw new Error("Quiz meta not found");
        }
        const data = quizData.data;
        const pdfUint8Array = await generateQuizPDFWithPdfMake(data, quizData.title, quizData.quizType, quizData.tags ?? undefined);
        const pdfBuffer = Buffer.from(pdfUint8Array);
        const pdfUrl = await uploadPDFToSupabase(pdfBuffer, input.userId, quizData.title);
        await db
            .update(quizMeta)
            .set({
            questionsAsPdf: pdfUrl,
            updatedAt: new Date(),
        })
            .where(eq(quizMeta.id, quizData.metaId));
        return {
            success: true,
            pdfUrl: pdfUrl,
            message: "PDF generated and uploaded successfully",
        };
    }
    catch (error) {
        console.error("Error generating quiz PDF:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to generate PDF",
        };
    }
});
