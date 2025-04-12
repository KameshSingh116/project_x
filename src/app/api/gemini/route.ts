import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined')
}
const genAI = new GoogleGenerativeAI(apiKey as string)

const getPromptForType = (query: string, type: string) => {
  const prompts = {
    theory: `
      Provide educational theory and formulas about: "${query}"
      Return in this exact JSON format:
      {
        "theory": ["detailed point 1", "detailed point 2", ...],
        "formulas": ["formula 1 with explanation", "formula 2 with explanation", ...]
      Provide video links strictly from the google search result or Search (not from other websites): "${query}"
      Ensure each array has at least 3-5 detailed items. If no information is available, include "NO DATA" in the array.
    `,
    media: `
      Provide video links strictly from the google search result or Search(not from other website): "${query}"
      Return in this exact JSON format:
      {
        "relatedImageLinks": [just image keyword], // Keywords for related images to search for
        "relatedVideoLinks": ["youtube_url1", "youtube_url2", ...]
      }
      For images, provide single topic to search for.
      For videos, provide actual YouTube Search video URLs.
      Include 3-5 links for each. If none available, include "NO DATA" in the array.
    `,
    related: `
      Provide related topics, links, and additional reading about: "${query}"
      Return in this exact JSON format:
      {
        "relatedTopics": ["topic1 with brief explanation", "topic2 with brief explanation", ...],
        "relatedLinks": ["educational_url1", "educational_url2", ...],
        "readAlso": ["related concept 1", "related concept 2", ...]
      }
      Include 3-5 items for each array. If none available, include "NO DATA" in the array.
    `,
    summary: `
      Provide a comprehensive summary about: "${query}"
      Return in this exact JSON format:
      {
        "summary": ["main point 1", "main point 2", "main point 3", ...]
      }
      Include 3-5 detailed summary points. If no information available, include "NO DATA" in the array.
    `
  }
  
  return prompts[type as keyof typeof prompts] ?? prompts.theory
}

// Removed listAvailableModels function as listModels does not exist on GoogleGenerativeAI

async function retryWithBackoff(operation: () => Promise<any>, maxRetries: number = 3): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const baseDelay = Math.min(1000 * Math.pow(2, i), 4000); // Max 4 second delay
      const jitter = Math.random() * 1000; // Add up to 1 second of random jitter
      const delay = baseDelay + jitter;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const query = body.query;
  const requestType = body.type || 'theory';
  
  let model;
  try {
    model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Update this with an available model
  } catch (error) {
    console.error('Error getting generative model:', error);
  }
  const prompt = getPromptForType(query, requestType);
  
  try {
    if (!model) {
      throw new Error('Model is undefined');
    }
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    const parsed = JSON.parse(text);
    if (requestType === 'media') {
      parsed.relatedVideoLinks = parsed.relatedVideoLinks.filter((url: string) => url.includes('youtube.com'));
    }
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error generating content:', error);
    // Return a valid fallback response
    return NextResponse.json(generateFallbackResponse(requestType));
  }
}

function generateFallbackResponse(type: string) {
  const fallback: Record<string, any> = {
    theory: { theory: ["NO DATA"], formulas: ["NO DATA"] },
    summary: { summary: ["NO DATA"] },
    related: { relatedTopics: ["NO DATA"], relatedLinks: ["NO DATA"], readAlso: ["NO DATA"] },
    media: { relatedImageLinks: ["NO DATA"], relatedVideoLinks: ["NO DATA"] }
  };
  return fallback[type] || { theory: ["NO DATA"], formulas: ["NO DATA"] };
}