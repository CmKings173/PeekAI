import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, CategoryType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeText = async (text: string, context: string): Promise<AIAnalysisResult> => {
  try {
    const prompt = `
      Analyze the following term or phrase: "${text}".
      
      Context of where this term appears (use this to disambiguate if needed):
      "${context}"

      Provide a concise, neutral, and informative summary suitable for a quick-reference card.
      Identify the category of the term.
      Provide 2-3 short bullet points for the summary.
      Provide up to 3 relevant tags.
      Provide 1-2 external reference links (like Wikipedia) if applicable.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful AI assistant powering a browser extension. Your goal is to explain highlighted terms quickly and clearly. Keep summaries under 60 words total.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The corrected or canonical name of the term." },
            category: { 
              type: Type.STRING, 
              enum: [
                CategoryType.PERSON, 
                CategoryType.CONCEPT, 
                CategoryType.LOCATION, 
                CategoryType.ORGANIZATION, 
                CategoryType.EVENT,
                CategoryType.TECHNOLOGY,
                CategoryType.GENERAL
              ] 
            },
            summary: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "2-3 short, punchy bullet points explaining the term."
            },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Max 3 relevant meta tags."
            },
            externalLinks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING }
                }
              }
            }
          },
          required: ["title", "category", "summary", "tags", "externalLinks"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }
    
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Error analyzing text:", error);
    // Fallback in case of error
    return {
      title: text,
      category: CategoryType.GENERAL,
      summary: ["Could not analyze the text at this time. Please try again."],
      tags: ["Error"],
      externalLinks: []
    };
  }
};
