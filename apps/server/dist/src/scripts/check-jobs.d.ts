#!/usr/bin/env ts-node
import "dotenv/config";
declare function checkJobsAndUsage(): Promise<void>;
export { checkJobsAndUsage };
