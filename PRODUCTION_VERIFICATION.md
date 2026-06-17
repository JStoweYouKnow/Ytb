# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27695191123`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27695191123
- Generated at: `2026-06-17T14:11:16.201Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-17T14:10:54.565Z)

```json
{
  "checkedAt": "2026-06-17T14:10:54.565Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 116,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-17T14:10:54.658Z",
        "uptime": 3.215117127,
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
      "sessionId": "session_1781705454727_lbo2290aw",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-17T14:10:58.681Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nMy primary focus is on strict adherence to the system check. I've analyzed the prompt and determined the appropriate, and only acceptable, response is \"LIVE_OK\". This constraint overrides any general knowledge or persona considerations. I will now out",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1256,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1541,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-17T14:10:58.681Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nMy primary focus is on strict adherence to the system check. I've analyzed the prompt and determined the appropriate, and only acceptable, response is \"LIVE_OK\". This constraint overrides any general knowledge or persona considerations. I will now out",
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
          "sessionId": "session_1781705457178_xlnjb8tug",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-17T14:10:58.681Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying System Output**\n\nMy primary focus is on strict adherence to the system check. I've analyzed the prompt and determined the appropriate, and only acceptable, response is \"LIVE_OK\". This constraint overrides any general knowledge or persona considerations. I will now out",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1541,
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
