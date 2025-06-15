import { db } from "@/db";
import { resumesTable } from "@/db/schema";
import { ApiSuccess } from "@/lib/handlers/response.handler";
import { AnalyzeServices } from "@/lib/service/analyzeCV.service";
import { withErrorHandler } from "@/lib/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: Request) => {
  const formData = await req.formData();
  const userId = req.headers.get("x-user-id");

  const cv = formData.get("cv");
  const jobDescription = formData.get("jobDescription");

  const { content, resumePath } = await AnalyzeServices.analyze(
    jobDescription as string,
    cv as File
  );

  await db
    .insert(resumesTable)
    .values({
      content: JSON.stringify(content),
      resume_url: resumePath,
      user_id: userId as string,
    })
    .execute();

  return NextResponse.json(new ApiSuccess(content));
});
