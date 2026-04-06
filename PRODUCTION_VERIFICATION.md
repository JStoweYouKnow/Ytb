# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24033658390`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24033658390
- Generated at: `2026-04-06T13:28:56.200Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-06T13:28:39.689Z)

```json
{
  "checkedAt": "2026-04-06T13:28:39.689Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 128,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-06T13:28:39.783Z",
        "uptime": 2.358060725,
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
      "sessionId": "session_1775482119869_wpjue57im",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-06T13:28:43.608Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing Direct Instruction**\n\nI've processed the message and recognized the straightforward nature of the request. My understanding is complete: I must output the token 'LIVE_OK'. No further analysis or interpretation is necessary.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 961,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1629,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-06T13:28:43.608Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing Direct Instruction**\n\nI've processed the message and recognized the straightforward nature of the request. My understanding is complete: I must output the token 'LIVE_OK'. No further analysis or interpretation is necessary.",
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
          "sessionId": "session_1775482122023_c5f3bxumg",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-06T13:28:43.608Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Executing Direct Instruction**\n\nI've processed the message and recognized the straightforward nature of the request. My understanding is complete: I must output the token 'LIVE_OK'. No further analysis or interpretation is necessary.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1629,
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
