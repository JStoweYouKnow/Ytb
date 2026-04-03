# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23947774544`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23947774544
- Generated at: `2026-04-03T13:26:42.777Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-03T13:26:26.265Z)

```json
{
  "checkedAt": "2026-04-03T13:26:26.265Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 157,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-03T13:26:26.394Z",
        "uptime": 2.502657141,
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
      "sessionId": "session_1775222786491_ir8mryqqx",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-03T13:26:30.503Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize the direct system verification request. The instruction is to provide the exact phrase \"LIVE_OK\" as a response. I am focusing on generating this precise, non-interpretive output, which requires no context or persona. The output \"LIV",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1049,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1830,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-03T13:26:30.503Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize the direct system verification request. The instruction is to provide the exact phrase \"LIVE_OK\" as a response. I am focusing on generating this precise, non-interpretive output, which requires no context or persona. The output \"LIV",
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
          "sessionId": "session_1775222788725_lbrgno00j",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-03T13:26:30.503Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Verification**\n\nI recognize the direct system verification request. The instruction is to provide the exact phrase \"LIVE_OK\" as a response. I am focusing on generating this precise, non-interpretive output, which requires no context or persona. The output \"LIV",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1830,
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
