#!/usr/bin/env ts-node

import "dotenv/config";
import { db } from "../db";
import { jobs } from "../db/schema/jobs";
import { featureUsage, userPlans } from "../db/schema/subscription";
import { FeatureLimitService } from "../services/feature-limit.service";

async function checkJobsAndUsage() {
  console.log("🔍 Checking current jobs and feature usage...\n");

  try {
    // Check all jobs
    console.log("📋 All Jobs:");
    const allJobs = await db.select().from(jobs);
    console.log(JSON.stringify(allJobs, null, 2));

    console.log("\n📈 All Feature Usage:");
    const allUsage = await db.select().from(featureUsage);
    console.log(JSON.stringify(allUsage, null, 2));

    console.log("\n📝 All User Plans:");
    const allPlans = await db.select().from(userPlans);
    console.log(JSON.stringify(allPlans, null, 2));

    // Test the user with the PROCESSING job
    const processingJob = allJobs.find((job) => job.status === "PROCESSING");
    if (processingJob) {
      const userId = processingJob.userId;
      console.log(`\n🔧 Testing user with PROCESSING job: ${userId}`);

      const dailyCheck = await FeatureLimitService.canUseFeature(
        userId,
        "daily_generations",
        1
      );
      console.log("Daily generations check:", dailyCheck);

      const concurrentCheck = await FeatureLimitService.canUseFeature(
        userId,
        "concurrent_jobs",
        1
      );
      console.log("Concurrent jobs check:", concurrentCheck);

      const questionCheck = await FeatureLimitService.canUseFeature(
        userId,
        "max_questions",
        10
      );
      console.log("Max questions check:", questionCheck);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkJobsAndUsage()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

export { checkJobsAndUsage };
