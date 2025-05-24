#!/usr/bin/env ts-node

import "dotenv/config";
import { FeatureLimitService } from "../services/feature-limit.service";
import { db } from "../db";
import { userPlans } from "../db/schema/subscription";
import { user } from "../db/schema/auth";
import { eq } from "drizzle-orm";

async function testFeatureLimits() {
  console.log("🧪 Testing feature limits system...\n");

  // Test user ID (you can replace this with a real user ID from your database)
  const testUserId = "test-user-123";

  try {
    // First, create a test user in the user table
    console.log("1️⃣ Setting up test user...");
    try {
      await db.insert(user).values({
        id: testUserId,
        name: "Test User",
        email: "test@example.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch {
      // User might already exist, that's fine
    }

    // Then create a user plan (free plan by default)
    console.log("2️⃣ Setting up test user with free plan...");
    try {
      await db.insert(userPlans).values({
        id: crypto.randomUUID(),
        userId: testUserId,
        planType: "free",
        status: "active",
        startDate: new Date(),
      });
    } catch {
      // User plan might already exist, that's fine
    }

    // Test 1: Check daily generations limit (free = 3)
    console.log("\n3️⃣ Testing daily generations limit (free plan: 3/day)...");

    // Should be allowed initially
    let check1 = await FeatureLimitService.canUseFeature(
      testUserId,
      "daily_generations",
      1
    );
    console.log(
      `First generation attempt: ${
        check1.allowed ? "✅ ALLOWED" : "❌ DENIED"
      } (${check1.current}/3)`
    );

    if (check1.allowed) {
      await FeatureLimitService.trackUsage(testUserId, "daily_generations", 1);
    }

    // Track 2 more generations
    for (let i = 2; i <= 3; i++) {
      let check = await FeatureLimitService.canUseFeature(
        testUserId,
        "daily_generations",
        1
      );
      console.log(
        `Generation ${i} attempt: ${
          check.allowed ? "✅ ALLOWED" : "❌ DENIED"
        } (${check.current}/3)`
      );
      if (check.allowed) {
        await FeatureLimitService.trackUsage(
          testUserId,
          "daily_generations",
          1
        );
      }
    }

    // Try 4th generation - should be denied
    let check4 = await FeatureLimitService.canUseFeature(
      testUserId,
      "daily_generations",
      1
    );
    console.log(
      `Fourth generation attempt: ${
        check4.allowed ? "✅ ALLOWED" : "❌ DENIED"
      } (${check4.current}/3)`
    );
    console.log(`Message: ${check4.message || "No message"}`);

    // Test 2: Check PDF exports (free = 3/month)
    console.log("\n4️⃣ Testing PDF exports limit (free plan: 3/month)...");

    let pdfCheck1 = await FeatureLimitService.canUseFeature(
      testUserId,
      "pdf_exports",
      1
    );
    console.log(
      `First PDF export: ${pdfCheck1.allowed ? "✅ ALLOWED" : "❌ DENIED"} (${
        pdfCheck1.current
      }/3)`
    );

    if (pdfCheck1.allowed) {
      await FeatureLimitService.trackUsage(testUserId, "pdf_exports", 1);
    }

    // Test 3: Check question count limit
    console.log(
      "\n5️⃣ Testing question count limit (free plan: max 10 questions)..."
    );

    let questionCheck = await FeatureLimitService.canUseFeature(
      testUserId,
      "max_questions",
      10
    );
    console.log(
      `10 questions: ${questionCheck.allowed ? "✅ ALLOWED" : "❌ DENIED"}`
    );

    let questionCheck15 = await FeatureLimitService.canUseFeature(
      testUserId,
      "max_questions",
      15
    );
    console.log(
      `15 questions: ${questionCheck15.allowed ? "✅ ALLOWED" : "❌ DENIED"}`
    );
    console.log(`Message: ${questionCheck15.message || "No message"}`);

    // Test 4: Upgrade to pro and test unlimited
    console.log("\n6️⃣ Upgrading user to pro plan...");
    await db
      .update(userPlans)
      .set({ planType: "pro", updatedAt: new Date() })
      .where(eq(userPlans.userId, testUserId));

    // Test pro limits
    let proCheck = await FeatureLimitService.canUseFeature(
      testUserId,
      "daily_generations",
      1
    );
    console.log(
      `Pro daily generation: ${
        proCheck.allowed ? "✅ ALLOWED (unlimited)" : "❌ DENIED"
      }`
    );

    let proQuestionCheck = await FeatureLimitService.canUseFeature(
      testUserId,
      "max_questions",
      25
    );
    console.log(
      `Pro 25 questions: ${
        proQuestionCheck.allowed ? "✅ ALLOWED" : "❌ DENIED"
      }`
    );

    console.log("\n🎉 Feature limits system test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

// Run the test
testFeatureLimits()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

export { testFeatureLimits };
