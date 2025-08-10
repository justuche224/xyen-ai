export type FeatureKey = "concurrent_jobs" | "daily_generations" | "pdf_exports" | "max_questions" | "quiz_attempts";
export type PlanType = "free" | "pro" | "enterprise";
export declare class FeatureLimitService {
    static canUseFeature(userId: string, featureKey: FeatureKey, requestedAmount?: number): Promise<{
        allowed: boolean;
        limit?: number;
        current?: number;
        message?: string;
    }>;
    static trackUsage(userId: string, featureKey: FeatureKey, amount?: number, metadata?: any): Promise<void>;
    private static getUserPlan;
    private static getCurrentUsage;
    private static getConcurrentUsage;
    private static resetUsage;
    private static getNextResetDate;
    static seedDefaultLimits(): Promise<void>;
}
