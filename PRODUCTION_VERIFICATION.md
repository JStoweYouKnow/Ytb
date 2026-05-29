# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26641823040`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26641823040
- Generated at: `2026-05-29T14:04:33.620Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-29T14:04:12.683Z)

```json
{
  "checkedAt": "2026-05-29T14:04:12.683Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 122,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-29T14:04:12.781Z",
        "uptime": 2.786560665,
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
      "sessionId": "session_1780063452855_3my8l45g0",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-29T14:04:16.799Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding to Command**\n\nI've processed the user's message, identifying it as a direct command, not a typical wellness query. The instruction is explicit: generate a single-sentence response containing only the token \"LIVE_OK.\" I'll adhere strictly to this format, bypassing any",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1026,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1768,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-29T14:04:16.799Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding to Command**\n\nI've processed the user's message, identifying it as a direct command, not a typical wellness query. The instruction is explicit: generate a single-sentence response containing only the token \"LIVE_OK.\" I'll adhere strictly to this format, bypassing any",
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
          "sessionId": "session_1780063455074_q6oqmq0t7",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-29T14:04:16.799Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Responding to Command**\n\nI've processed the user's message, identifying it as a direct command, not a typical wellness query. The instruction is explicit: generate a single-sentence response containing only the token \"LIVE_OK.\" I'll adhere strictly to this format, bypassing any",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1767,
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
