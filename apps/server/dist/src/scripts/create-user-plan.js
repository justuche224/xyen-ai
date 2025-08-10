#!/usr/bin/env ts-node
import "dotenv/config";
import { db } from "../db/index.js";
import { userPlans } from "../db/schema/subscription.js";
import { eq } from "drizzle-orm";
async function createUserPlan() {
    console.log("👤 Creating user plan for user without one...\n");
    const userId = "V6AIFeudMutV6yymarSqRFZGQaZLJS5d";
    try {
        // Check if user already has a plan
        const existingPlan = await db
            .select()
            .from(userPlans)
            .where(eq(userPlans.userId, userId))
            .limit(1);
        if (existingPlan.length > 0) {
            console.log("✅ User already has a plan");
            return;
        }
        // Create free plan for user
        await db.insert(userPlans).values({
            id: crypto.randomUUID(),
            userId,
            planType: "free",
            status: "active",
            startDate: new Date(),
        });
        console.log("✅ Created free plan for user");
    }
    catch (error) {
        console.error("❌ Error:", error);
    }
}
createUserPlan()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
export { createUserPlan };
