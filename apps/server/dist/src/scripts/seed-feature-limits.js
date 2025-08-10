#!/usr/bin/env ts-node
import "dotenv/config";
import { FeatureLimitService } from "../services/feature-limit.service";
async function seedFeatureLimits() {
    console.log("🌱 Seeding default feature limits...");
    try {
        await FeatureLimitService.seedDefaultLimits();
        console.log("✅ Feature limits seeded successfully!");
    }
    catch (error) {
        console.error("❌ Error seeding feature limits:", error);
        process.exit(1);
    }
}
// Run the seeding
seedFeatureLimits()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
export { seedFeatureLimits };
