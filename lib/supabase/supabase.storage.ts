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

export const retrieve = (supabaseCVUrl: string, bucket: string) => {
  const { data: publicFilePath } = supabase.storage
    .from(bucket)
    .getPublicUrl(supabaseCVUrl);
  return publicFilePath.publicUrl;
};
