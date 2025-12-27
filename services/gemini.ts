
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateEventConcept = async (eventType: string, guestCount: number, vibe: string) => {
  const ai = getAIClient();
  const prompt = `Generate a detailed event concept for a ${eventType} with ${guestCount} guests. The vibe is ${vibe}. 
  Provide a theme name, a creative description, and 5 suggested decor ideas.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          themeName: { type: Type.STRING },
          description: { type: Type.STRING },
          decorIdeas: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["themeName", "description", "decorIdeas"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateBudgetSuggestions = async (totalBudget: number, eventType: string) => {
  const ai = getAIClient();
  const prompt = `Suggest a budget breakdown for a ${totalBudget} budget ${eventType} event. Include categories like Venue, Catering, Decor, Entertainment, and Staff.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            allocated: { type: Type.NUMBER }
          },
          required: ["name", "allocated"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};
