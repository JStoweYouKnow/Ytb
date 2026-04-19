# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24630149282`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24630149282
- Generated at: `2026-04-19T13:25:11.644Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-19T13:24:55.951Z)

```json
{
  "checkedAt": "2026-04-19T13:24:55.951Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 108,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-19T13:24:56.041Z",
        "uptime": 2.053232646,
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
      "sessionId": "session_1776605096098_jdbv3pv22",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-19T13:24:59.628Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI've processed the verification request and understand the need for a precise response. My focus is solely on delivering the required \"LIVE_OK\" token in a single sentence, as per the overriding instructions. No other actions are required.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 802,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1565,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-19T13:24:59.628Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI've processed the verification request and understand the need for a precise response. My focus is solely on delivering the required \"LIVE_OK\" token in a single sentence, as per the overriding instructions. No other actions are required.",
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
          "sessionId": "session_1776605098098_ur49cbixe",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-19T13:24:59.628Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying System Output**\n\nI've processed the verification request and understand the need for a precise response. My focus is solely on delivering the required \"LIVE_OK\" token in a single sentence, as per the overriding instructions. No other actions are required.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1565,
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
