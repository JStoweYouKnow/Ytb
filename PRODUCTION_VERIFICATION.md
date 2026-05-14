# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25862851906`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25862851906
- Generated at: `2026-05-14T13:32:03.194Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-14T13:31:47.590Z)

```json
{
  "checkedAt": "2026-05-14T13:31:47.590Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 107,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-14T13:31:47.676Z",
        "uptime": 2.434592479,
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
      "sessionId": "session_1778765507737_0bboa3hep",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-14T13:31:51.460Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI understand the direct instruction: provide a single sentence containing the token `LIVE_OK`. My task is a simple verification, so I will ensure strict adherence to this format. No other actions or tools are required.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 865,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1697,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-14T13:31:51.460Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI understand the direct instruction: provide a single sentence containing the token `LIVE_OK`. My task is a simple verification, so I will ensure strict adherence to this format. No other actions or tools are required.",
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
          "sessionId": "session_1778765509824_a162p5tbi",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-14T13:31:51.460Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Verification**\n\nI understand the direct instruction: provide a single sentence containing the token `LIVE_OK`. My task is a simple verification, so I will ensure strict adherence to this format. No other actions or tools are required.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1697,
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
