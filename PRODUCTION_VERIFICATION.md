# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23380503618`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23380503618
- Generated at: `2026-03-21T13:16:41.686Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-21T13:16:22.401Z)

```json
{
  "checkedAt": "2026-03-21T13:16:22.401Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 133,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-21T13:16:22.509Z",
        "uptime": 2.73731765,
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
      "sessionId": "session_1774098982603_85nz02ren",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-21T13:16:26.713Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing User Context**\n\nI've initiated the critical `getUserContext` call as per instructions. Waiting for that tool output before I can formulate the requested, simple response, \"LIVE_OK.\" This ensures adherence to the specified persona requirements.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1058,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1920,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-21T13:16:26.713Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing User Context**\n\nI've initiated the critical `getUserContext` call as per instructions. Waiting for that tool output before I can formulate the requested, simple response, \"LIVE_OK.\" This ensures adherence to the specified persona requirements.",
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
          "sessionId": "session_1774098984858_bxvh3devc",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-21T13:16:26.713Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing User Context**\n\nI've initiated the critical `getUserContext` call as per instructions. Waiting for that tool output before I can formulate the requested, simple response, \"LIVE_OK.\" This ensures adherence to the specified persona requirements.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1919,
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
