# Gemini Live Agent Challenge — Judge's Evaluation Guide

> **YTB** (You The Best) — Live Agent category submission

This document helps judges quickly verify the submission against hackathon criteria and test the key features.

---

## Quick Links

| Resource | URL |
|----------|-----|
| **Production Demo** | https://ashanti-6exqtj2u2q-uc.a.run.app |
| **Health Check** | https://ashanti-6exqtj2u2q-uc.a.run.app/health |
| **Live Runtime Smoke Test** | `npm run verify:production` |
| **Saved Runtime Report** | [PRODUCTION_VERIFICATION.md](PRODUCTION_VERIFICATION.md) |
| **CI Verification Workflow** | `.github/workflows/production-verification.yml` (manual + daily run, uploads JSON artifact) |
| **CI Auto-Update Report** | `.github/workflows/update-production-verification-report.yml` (writes latest successful artifact into `PRODUCTION_VERIFICATION.md`) |
| **Architecture Diagram** | See [ARCHITECTURE.md](ARCHITECTURE.md) (Mermaid diagrams render on GitHub) |
| **GCP Proof** | [README.md § Proof of Google Cloud Deployment](README.md#proof-of-google-cloud-deployment) |

---

## Runtime Verification (1 minute)

Run this in the repo root:

```bash
npm run verify:production
```

This command validates the real production live path in one pass:
- health endpoint is reachable;
- websocket upgrades at `/ws`;
- Gemini live session is established;
- multimodal input (image + audio + text) is accepted; and
- the script reports whether a live model event was observed before the session closed.

If emitted, the JSON includes `serverContentSample` with a compact preview of returned text/audio/tool metadata.
If not emitted in the main check, the verifier runs `liveOutputProbe` with 3 text-only retries and records attempt-level evidence.

If the command exits `0`, the live infrastructure path is functioning end-to-end.

---

## Mapping to Judging Criteria

### Innovation & Multimodal User Experience (40%)

| Criterion | Evidence |
|-----------|----------|
| **Beyond text paradigm** | Voice-first design; mic button is primary CTA. Text chat is secondary. |
| **Natural, immersive interaction** | Real-time bidirectional audio; user speaks, Gemini responds with voice. No turn-taking delays. |
| **See, Hear, Speak** | ✅ **Hear**: 16kHz mic → Gemini. **Speak**: 24kHz PCM audio out. **See**: Optional 640×480 camera @ 1fps → emotion detection. |
| **Barge-in / Interruption** | `data.serverContent?.interrupted` → `stopPlayback()` in [gemini-live-client.ts](app/lib/gemini-live-client.ts). User can interrupt mid-response; Gemini stops immediately. |
| **Distinct persona** | "YTB" hypeman with 3 hype levels (chill / normal / maximum); warm, non-judgmental coach persona. |
| **Fluidity** | Live API; no artificial turn boundaries. Context injection (recent chat) at session start for continuity. |

**What to try:** Tap "Begin Session" → "Begin Session" (or "Try text chat" → go to chat → tap mic). Speak naturally; try interrupting mid-response. Enable camera for emotion cues.

---

### Technical Implementation & Agent Architecture (30%)

| Criterion | Evidence |
|-----------|----------|
| **Google GenAI SDK** | `@google/genai` via `ai.live.connect()` in [server.js](server.js). |
| **Backend on Google Cloud** | Cloud Run (containerized Express + WebSocket). See [deploy.sh](deploy.sh), [Dockerfile](Dockerfile). |
| **System design** | WebSocket proxy pattern; conversation context injection; 14 function tools; graceful Firestore fallback. |
| **Error handling** | Rate limiting (20 req/min); connection error banner; WebSocket auto-reconnect (5 retries, exponential backoff); error boundaries. |
| **Grounding** | Google Search tool for real-time wellness info; grounding sources surfaced in UI. |
| **Robustness** | Crisis detection (988 prompt); safety boundaries in system prompt; no medical/therapy claims. |

**What to try:** Check `/health` for liveness. Review [server.js](server.js) (lines 1–100) for SDK usage, [lib/firestore.js](lib/firestore.js) for Firestore.

---

### Demo & Presentation (30%)

| Criterion | Evidence |
|-----------|----------|
| **Problem + Solution** | Problem: People need emotional support without a therapist. Solution: Accessible AI wellness companion with voice, vision, and proactive tools. |
| **Architecture diagram** | [ARCHITECTURE.md](ARCHITECTURE.md) — Mermaid diagrams (render on GitHub). README includes system overview. |
| **Cloud deployment proof** | README table links to code; health endpoint at `/health`. |
| **Live software (not mockups)** | Production URL serves the real app; judges can test live voice + vision. |

---

## Optional Bonus Contributions

| Bonus | Status |
|-------|--------|
| Blog/content | [BLOG_POST.md](BLOG_POST.md) — "#GeminiLiveAgentChallenge" |
| Automated deployment | [deploy.sh](deploy.sh), [cloudbuild.yaml](cloudbuild.yaml), [terraform/](terraform/) |
| GDG membership | Declared in README |

---

## Submission Requirements Checklist

- [x] Project built with Gemini Live API
- [x] Uses Google GenAI SDK (`@google/genai`)
- [x] Backend hosted on Google Cloud (Cloud Run)
- [x] At least one GCP service (Cloud Run, Firestore, Secret Manager)
- [x] Text description (README)
- [x] Public code repository
- [x] Spin-up instructions (README § Setup)
- [x] Proof of GCP deployment (README § Proof)
- [x] Architecture diagram (ARCHITECTURE.md)
- [x] Demo video (submitted on Devpost)
- [x] English language support

---

## Suggested Test Flow (2–3 min)

1. **Landing**: Visit production URL. Confirm features list and "Begin Session."
2. **Text chat**: Click "Try text chat" → pick a starter pill → confirm Gemini-powered reply.
3. **Live voice**: Tap mic → allow microphone → speak (e.g., "I need a pep talk") → confirm voice response.
4. **Interruption**: Start a question, let Gemini reply, speak again mid-response → confirm it stops.
5. **Vision (optional)**: In live mode, tap camera icon → allow camera → confirm "Reading your expressions" pill.
6. **Tools**: Say "I'm stressed" → expect binaural/relax or breathing suggestion; say "help me focus" → expect focus preset.

---

*Thank you for judging. Questions? See README.md or open an issue.*
