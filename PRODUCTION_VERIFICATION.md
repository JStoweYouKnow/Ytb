# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `29419401362`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/29419401362
- Generated at: `2026-07-15T13:30:23.923Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-07-15T13:30:08.371Z)

```json
{
  "checkedAt": "2026-07-15T13:30:08.371Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 106,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-07-15T13:30:08.467Z",
        "uptime": 3.999417716,
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
      "sessionId": "session_1784122208534_ikqb1u5a9",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": false,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": null,
      "errors": [],
      "elapsedMs": 1101,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 416,
      "result": "fail",
      "message": "No live output sample captured in probe attempts",
      "sample": null,
      "attemptsDetail": [
        {
          "attempt": 1,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1784122210828_qm57igfyb",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 145,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 2,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1784122210974_jwcflpdg2",
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
          "sessionId": "session_1784122211104_k97h5f618",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 134,
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
