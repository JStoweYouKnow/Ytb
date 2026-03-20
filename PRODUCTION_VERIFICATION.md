# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23344804413`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23344804413
- Generated at: `2026-03-20T13:24:43.894Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-20T13:24:26.373Z)

```json
{
  "checkedAt": "2026-03-20T13:24:26.373Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 149,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-20T13:24:26.498Z",
        "uptime": 2.812930989,
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
      "sessionId": "session_1774013066592_rqyut6vt5",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-20T13:24:30.375Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Immediate Output**\n\nI've registered the user's explicit request for a direct output verification. The instruction overrides all prior persona constraints and interaction goals. My sole task is to generate the token \"LIVE_OK\" and nothing else.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1073,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1578,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-20T13:24:30.375Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Immediate Output**\n\nI've registered the user's explicit request for a direct output verification. The instruction overrides all prior persona constraints and interaction goals. My sole task is to generate the token \"LIVE_OK\" and nothing else.",
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
          "sessionId": "session_1774013068871_3i4zz51df",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-20T13:24:30.375Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Immediate Output**\n\nI've registered the user's explicit request for a direct output verification. The instruction overrides all prior persona constraints and interaction goals. My sole task is to generate the token \"LIVE_OK\" and nothing else.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1578,
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
