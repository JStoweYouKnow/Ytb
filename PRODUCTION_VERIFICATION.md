# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26333959235`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26333959235
- Generated at: `2026-05-23T13:29:43.984Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-23T13:29:14.145Z)

```json
{
  "checkedAt": "2026-05-23T13:29:14.145Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 132,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-23T13:29:14.251Z",
        "uptime": 2.833410848,
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
      "sessionId": "session_1779542954337_spdy6pbcc",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-23T13:29:18.638Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Integrity**\n\nI've processed the system verification prompt. My instruction is clear: provide a direct, single-sentence response containing only \"LIVE_OK.\" No tools or external calls are needed; this supersedes all other operational procedures. The response wil",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 924,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2236,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-23T13:29:18.638Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Integrity**\n\nI've processed the system verification prompt. My instruction is clear: provide a direct, single-sentence response containing only \"LIVE_OK.\" No tools or external calls are needed; this supersedes all other operational procedures. The response wil",
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
          "sessionId": "session_1779542956453_qv8at1tcg",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-23T13:29:18.638Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Integrity**\n\nI've processed the system verification prompt. My instruction is clear: provide a direct, single-sentence response containing only \"LIVE_OK.\" No tools or external calls are needed; this supersedes all other operational procedures. The response wil",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2236,
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
