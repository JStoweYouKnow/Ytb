# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25111859373`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25111859373
- Generated at: `2026-04-29T13:32:11.237Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-29T13:31:46.907Z)

```json
{
  "checkedAt": "2026-04-29T13:31:46.907Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 117,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-29T13:31:46.994Z",
        "uptime": 2.868369471,
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
      "sessionId": "session_1777469507085_8941nhsd4",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-29T13:31:51.091Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Live Output**\n\nI've processed the user's explicit request for a live output check. The instructions provided are direct and unambiguous, demanding a specific token. I've concluded that the required response is \"LIVE_OK.\" I've considered that the usual context is susp",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1021,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1844,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-29T13:31:51.091Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Live Output**\n\nI've processed the user's explicit request for a live output check. The instructions provided are direct and unambiguous, demanding a specific token. I've concluded that the required response is \"LIVE_OK.\" I've considered that the usual context is susp",
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
          "sessionId": "session_1777469509286_jtvdpc1aa",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-29T13:31:51.091Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Live Output**\n\nI've processed the user's explicit request for a live output check. The instructions provided are direct and unambiguous, demanding a specific token. I've concluded that the required response is \"LIVE_OK.\" I've considered that the usual context is susp",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1844,
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
