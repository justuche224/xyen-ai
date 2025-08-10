import "dotenv/config";
type DetailLevel = "detailed" | "shallow" | "very short" | "very detailed" | "quick summary";
interface GenerateSummaryOptions {
    detailLevel?: DetailLevel;
    outputPercentage?: number;
    customUserPrompt?: string;
}
declare function generateSummary(documentLink: string, options?: GenerateSummaryOptions): Promise<{
    data: string;
    error: null;
} | {
    data: null;
    error: string;
}>;
export { generateSummary };
