import { cookieConfig } from "@/lib/constants";
import { ApiSuccess } from "@/lib/handlers/response.handler";
import { SignUpSchema } from "@/lib/schemas/auth";
import { AuthService } from "@/lib/service/auth.service";
import { RequestBodyParser } from "@/lib/utils/bodyParser";
import { withErrorHandler } from "@/lib/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (req) => {
  const data = RequestBodyParser(SignUpSchema, await req.json());

  const { jwt, user } = await AuthService.signup(data);

  const response = NextResponse.json(new ApiSuccess(user, 201, undefined));

  response.cookies.set({ ...cookieConfig, value: jwt });

  return response;
});
