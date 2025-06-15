import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtService } from "./lib/service/jwt.service";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");

  if (!jwt) return NextResponse.json(new ApiError(401, "UnAuthorized"));

  const { value } = jwt;
  if (!value) return NextResponse.json(new ApiError(401, "UnAuthorized"));

  const result = await JwtService.edgeVerify(value);

  request.headers.set("x-user-id", result.userId);

  const response = NextResponse.next();
  response.headers.set("x-user-id", result.userId);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/v1/analyze",
};
