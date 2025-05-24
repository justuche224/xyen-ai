import { useFeatureLimits, useFeatureUsage } from "@/hooks/useFeatureLimits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Crown, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FeatureLimitsDisplayProps {
  userId: string;
  compact?: boolean;
}

export function FeatureLimitsDisplay({
  userId,
  compact = false,
}: FeatureLimitsDisplayProps) {
  const { data: limitsData, isLoading: limitsLoading } =
    useFeatureLimits(userId);

  if (limitsLoading) {
    return (
      <Card className={compact ? "w-full" : "w-full max-w-2xl"}>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-2 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!limitsData) {
    return null;
  }

  const isPro = limitsData.planType === "pro";
  const isEnterprise = limitsData.planType === "enterprise";

  return (
    <Card className={compact ? "w-full" : "w-full max-w-2xl"}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {isPro ? (
              <>
                <Crown className="h-5 w-5 text-yellow-500" />
                Pro Plan
              </>
            ) : isEnterprise ? (
              <>
                <Zap className="h-5 w-5 text-purple-500" />
                Enterprise Plan
              </>
            ) : (
              "Free Plan"
            )}
          </CardTitle>
          <Badge variant={isPro || isEnterprise ? "default" : "secondary"}>
            {limitsData.planType.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {limitsData.limits.map((limit: any) => (
          <FeatureLimitItem
            key={limit.featureKey}
            userId={userId}
            limit={limit}
            compact={compact}
          />
        ))}

        {!isPro && !isEnterprise && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Upgrade to Pro for unlimited access to most features and higher
              limits.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

interface FeatureLimitItemProps {
  userId: string;
  limit: {
    featureKey: string;
    limitType: string;
    limitValue: number;
    resetPeriod?: string | null;
  };
  compact?: boolean;
}

function FeatureLimitItem({ userId, limit, compact }: FeatureLimitItemProps) {
  const { data: usage } = useFeatureUsage(userId, limit.featureKey);

  const formatFeatureName = (key: string) => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatLimitValue = (value: number, type: string) => {
    if (value === -1) return "Unlimited";
    if (type === "concurrent") return `${value} at once`;
    if (type === "daily") return `${value}/day`;
    if (type === "monthly") return `${value}/month`;
    return value.toString();
  };

  const getUsagePercentage = () => {
    if (!usage || limit.limitValue === -1) return 0;
    return Math.min((usage.usageCount / limit.limitValue) * 100, 100);
  };

  const isNearLimit = () => {
    if (limit.limitValue === -1) return false;
    return usage && usage.usageCount >= limit.limitValue * 0.8;
  };

  const isAtLimit = () => {
    if (limit.limitValue === -1) return false;
    return usage && usage.usageCount >= limit.limitValue;
  };

  return (
    <div className={`space-y-2 ${compact ? "p-2" : "p-3"} border rounded-lg`}>
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">
          {formatFeatureName(limit.featureKey)}
        </div>
        <div className="text-sm text-muted-foreground">
          {usage?.usageCount || 0} /{" "}
          {formatLimitValue(limit.limitValue, limit.limitType)}
        </div>
      </div>

      {limit.limitValue !== -1 && (
        <div className="space-y-1">
          <Progress
            value={getUsagePercentage()}
            className={`h-2 ${
              isAtLimit() ? "bg-red-100" : isNearLimit() ? "bg-yellow-100" : ""
            }`}
          />
          {limit.resetPeriod && (
            <div className="text-xs text-muted-foreground">
              Resets {limit.resetPeriod}
            </div>
          )}
        </div>
      )}

      {isAtLimit() && (
        <div className="text-xs text-red-600 font-medium">Limit reached</div>
      )}
    </div>
  );
}
