# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26102057978`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26102057978
- Generated at: `2026-05-19T13:59:00.739Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-19T13:58:37.786Z)

```json
{
  "checkedAt": "2026-05-19T13:58:37.786Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 135,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-19T13:58:37.902Z",
        "uptime": 2.568359417,
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
      "sessionId": "session_1779199117981_my73vzhsb",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-19T13:58:43.318Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing System Check**\n\nI have analyzed the user's request. My focus is on the direct verification query and the specified response format. I've identified \"LIVE_OK\" as the correct token. I'm formulating the response as that single token, bypassing standard conversational set",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1011,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 3186,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-19T13:58:43.318Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing System Check**\n\nI have analyzed the user's request. My focus is on the direct verification query and the specified response format. I've identified \"LIVE_OK\" as the correct token. I'm formulating the response as that single token, bypassing standard conversational set",
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
          "sessionId": "session_1779199120195_8bs9c9ks3",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-19T13:58:43.318Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Executing System Check**\n\nI have analyzed the user's request. My focus is on the direct verification query and the specified response format. I've identified \"LIVE_OK\" as the correct token. I'm formulating the response as that single token, bypassing standard conversational set",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 3185,
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
