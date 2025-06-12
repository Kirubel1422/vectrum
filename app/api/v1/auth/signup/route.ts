import { ApiSuccess } from "@/lib/handlers/response.handler";
import { SignUpSchema } from "@/lib/schemas/auth";
import { AuthService } from "@/lib/service/auth.service";
import { RequestBodyParser } from "@/lib/utils/bodyParser";
import { withErrorHandler } from "@/lib/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (req) => {
  const data = RequestBodyParser(SignUpSchema, await req.json());
  await AuthService.signup(data);
  return NextResponse.json(new ApiSuccess("Success"));
});
