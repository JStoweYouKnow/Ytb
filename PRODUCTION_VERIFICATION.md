# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27961586879`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27961586879
- Generated at: `2026-06-22T14:51:23.989Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-22T14:50:58.941Z)

```json
{
  "checkedAt": "2026-06-22T14:50:58.941Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 138,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-22T14:50:59.051Z",
        "uptime": 2.998570441,
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
      "sessionId": "session_1782139859145_a5ais9ibn",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-22T14:51:03.572Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've zeroed in on the core directive: delivering the `LIVE_OK` token in a singular sentence. My analysis shows this is a system check requiring a precise, constrained response. No other behavior or analysis will be applied other than producing a ",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1228,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2063,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-22T14:51:03.572Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've zeroed in on the core directive: delivering the `LIVE_OK` token in a singular sentence. My analysis shows this is a system check requiring a precise, constrained response. No other behavior or analysis will be applied other than producing a ",
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
          "sessionId": "session_1782139861570_03l8uyz48",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-22T14:51:03.572Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Response**\n\nI've zeroed in on the core directive: delivering the `LIVE_OK` token in a singular sentence. My analysis shows this is a system check requiring a precise, constrained response. No other behavior or analysis will be applied other than producing a ",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2063,
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
