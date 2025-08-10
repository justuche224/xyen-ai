import { ORPCError } from "@orpc/server";
import {
  FeatureLimitService,
  type FeatureKey,
} from "@/services/feature-limit.service.js";
import { o } from "./orpc.js";

export function requireFeature(
  featureKey: FeatureKey,
  requestedAmount: number = 1,
  trackUsage: boolean = true
) {
  return o.middleware(async ({ context, next }) => {
    if (!context.session?.user) {
      throw new ORPCError("UNAUTHORIZED");
    }

    const sessionContext = context as typeof context & {
      session: NonNullable<typeof context.session>;
    };
    const userId = sessionContext.session.user.id;

    // Check if user can use this feature
    const featureCheck = await FeatureLimitService.canUseFeature(
      userId,
      featureKey,
      requestedAmount
    );

    if (!featureCheck.allowed) {
      throw new ORPCError("FORBIDDEN", {
        message:
          featureCheck.message || `Feature limit exceeded for ${featureKey}`,
      });
    }

    // Execute the procedure
    const result = await next({
      context: {
        ...sessionContext,
        featureCheck,
      },
    });

    // Track usage after successful execution
    if (trackUsage) {
      await FeatureLimitService.trackUsage(userId, featureKey, requestedAmount);
    }

    return result;
  });
}

// Create procedure variants with feature checking
export const protectedProcedureWithFeature = (
  featureKey: FeatureKey,
  amount: number = 1,
  track: boolean = true
) => o.use(requireFeature(featureKey, amount, track));
