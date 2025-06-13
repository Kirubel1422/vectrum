import redis from "@/db/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export default new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});
