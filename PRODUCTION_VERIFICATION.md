# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `28174306222`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/28174306222
- Generated at: `2026-06-25T13:39:59.507Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-25T13:39:43.676Z)

```json
{
  "checkedAt": "2026-06-25T13:39:43.676Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 115,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-25T13:39:43.768Z",
        "uptime": 3.669818816,
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
      "sessionId": "session_1782394783839_341y45qyx",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": true,
      "serverContentSample": {
        "capturedAt": "2026-06-25T13:39:45.222Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Status**\n\nLIVE_OK, I'm confirming system status with a quick, energetic reply to the live verification prompt.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1430,
      "result": "pass",
      "message": "Received live model event from Gemini session"
    },
    "liveOutputProbe": {
      "result": "skipped",
      "message": "Live output sample already captured in main websocket check"
    }
  },
  "result": "pass"
}
```

## Interpretation

- `result: pass` means the production health check and live websocket/Gemini handshake checks passed for that run.
- If the report indicates no model content before close, it still proves production live-path connectivity and multimodal ingress dispatch.
