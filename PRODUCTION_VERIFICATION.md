# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25216042294`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25216042294
- Generated at: `2026-05-01T13:29:14.720Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-01T13:28:49.564Z)

```json
{
  "checkedAt": "2026-05-01T13:28:49.564Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 117,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-01T13:28:49.667Z",
        "uptime": 2.46000379,
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
      "sessionId": "session_1777642129724_yfta6x6w6",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-01T13:28:55.998Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Integrity**\n\nI've processed the verification prompt and its constraints. My focus is now on ensuring a strictly formatted response. I need to output \"LIVE_OK\" and only \"LIVE_OK\". There's no room for extraneous information or deviation from this single-token ou",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 849,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 4267,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-01T13:28:55.998Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Integrity**\n\nI've processed the verification prompt and its constraints. My focus is now on ensuring a strictly formatted response. I need to output \"LIVE_OK\" and only \"LIVE_OK\". There's no room for extraneous information or deviation from this single-token ou",
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
          "sessionId": "session_1777642131767_8vin9lxys",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-01T13:28:55.998Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Integrity**\n\nI've processed the verification prompt and its constraints. My focus is now on ensuring a strictly formatted response. I need to output \"LIVE_OK\" and only \"LIVE_OK\". There's no room for extraneous information or deviation from this single-token ou",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 4267,
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
