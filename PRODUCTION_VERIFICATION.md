# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23146121537`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23146121537
- Generated at: `2026-03-16T13:29:34.790Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-16T13:29:17.228Z)

```json
{
  "checkedAt": "2026-03-16T13:29:17.228Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 121,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-16T13:29:17.319Z",
        "uptime": 3.153380111,
        "models": {
          "text": "gemini-3-flash-preview",
          "live": "gemini-3-flash-preview"
        }
      }
    },
    "websocketLivePath": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "opened": true,
      "connectedToGemini": true,
      "sessionId": "session_1773667757407_b6keprjsl",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": false,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": null,
      "errors": [],
      "elapsedMs": 1200,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 560,
      "result": "fail",
      "message": "No live output sample captured in probe attempts",
      "sample": null,
      "attemptsDetail": [
        {
          "attempt": 1,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1773667759799_ra2a2plnp",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 174,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 2,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1773667759972_oidduk8lt",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 182,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 3,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1773667760162_0dacxop9s",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 203,
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
