require('dotenv').config({ path: '/Users/v/Downloads/Ashanti/.env' });
const { GoogleGenAI, Modality } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
    try {
        const session = await ai.live.connect({
            model: 'gemini-3-flash-preview',
            config: { responseModalities: [Modality.AUDIO] },
            callbacks: {
                onopen: () => { console.log("Connected to Live with Gemini 3"); session.close(); },
                onerror: (e) => console.error(e)
            }
        });
    } catch (err) {
        console.error("Live SDK Error details:", err);
    }
}
test();
