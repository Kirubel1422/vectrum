import { cookieConfig } from "@/lib/constants";
import { ApiSuccess } from "@/lib/handlers/response.handler";
import { withErrorHandler } from "@/lib/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async () => {
  const response = NextResponse.json(new ApiSuccess({ logout: true }));
  response.cookies.set("jwt", "", {
    ...cookieConfig,
    expires: Date.now(),
    maxAge: 0,
  });
  return response;
});
