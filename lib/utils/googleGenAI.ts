"use server";
import { GoogleGenAI, Part } from "@google/genai";
import PROMPTS from "@/lib/constants/prompts";

// const DEFAULT_MODEL = "google/gemini-2.5-flash-preview-05-20";
// const DEFAULT_MODEL = "gemini-1.5-flash-latest"; // 6
// const DEFAULT_MODEL = "gemini-2.0-flash-001"; // 5
// const DEFAULT_MODEL = "gemini-2.0-flash-lite-001"; // 7 - GREAT PF
const DEFAULT_MODEL = "gemini-2.0-flash"; // 10 - Best

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const googleGenAI = async (
  message: string,
  model = DEFAULT_MODEL
): Promise<string | undefined> => {
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
      return content.slice(8, -3).trim();
    }
    return content;
  } catch (err) {
    console.error("Error during generate content", err);
  }
};

// Open Router Logic
// type TOpenRouterMessage = {
//   role: "user" | "system";
//   content: string;
// };
// const DEFAULT_OPENROUTER_MODEL = "google/gemini-2.5-pro-preview";
// export const openRouter = async (
//   message: Record<string, string>,
//   model: string = DEFAULT_OPENROUTER_MODEL
// ) => {
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model,
//         messages: [
//           {
//             role: "user",
//             content: JSON.stringify(message),
//           },
//           {
//             role: "system",
//             content: PROMPTS.SYSTEM_PROMPT,
//           },
//         ] as TOpenRouterMessage[],
//       }),
//     }
//   );

//   if (response.ok) {
//     return await response.json();
//   }
// };
