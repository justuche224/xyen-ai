#!/usr/bin/env ts-node

import "dotenv/config";
import { db } from "../db";
import { featureLimits } from "../db/schema/subscription";
import { eq, and } from "drizzle-orm";

async function updateResetPeriods() {
  console.log("🔄 Updating reset periods for existing feature limits...");

  const updates = [
    // Free plan updates
    { planType: "free", featureKey: "concurrent_jobs", resetPeriod: "never" },
    { planType: "free", featureKey: "daily_generations", resetPeriod: "daily" },
    { planType: "free", featureKey: "pdf_exports", resetPeriod: "monthly" },
    { planType: "free", featureKey: "max_questions", resetPeriod: "never" },

    // Pro plan updates
    { planType: "pro", featureKey: "concurrent_jobs", resetPeriod: "never" },
    { planType: "pro", featureKey: "daily_generations", resetPeriod: "daily" },
    { planType: "pro", featureKey: "pdf_exports", resetPeriod: "never" },
    { planType: "pro", featureKey: "max_questions", resetPeriod: "never" },
  ];

  try {
    for (const update of updates) {
      const result = await db
        .update(featureLimits)
        .set({
          resetPeriod: update.resetPeriod as "daily" | "monthly" | "never",
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(
              featureLimits.planType,
              update.planType as "free" | "pro" | "enterprise"
            ),
            eq(featureLimits.featureKey, update.featureKey)
          )
        );

      console.log(
        `✅ Updated ${update.planType} - ${update.featureKey} to reset ${update.resetPeriod}`
      );
    }

    console.log("✅ All reset periods updated successfully!");
  } catch (error) {
    console.error("❌ Error updating reset periods:", error);
    process.exit(1);
  }
}

// Run the update
updateResetPeriods()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

export { updateResetPeriods };
