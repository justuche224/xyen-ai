import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function useFeatureLimits(userId: string) {
  return useQuery({
    queryKey: ["feature-limits", userId],
    queryFn: () => orpc.user.getFeatureLimits.call({ userId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeatureUsage(userId: string, featureKey: string) {
  return useQuery({
    queryKey: ["feature-usage", userId, featureKey],
    queryFn: () => orpc.user.getFeatureUsage.call({ userId, featureKey }),
    staleTime: 30 * 1000, // 30 seconds
  });
}
