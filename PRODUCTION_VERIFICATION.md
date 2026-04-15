# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24457327985`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24457327985
- Generated at: `2026-04-15T13:30:44.217Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-15T13:30:26.525Z)

```json
{
  "checkedAt": "2026-04-15T13:30:26.525Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 124,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-15T13:30:26.628Z",
        "uptime": 3.123744387,
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
      "sessionId": "session_1776259826742_spwkh94oh",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-15T13:30:30.950Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI have received a very specific command that demands immediate and precise execution. The instruction overrides all other considerations, requiring the absolute minimum output. My focus is entirely on the token LIVE_OK as the sole and complete re",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1485,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1614,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-15T13:30:30.950Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI have received a very specific command that demands immediate and precise execution. The instruction overrides all other considerations, requiring the absolute minimum output. My focus is entirely on the token LIVE_OK as the sole and complete re",
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
          "sessionId": "session_1776259829440_f9bkkbp5c",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-15T13:30:30.950Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Response**\n\nI have received a very specific command that demands immediate and precise execution. The instruction overrides all other considerations, requiring the absolute minimum output. My focus is entirely on the token LIVE_OK as the sole and complete re",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1614,
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
