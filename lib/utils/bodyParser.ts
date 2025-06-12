import type { ZodSchema } from "zod";
import { ApiError } from "../handlers/response.handler";
import { NextResponse } from "next/server";

export const RequestBodyParser = (schema: ZodSchema, body: any) => {
  const { data, error: parsingError } = schema.safeParse(body);
  if (parsingError) {
    return NextResponse.json(
      new ApiError(
        { error: parsingError.flatten() },
        400,
        new Date().toISOString(),
        "Bad Request"
      )
    );
  }
  return data;
};
