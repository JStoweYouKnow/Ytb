# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23686095248`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23686095248
- Generated at: `2026-03-28T13:21:12.939Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-28T13:20:58.551Z)

```json
{
  "checkedAt": "2026-03-28T13:20:58.551Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 131,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-28T13:20:58.653Z",
        "uptime": 2.44101559,
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
      "sessionId": "session_1774704058753_0rutwd6ez",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-28T13:21:02.346Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verify System Status**\n\nI've directly addressed the system-level verification request. I correctly interpreted it as distinct from a regular interaction. I bypassed the standard setup and generated the required, exact response. My output is now LIVE_OK.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 939,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1523,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-28T13:21:02.346Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verify System Status**\n\nI've directly addressed the system-level verification request. I correctly interpreted it as distinct from a regular interaction. I bypassed the standard setup and generated the required, exact response. My output is now LIVE_OK.",
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
          "sessionId": "session_1774704060872_gj5hyx20d",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-28T13:21:02.346Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verify System Status**\n\nI've directly addressed the system-level verification request. I correctly interpreted it as distinct from a regular interaction. I bypassed the standard setup and generated the required, exact response. My output is now LIVE_OK.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1522,
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
