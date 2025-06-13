import { Redis } from "@upstash/redis";

export default new Redis({
  url: process.env.REDIS_UPSTASH_URL!,
  token: process.env.REDIS_UPSTASH_TOKEN!,
});
