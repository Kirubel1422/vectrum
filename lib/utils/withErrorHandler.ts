import { AuthApiError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { ApiError } from "../handlers/response.handler";

export function withErrorHandler(
  handler: (req: Request) => Promise<Response> | Promise<void>
) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: any) {
      if (error instanceof AuthApiError) {
        switch (error.code) {
          case "invalid_credentials":
            return NextResponse.json(
              new ApiError("Fail", 400, "Invalid email or password"),
              { status: 400 }
            );
          case "email_exists":
            return NextResponse.json(
              new ApiError("Fail", 400, "Email already exists"),
              { status: 400 }
            );
        }
      }

      if (error.message === "Bad credentials") {
        return NextResponse.json(new ApiError({}, 400, "Invalid credentials"), {
          status: 400,
        });
      }

      console.log(error);

      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  };
}
