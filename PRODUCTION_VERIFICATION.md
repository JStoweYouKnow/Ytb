# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25802801001`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25802801001
- Generated at: `2026-05-13T13:40:40.215Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-13T13:40:17.610Z)

```json
{
  "checkedAt": "2026-05-13T13:40:17.610Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 145,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-13T13:40:17.721Z",
        "uptime": 2.440189965,
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
      "sessionId": "session_1778679617828_1oke22z82",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-13T13:40:21.891Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Output Adherence**\n\nI've processed the user's message. It's a direct instruction for a specific output format, so my immediate focus is on ensuring strict adherence to the request. I understand that the sole objective is to provide the designated response, LIVE_OK, an",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 963,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1973,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-13T13:40:21.891Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Output Adherence**\n\nI've processed the user's message. It's a direct instruction for a specific output format, so my immediate focus is on ensuring strict adherence to the request. I understand that the sole objective is to provide the designated response, LIVE_OK, an",
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
          "sessionId": "session_1778679619979_c5rcsj34e",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-13T13:40:21.891Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Output Adherence**\n\nI've processed the user's message. It's a direct instruction for a specific output format, so my immediate focus is on ensuring strict adherence to the request. I understand that the sole objective is to provide the designated response, LIVE_OK, an",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1972,
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
