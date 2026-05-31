# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26713956389`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26713956389
- Generated at: `2026-05-31T13:30:33.863Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-31T13:30:17.132Z)

```json
{
  "checkedAt": "2026-05-31T13:30:17.132Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 129,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-31T13:30:17.242Z",
        "uptime": 2.831849226,
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
      "sessionId": "session_1780234217321_m02cdlcxk",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-31T13:30:20.748Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize this as a system verification check, overriding normal conversational behavior. The instructions are clear; I must respond with \"LIVE_OK\" and only that. No tools or further processing are necessary.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 888,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1397,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-31T13:30:20.748Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize this as a system verification check, overriding normal conversational behavior. The instructions are clear; I must respond with \"LIVE_OK\" and only that. No tools or further processing are necessary.",
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
          "sessionId": "session_1780234219401_t4hw9s4l6",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-31T13:30:20.748Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Verification**\n\nI recognize this as a system verification check, overriding normal conversational behavior. The instructions are clear; I must respond with \"LIVE_OK\" and only that. No tools or further processing are necessary.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1397,
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
