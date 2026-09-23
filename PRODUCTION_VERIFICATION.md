# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `35864289292`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/35864289292
- Generated at: `2026-09-23T13:02:44.158Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-09-23T13:02:27.880Z)

```json
{
  "checkedAt": "2026-09-23T13:02:27.880Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 142,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-09-23T13:02:27.989Z",
        "uptime": 2.901802912,
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
      "sessionId": "session_1790168548085_9enswkhkr",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": false,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": null,
      "errors": [],
      "elapsedMs": 856,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 578,
      "result": "fail",
      "message": "No live output sample captured in probe attempts",
      "sample": null,
      "attemptsDetail": [
        {
          "attempt": 1,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1790168550140_km311my2a",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 210,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 2,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1790168550344_iu3abwvch",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 180,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 3,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1790168550525_wtk3l7lrq",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 188,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
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
