import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Default in-memory cache — no R2 bucket required for first deploy.
  // Add `incrementalCache` from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache"
  // and bind NEXT_INC_CACHE_R2_BUCKET in wrangler.jsonc when scaling out.
});
