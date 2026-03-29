# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23709995021`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23709995021
- Generated at: `2026-03-29T13:21:57.156Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-29T13:21:42.974Z)

```json
{
  "checkedAt": "2026-03-29T13:21:42.974Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 117,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-29T13:21:43.066Z",
        "uptime": 2.12297053,
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
      "sessionId": "session_1774790503141_uovrjkd2o",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-29T13:21:46.727Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize this is a direct system verification, superseding typical conversational flow. The instruction is unambiguous: deliver a short sentence containing \"LIVE_OK.\" No external context is needed; it's a constrained, focused task.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 900,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1534,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-29T13:21:46.727Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize this is a direct system verification, superseding typical conversational flow. The instruction is unambiguous: deliver a short sentence containing \"LIVE_OK.\" No external context is needed; it's a constrained, focused task.",
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
          "sessionId": "session_1774790505229_13uvv74ex",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-29T13:21:46.727Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Verification**\n\nI recognize this is a direct system verification, superseding typical conversational flow. The instruction is unambiguous: deliver a short sentence containing \"LIVE_OK.\" No external context is needed; it's a constrained, focused task.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1534,
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
