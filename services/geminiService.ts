
import { GoogleGenAI, Type } from '@google/genai';
import { FeedbackAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const feedbackSchema = {
  type: Type.OBJECT,
  properties: {
    sentiment: {
      type: Type.STRING,
      description: 'The overall sentiment of the feedback. Must be one of: positive, negative, neutral.',
      enum: ['positive', 'negative', 'neutral'],
    },
    category: {
      type: Type.STRING,
      description: 'The primary category of the feedback. Must be one of: Bug Report, Feature Request, UI/UX, Praise, Other.',
      enum: ['Bug Report', 'Feature Request', 'UI/UX', 'Praise', 'Other'],
    },
    summary: {
      type: Type.STRING,
      description: 'A brief, one-sentence summary of the user\'s feedback.',
    },
  },
  required: ['sentiment', 'category', 'summary'],
};


export const analyzeFeedback = async (feedbackText: string): Promise<FeedbackAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following user feedback and provide a structured JSON response. Feedback: "${feedbackText}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: feedbackSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    // Basic validation to ensure the response matches the expected structure
    if (
      !parsedJson.sentiment ||
      !parsedJson.category ||
      !parsedJson.summary
    ) {
      throw new Error('Invalid JSON structure from Gemini API');
    }

    return parsedJson as FeedbackAnalysis;
  } catch (error) {
    console.error('Error analyzing feedback with Gemini:', error);
    // In a real app, you might want to log the raw feedback text to a different system
    // and return a default or error state.
    throw new Error('Failed to analyze feedback.');
  }
};
