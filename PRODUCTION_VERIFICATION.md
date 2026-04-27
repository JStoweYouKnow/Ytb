# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24997976244`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24997976244
- Generated at: `2026-04-27T13:31:28.013Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-27T13:31:09.212Z)

```json
{
  "checkedAt": "2026-04-27T13:31:09.212Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 111,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-27T13:31:09.301Z",
        "uptime": 2.024343018,
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
      "sessionId": "session_1777296669364_nnb8dz67z",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-27T13:31:13.233Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Response**\n\nI've processed the system verification message and the simple instruction to respond with \"LIVE_OK\". I'm ready to provide the designated token as output; no tools are needed.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 710,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2001,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-27T13:31:13.233Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Response**\n\nI've processed the system verification message and the simple instruction to respond with \"LIVE_OK\". I'm ready to provide the designated token as output; no tools are needed.",
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
          "sessionId": "session_1777296671273_gyrhf1x5a",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-27T13:31:13.233Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Response**\n\nI've processed the system verification message and the simple instruction to respond with \"LIVE_OK\". I'm ready to provide the designated token as output; no tools are needed.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1999,
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
