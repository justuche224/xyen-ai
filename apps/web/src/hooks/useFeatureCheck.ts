import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export type FeatureKey =
  | "concurrent_jobs"
  | "daily_generations"
  | "pdf_exports"
  | "max_questions"
  | "quiz_attempts";

export function useFeatureCheck(
  userId: string,
  featureKey: FeatureKey,
  requestedAmount: number = 1,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["feature-check", userId, featureKey, requestedAmount],
    queryFn: () =>
      orpc.user.checkFeatureAccess.call({
        userId,
        featureKey,
        requestedAmount,
      }),
    enabled: enabled && !!userId,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
  });
}

export function useCanCreateQuiz(userId: string, questionCount: number) {
  const dailyCheck = useFeatureCheck(userId, "daily_generations", 1);
  const jobCheck = useFeatureCheck(userId, "concurrent_jobs", 1);
  const questionCheck = useFeatureCheck(userId, "max_questions", questionCount);

  return {
    canCreate:
      dailyCheck.data?.allowed &&
      jobCheck.data?.allowed &&
      questionCheck.data?.allowed,
    reasons: [
      !dailyCheck.data?.allowed && dailyCheck.data?.message,
      !jobCheck.data?.allowed && jobCheck.data?.message,
      !questionCheck.data?.allowed && questionCheck.data?.message,
    ].filter(Boolean),
    isLoading:
      dailyCheck.isLoading || jobCheck.isLoading || questionCheck.isLoading,
  };
}

export function useCanExportPDF(userId: string) {
  return useFeatureCheck(userId, "pdf_exports", 1);
}
