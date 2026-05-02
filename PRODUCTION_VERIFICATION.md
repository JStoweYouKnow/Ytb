# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25252978659`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25252978659
- Generated at: `2026-05-02T13:28:47.478Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-02T13:28:30.128Z)

```json
{
  "checkedAt": "2026-05-02T13:28:30.128Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 121,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-02T13:28:30.223Z",
        "uptime": 2.287076108,
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
      "sessionId": "session_1777728510300_t3llan49d",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-02T13:28:33.983Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Immediate Response**\n\nI've registered the user's explicit request for a verification response. It's a straightforward command that requires a direct answer. My task is simply to ensure I deliver \"LIVE_OK\" as a sentence, nothing more. There's no need for interpretatio",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 856,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1677,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-02T13:28:33.983Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Immediate Response**\n\nI've registered the user's explicit request for a verification response. It's a straightforward command that requires a direct answer. My task is simply to ensure I deliver \"LIVE_OK\" as a sentence, nothing more. There's no need for interpretatio",
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
          "sessionId": "session_1777728512352_54igt8eyu",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-02T13:28:33.983Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Immediate Response**\n\nI've registered the user's explicit request for a verification response. It's a straightforward command that requires a direct answer. My task is simply to ensure I deliver \"LIVE_OK\" as a sentence, nothing more. There's no need for interpretatio",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1677,
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
