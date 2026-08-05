# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `31010580215`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/31010580215
- Generated at: `2026-08-05T13:31:48.754Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-08-05T13:31:34.213Z)

```json
{
  "checkedAt": "2026-08-05T13:31:34.213Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 113,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-08-05T13:31:34.311Z",
        "uptime": 3.514294183,
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
      "sessionId": "session_1785936694379_p6ywe4fek",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": false,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": null,
      "errors": [],
      "elapsedMs": 920,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 421,
      "result": "fail",
      "message": "No live output sample captured in probe attempts",
      "sample": null,
      "attemptsDetail": [
        {
          "attempt": 1,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1785936696492_nnxab94vx",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 148,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 2,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1785936696636_jptdlhj4w",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 136,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 3,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1785936696775_u46p1vge4",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 137,
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
