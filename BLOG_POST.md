# Building "YTB": A Real-Time AI Wellness Companion

> *This post was created for the purposes of entering the [Gemini Live Agent Challenge](https://geminiliveagentchallenge.devpost.com/) hackathon. #GeminiLiveAgentChallenge*

In today's fast-paced world, it's easy to get overwhelmed. We all need a personal hypeman occasionally—someone to tell us we're doing great, help us focus, or guide us through a moment of panic. This inspired the creation of **"YTB,"** a real-time, multimodal AI wellness companion built using Google's new **Gemini 2.0 Flash Live API**.

"YTB" isn't just a chatbot; it's a dynamic presence that listens to you, sees you (if you choose to share your camera), and reacts in real-time. Whether you need an energetic pep talk or a calming meditation, the app adapts its tone and environment to support your current state of mind.

## The Core Concept: More Than Just Chitchat

The goal was to move beyond traditional text-based or turn-based voice exchanges. I wanted an agent that felt *present*. By leveraging the Gemini Live API through a WebSocket connection, I established a bidirectional audio stream. You speak naturally, and Gemini responds instantly. If you interrupt, it stops talking and listens—just like a real conversation.

But what makes "YTB" unique is its ability to affect your environment through **Tool Calling** (Function Calling).

## Powering Wellness with Agentic Actions

The app provides Gemini with a suite of "tools" it can use autonomously during the conversation. It doesn't just *tell* you to relax; it actively *helps* you relax.

1.  **AI-Triggered Binaural Beats (`setBinauralPreset`)**: If Gemini detects you are stressed, it can seamlessly activate an audio engine in the browser that synthesizes a 6Hz Theta binaural beat to promote relaxation. If you mention needing to study, it might switch to a 14Hz Alpha/Beta beat for focus.
2.  **Guided Breathing (`openBreathingExercise`)**: If you're experiencing anxiety, Gemini can open a visual breathing interface on your screen (like box breathing or the 4-7-8 method) while guiding you through it vocally.
3.  **Mood & Journal Logging (`logMood`, `saveJournalEntry`)**: The AI acts as your scribe. If you have an epiphany during a chat, Gemini can save it to your journal in Cloud Firestore.

## The Technical Architecture

To make this happen, I built a stack that balances immediate frontend responsiveness with secure backend infrastructure.

*   **Frontend**: Built with **Next.js 16** and **React 19**. It handles the microphone capture (16kHz PCM), decodes the AI's audio response (24kHz PCM), and synthesizes the binaural beats using the native Web Audio API. I eschewed heavy component libraries in favor of a sleek, custom CSS design system optimized for dark mode.
*   **The Bridge**: Because the Gemini Live API requires a secure connection, I built a reliable **Express 5 WebSocket proxy** running on **Google Cloud Run**. The browser streams audio to this proxy, which injects recent conversational context before forwarding the stream to Gemini via the `@google/genai` SDK.
*   **Context Injection**: To ensure the AI doesn't have "amnesia" every time you tap the mic, the server loads your recent chat history from Firestore and sends it to Gemini right as the WebSocket connection opens.
*   **Infrastructure as Code**: The deployment is fully containerized with Docker, automated via **Cloud Build**, and I integrated **Terraform** to codify the infrastructure, making the environment reproducible.

## Challenges and Breakthroughs

One of the biggest technical hurdles was managing the audio pipeline. Converting Float32 Web Audio context into Int16 PCM, base64 encoding it for the WebSocket, and doing the reverse for playback in real-time required careful buffering to avoid audio artifacts.

Another fascinating challenge was the tool-calling loop. When Gemini decides to trigger a binaural beat, it pauses its audio output to invoke the tool. To prevent awkward silences, the server immediately automatically responds to the tool call confirming success, allowing Gemini to seamlessly resume its sentence while the browser concurrently ramps up the audio frequencies.

## Looking Forward

Building "YTB" showcased the incredible potential of multimodal, real-time AI. The Gemini Live API makes it possible to create applications that don't just process information, but actively participate in human well-being. By combining voice, vision, and environmental control, we are moving closer to technology that truly understands and supports us.

---

*You can check out the source code for "YTB" on GitHub.*
