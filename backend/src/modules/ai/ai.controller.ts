import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(500).json({ success: false, message: 'API Key missing' });

    const genAI = new GoogleGenerativeAI(apiKey);

  
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return res.status(200).json({
      success: true,
      reply: response.text(),
    });

  } catch (error: any) {
    console.error('--- Gemini API Error ---');
    console.error(error.message);
    
    // Check for the 429 quota error
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "The AI is taking a short break (Rate Limit). Please try again in 30 seconds.",
      });
    }

    return res.status(500).json({ success: false, message: "AI Connection Error" });
  }
};