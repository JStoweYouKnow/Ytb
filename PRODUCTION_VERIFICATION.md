# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26516437151`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26516437151
- Generated at: `2026-05-27T14:09:52.336Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-27T14:09:29.834Z)

```json
{
  "checkedAt": "2026-05-27T14:09:29.834Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 112,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-27T14:09:29.926Z",
        "uptime": 3.901199544,
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
      "sessionId": "session_1779890969993_2vvdonsl7",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-27T14:09:35.831Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Direct Instruction**\n\nI understand the direct instruction: provide a specific token, LIVE_OK. My focus is solely on delivering this output. I will bypass any extraneous processing or interpretation.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1240,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 3441,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-27T14:09:35.831Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Direct Instruction**\n\nI understand the direct instruction: provide a specific token, LIVE_OK. My focus is solely on delivering this output. I will bypass any extraneous processing or interpretation.",
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
          "sessionId": "session_1779890972429_yy3iciajn",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-27T14:09:35.831Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Direct Instruction**\n\nI understand the direct instruction: provide a specific token, LIVE_OK. My focus is solely on delivering this output. I will bypass any extraneous processing or interpretation.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 3441,
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
