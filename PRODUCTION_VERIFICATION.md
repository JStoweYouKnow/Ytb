# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24838063001`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24838063001
- Generated at: `2026-04-23T13:30:46.408Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-23T13:30:27.805Z)

```json
{
  "checkedAt": "2026-04-23T13:30:27.805Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 126,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-23T13:30:27.903Z",
        "uptime": 2.701456028,
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
      "sessionId": "session_1776951027988_umnwu09eb",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-23T13:30:31.566Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing System Check**\n\nI have processed the user's input, recognizing a directive for a system verification. My focus is on delivering the precise, requested output: a single sentence containing the token \"LIVE_OK.\" I will not engage any external tools as this is a functiona",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 890,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1542,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-23T13:30:31.566Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing System Check**\n\nI have processed the user's input, recognizing a directive for a system verification. My focus is on delivering the precise, requested output: a single sentence containing the token \"LIVE_OK.\" I will not engage any external tools as this is a functiona",
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
          "sessionId": "session_1776951030076_ol3xcm562",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-23T13:30:31.566Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Executing System Check**\n\nI have processed the user's input, recognizing a directive for a system verification. My focus is on delivering the precise, requested output: a single sentence containing the token \"LIVE_OK.\" I will not engage any external tools as this is a functiona",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1542,
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
