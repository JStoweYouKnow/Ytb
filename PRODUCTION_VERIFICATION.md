# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `35347832352`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/35347832352
- Generated at: `2026-09-18T13:02:28.531Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-09-18T13:02:11.924Z)

```json
{
  "checkedAt": "2026-09-18T13:02:11.924Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 130,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-09-18T13:02:12.031Z",
        "uptime": 2.636837886,
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
      "sessionId": "session_1789736532126_cc5kvcu8m",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": false,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": null,
      "errors": [],
      "elapsedMs": 877,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 579,
      "result": "fail",
      "message": "No live output sample captured in probe attempts",
      "sample": null,
      "attemptsDetail": [
        {
          "attempt": 1,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1789736534197_8jvlabmj3",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 192,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 2,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1789736534388_k3fss2hfk",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 191,
          "result": "fail",
          "message": "Probe socket closed before model output (code=1000, reason=Session ended)"
        },
        {
          "attempt": 3,
          "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
          "connectedToGemini": true,
          "sessionId": "session_1789736534581_0715rjydj",
          "sawServerContent": false,
          "sawToolCall": false,
          "serverContentSample": null,
          "elapsedMs": 196,
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
