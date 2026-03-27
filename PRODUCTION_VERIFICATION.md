# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23648453066`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23648453066
- Generated at: `2026-03-27T13:27:59.537Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-27T13:27:42.222Z)

```json
{
  "checkedAt": "2026-03-27T13:27:42.222Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 118,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-27T13:27:42.319Z",
        "uptime": 2.658623453,
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
      "sessionId": "session_1774618062390_143xmhaw6",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-27T13:27:46.021Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing System Commands**\n\nI've zeroed in on the core request: a specific token response, \"LIVE_OK\". This is clearly a test or verification prompt. My focus is on the instruction to formulate the exact answer, \"LIVE_OK\", to ensure correct execution.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 919,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1559,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-27T13:27:46.021Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing System Commands**\n\nI've zeroed in on the core request: a specific token response, \"LIVE_OK\". This is clearly a test or verification prompt. My focus is on the instruction to formulate the exact answer, \"LIVE_OK\", to ensure correct execution.",
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
          "sessionId": "session_1774618064516_57pz29gjh",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-27T13:27:46.021Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Analyzing System Commands**\n\nI've zeroed in on the core request: a specific token response, \"LIVE_OK\". This is clearly a test or verification prompt. My focus is on the instruction to formulate the exact answer, \"LIVE_OK\", to ensure correct execution.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1559,
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
