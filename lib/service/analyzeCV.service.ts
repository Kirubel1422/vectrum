import { BUCKET_NAME } from "../constants";
import { storage } from "../supabase/supabase.storage";
import path from "path";
import { cvContentParser } from "../utils/index";
import { googleGenAI } from "../utils/index";

export const AnalyzeServices = {
  async analyze(
    jobDescription: string,
    cv: File
  ): Promise<Record<string, string> | undefined> {
    // Upload CV to supabase
    const fileName = `${new Date().toISOString()}-${cv.name}`;
    const fileType = path.extname(cv.name);
    const fileBuffer = Buffer.from(await cv.arrayBuffer());

    const { error, path: uploadedFilePath } = await storage.upload({
      bucketName: BUCKET_NAME,
      fileBuffer,
      fileType,
      fileName,
    });

    if (error) {
      console.error("Error uploading CV to storage:", error);
      throw new Error("Failed to upload CV to storage");
    }

    // Parse contents of CV
    const parsedCVContent = cvContentParser(fileType, fileBuffer);

    // Prepare Content
    const content = JSON.stringify({
      job_description: jobDescription,
      cv_content: parsedCVContent,
    });

    const response = await googleGenAI(content);

    if (response != undefined) {
      return JSON.parse(response);
    }

    throw Error("Failed to generate analysis");
  },
};
