# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24513038425`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24513038425
- Generated at: `2026-04-16T13:31:24.340Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-16T13:30:49.926Z)

```json
{
  "checkedAt": "2026-04-16T13:30:49.926Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 150,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-16T13:30:50.044Z",
        "uptime": 3.02303085,
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
      "sessionId": "session_1776346250133_zowyuwi70",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-16T13:30:54.240Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing Directive Specifics**\n\nI've zeroed in on the core instruction: \"LIVE_OK\". It's a highly targeted command, deviating significantly from typical dialogue. My task is now simple, focusing solely on the required token and presentation. No external elements are needed.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1155,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1807,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-16T13:30:54.240Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing Directive Specifics**\n\nI've zeroed in on the core instruction: \"LIVE_OK\". It's a highly targeted command, deviating significantly from typical dialogue. My task is now simple, focusing solely on the required token and presentation. No external elements are needed.",
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
          "sessionId": "session_1776346252477_q8rn3h5mz",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-16T13:30:54.240Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Analyzing Directive Specifics**\n\nI've zeroed in on the core instruction: \"LIVE_OK\". It's a highly targeted command, deviating significantly from typical dialogue. My task is now simple, focusing solely on the required token and presentation. No external elements are needed.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1807,
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
