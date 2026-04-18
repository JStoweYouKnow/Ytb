# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24605649865`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24605649865
- Generated at: `2026-04-18T13:25:23.709Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-18T13:25:06.532Z)

```json
{
  "checkedAt": "2026-04-18T13:25:06.532Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 120,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-18T13:25:06.628Z",
        "uptime": 2.177501943,
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
      "sessionId": "session_1776518706704_75h6k0qlu",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-18T13:25:13.240Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Immediate Output**\n\nI've processed the input as a straightforward instruction: provide \"LIVE_OK.\" No analysis or tools are necessary, as the directive is simple. It's a quick verification; my only task is to output the specific token.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1987,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 3399,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-18T13:25:13.240Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Immediate Output**\n\nI've processed the input as a straightforward instruction: provide \"LIVE_OK.\" No analysis or tools are necessary, as the directive is simple. It's a quick verification; my only task is to output the specific token.",
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
          "sessionId": "session_1776518709887_e4b9gbxab",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-18T13:25:13.240Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Immediate Output**\n\nI've processed the input as a straightforward instruction: provide \"LIVE_OK.\" No analysis or tools are necessary, as the directive is simple. It's a quick verification; my only task is to output the specific token.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 3399,
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
