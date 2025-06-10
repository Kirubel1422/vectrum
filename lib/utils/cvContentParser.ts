import mammoth from "mammoth";
import { pdfToPages } from "pdf-ts";

export const cvContentParser = async (
  cvFileType: string,
  buffer: Buffer
): Promise<string> => {
  if (cvFileType === ".pdf") {
    try {
      let textContent = "";
      const pages = await pdfToPages(buffer);

      pages.forEach((page) => {
        textContent += page.text;
      });

      return textContent
        .replace(/-\n/g, "")
        .replace(/\n/g, " ")
        .replace(/ ?([.,!?;:])/g, "$1")
        .trim();
    } catch (err) {
      console.error("Error processing PDF pages", err);
      throw err;
    }
  } else if (cvFileType === ".docx") {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (err) {
      console.error("DOCX to TXT conversion error", err);
      throw err;
    }
  } else {
    throw new Error(`Unsupported file type: ${cvFileType}`);
  }
};
