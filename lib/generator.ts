"use server";

import mammoth from "mammoth";
import { pdfToPages } from "pdf-ts";
import fs from "fs/promises";

const DOC_PATH = "/opt/Projects/job-aligner/scripts/src/test.pdf";

export const extract = async (cvFileType: string) => {
  if (cvFileType === "pdf") {
    try {
      let textContent = "";
      const pdfBuffer = await fs.readFile(DOC_PATH);
      const pages = await pdfToPages(pdfBuffer);

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
  } else if (cvFileType === "docx") {
    try {
      const result = await mammoth.extractRawText({ path: DOC_PATH });
      return result.value;
    } catch (err) {
      console.error("DOCX to TXT conversion error", err);
      throw err;
    }
  } else {
    throw new Error(`Unsupported file type: ${cvFileType}`);
  }
};

import { GoogleGenAI, Part } from "@google/genai";
import PROMPTS from "@/lib/prompts";

// const DEFAULT_MODEL = "google/gemini-2.5-flash-preview-05-20";
const DEFAULT_MODEL = "gemini-1.5-flash-latest"; // 6
// const DEFAULT_MODEL = "gemini-2.0-flash-001"; // 5
// const DEFAULT_MODEL = "gemini-2.0-flash-lite-001"; // 7 - GREAT PF
// const DEFAULT_MODEL = "gemini-2.0-flash"; // 10 - Best

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const googleGenAI = async (message: Part[], model = DEFAULT_MODEL) => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: PROMPTS.SYSTEM_PROMPT,
        temperature: 0.05,
        topP: 0.5,
        candidateCount: 1,
      },
    });

    if (!response.candidates || response.candidates.length === 0)
      throw Error("Invalid response from AI");

    const content =
      response.candidates && response.candidates[0].content?.parts
        ? response.candidates[0].content.parts[0].text
        : null;

    if (!content) return "";
    // Strip fences ```json ```
    if (content.startsWith("```json") && content.endsWith("```")) {
      return JSON.parse(content.slice(8, -3).trim());
    } else {
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error during generate content", err);
  }
};
