import { supabase } from ".";

export const storage = {
  async upload({
    fileName,
    fileBuffer,
    bucketName,
    fileType,
  }: {
    fileName: string;
    fileBuffer: Buffer;
    bucketName: string;
    fileType: string;
  }) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: fileType,
      });

    return {
      path: data?.path,
      error,
    };
  },
};
