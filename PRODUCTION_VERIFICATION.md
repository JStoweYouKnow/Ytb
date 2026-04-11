# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24283367646`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24283367646
- Generated at: `2026-04-11T13:23:09.930Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-11T13:22:53.612Z)

```json
{
  "checkedAt": "2026-04-11T13:22:53.612Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 138,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-11T13:22:53.723Z",
        "uptime": 3.596347367,
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
      "sessionId": "session_1775913773811_005pfj0ce",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-11T13:22:57.293Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing Instructions for Output**\n\nI've zeroed in on the explicit nature of the user's request. My focus is now on immediate and direct compliance; the instruction's system check is the primary consideration. Responding in a single sentence with \"LIVE_OK\" is the sole required",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 845,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1495,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-11T13:22:57.293Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing Instructions for Output**\n\nI've zeroed in on the explicit nature of the user's request. My focus is now on immediate and direct compliance; the instruction's system check is the primary consideration. Responding in a single sentence with \"LIVE_OK\" is the sole required",
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
          "sessionId": "session_1775913775849_3m832rglx",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-11T13:22:57.293Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Analyzing Instructions for Output**\n\nI've zeroed in on the explicit nature of the user's request. My focus is now on immediate and direct compliance; the instruction's system check is the primary consideration. Responding in a single sentence with \"LIVE_OK\" is the sole required",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1495,
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
