# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23247087021`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23247087021
- Generated at: `2026-03-18T13:29:56.138Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-18T13:29:38.968Z)

```json
{
  "checkedAt": "2026-03-18T13:29:38.968Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 154,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-18T13:29:39.093Z",
        "uptime": 4.403161247,
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
      "sessionId": "session_1773840579207_8qjmvp7il",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-18T13:29:43.070Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Live Output**\n\nI've processed the message. My focus is exclusively on delivering the exact response requested: \"LIVE_OK\". No deviation is necessary or intended.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1410,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1337,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-18T13:29:43.070Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Live Output**\n\nI've processed the message. My focus is exclusively on delivering the exact response requested: \"LIVE_OK\". No deviation is necessary or intended.",
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
          "sessionId": "session_1773840581818_gg7cg04f8",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-18T13:29:43.070Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Live Output**\n\nI've processed the message. My focus is exclusively on delivering the exact response requested: \"LIVE_OK\". No deviation is necessary or intended.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1337,
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
