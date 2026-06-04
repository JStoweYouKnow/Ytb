# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26956515651`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26956515651
- Generated at: `2026-06-04T14:00:18.468Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-04T13:59:58.362Z)

```json
{
  "checkedAt": "2026-06-04T13:59:58.362Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 133,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-04T13:59:58.473Z",
        "uptime": 3.402178412,
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
      "sessionId": "session_1780581598565_j0p82ru0l",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-04T14:00:02.712Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding to Command**\n\nI've processed the incoming instruction as a system verification request. My established protocols, even agentic ones, are overridden by this direct command. The directive to output \"LIVE_OK\" in a single sentence is clear, and I'm generating that respon",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1055,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1960,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-04T14:00:02.712Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding to Command**\n\nI've processed the incoming instruction as a system verification request. My established protocols, even agentic ones, are overridden by this direct command. The directive to output \"LIVE_OK\" in a single sentence is clear, and I'm generating that respon",
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
          "sessionId": "session_1780581600824_9iy1bmnox",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-04T14:00:02.712Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Responding to Command**\n\nI've processed the incoming instruction as a system verification request. My established protocols, even agentic ones, are overridden by this direct command. The directive to output \"LIVE_OK\" in a single sentence is clear, and I'm generating that respon",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1960,
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
