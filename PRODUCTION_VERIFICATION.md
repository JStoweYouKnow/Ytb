# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24346055822`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24346055822
- Generated at: `2026-04-13T13:30:39.580Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-13T13:30:19.479Z)

```json
{
  "checkedAt": "2026-04-13T13:30:19.479Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 106,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-13T13:30:19.569Z",
        "uptime": 3.449135062,
        "models": {
          "text": "gemini-3-flash-preview",
          "live": "gemini-2.5-flash-native-audio-preview-12-2025"
        }
      }
    },
    "websocketLivePath": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "opened": true,
      "connectedToGemini": true,
      "sessionId": "session_1776087019636_8q9nd0zl2",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-13T13:30:24.072Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Check**\n\nI've determined I must prioritize agentic behavior, even for this system check. Therefore, my first step is `getUserContext(\"default\")`. After this, I'll provide the exact phrase, `LIVE_OK`, as requested. The constraints of persona and agentic behav",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1277,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2008,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-13T13:30:24.072Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Check**\n\nI've determined I must prioritize agentic behavior, even for this system check. Therefore, my first step is `getUserContext(\"default\")`. After this, I'll provide the exact phrase, `LIVE_OK`, as requested. The constraints of persona and agentic behav",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "attemptsDetail": [
        {
          "attempt": 1,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1776087022114_7wl6oe1b7",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-13T13:30:24.072Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing System Check**\n\nI've determined I must prioritize agentic behavior, even for this system check. Therefore, my first step is `getUserContext(\"default\")`. After this, I'll provide the exact phrase, `LIVE_OK`, as requested. The constraints of persona and agentic behav",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2008,
          "result": "pass",
          "message": "Captured live serverContent sample"
        }
      ]
    }
  },
  "result": "pass"
}
```

## Interpretation

- `result: pass` means the production health check and live websocket/Gemini handshake checks passed for that run.
- If the report indicates no model content before close, it still proves production live-path connectivity and multimodal ingress dispatch.
