# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24192862420`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24192862420
- Generated at: `2026-04-09T13:31:48.910Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-09T13:30:53.257Z)

```json
{
  "checkedAt": "2026-04-09T13:30:53.257Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 123,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-09T13:30:53.355Z",
        "uptime": 2.432554465,
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
      "sessionId": "session_1775741453429_0fhlcnejk",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-09T13:30:57.161Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Commands**\n\nI've determined the user's explicit command takes precedence here; a prompt for \"LIVE_OK\" is a direct system check, overriding standard agent startup calls. I will immediately answer with the requested response.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 964,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1617,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-09T13:30:57.161Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Commands**\n\nI've determined the user's explicit command takes precedence here; a prompt for \"LIVE_OK\" is a direct system check, overriding standard agent startup calls. I will immediately answer with the requested response.",
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
          "sessionId": "session_1775741455589_r3tgl94l5",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-09T13:30:57.161Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Commands**\n\nI've determined the user's explicit command takes precedence here; a prompt for \"LIVE_OK\" is a direct system check, overriding standard agent startup calls. I will immediately answer with the requested response.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1616,
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
