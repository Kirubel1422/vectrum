import { ApiSuccess } from "@/lib/handlers/response.handler";
import { AnalyzeServices } from "@/lib/service/analyzeCV.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const cv = formData.get("cv");
    const jobDescription = formData.get("jobDescription");

    const cvContent = await AnalyzeServices.analyze(
      jobDescription as string,
      cv as File
    );

    return NextResponse.json(new ApiSuccess(cvContent));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
