# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26362571434`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26362571434
- Generated at: `2026-05-24T13:29:24.485Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-24T13:29:09.505Z)

```json
{
  "checkedAt": "2026-05-24T13:29:09.505Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 121,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-24T13:29:09.603Z",
        "uptime": 2.518082803,
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
      "sessionId": "session_1779629349752_vj6m5zhq1",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-24T13:29:14.561Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Output Directly**\n\nI've zeroed in on the core instruction: \"LIVE_OK\". My focus is on producing the exact response mandated, while also verifying that the output adheres to the constraints.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 981,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2755,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-24T13:29:14.561Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Output Directly**\n\nI've zeroed in on the core instruction: \"LIVE_OK\". My focus is on producing the exact response mandated, while also verifying that the output adheres to the constraints.",
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
          "sessionId": "session_1779629351852_xzjnizp42",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-24T13:29:14.561Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Output Directly**\n\nI've zeroed in on the core instruction: \"LIVE_OK\". My focus is on producing the exact response mandated, while also verifying that the output adheres to the constraints.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2754,
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
