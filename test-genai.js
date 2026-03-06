require('dotenv').config({ path: '/Users/v/Downloads/Ashanti/.env' });
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: 'Testing text chat with Gemini 3' }] }],
      config: {
        systemInstruction: 'You are a hypeman.',
        maxOutputTokens: 500,
        temperature: 0.9,
      }
    });
    console.log("Success:", result.text);
  } catch (err) {
    console.error("SDK Error details:", err);
  }
}
test();
