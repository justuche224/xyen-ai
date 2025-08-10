#!/usr/bin/env ts-node
import "dotenv/config";
declare function createUserPlan(): Promise<void>;
export { createUserPlan };
