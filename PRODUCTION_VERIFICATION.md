# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24002405844`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24002405844
- Generated at: `2026-04-05T13:22:49.903Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-05T13:22:35.167Z)

```json
{
  "checkedAt": "2026-04-05T13:22:35.167Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 105,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-05T13:22:35.254Z",
        "uptime": 2.115064044,
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
      "sessionId": "session_1775395355319_dawuuowpy",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-05T13:22:38.863Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Check**\n\nI've registered a clear, direct system verification instruction. The mandate to fetch user context is being overridden by this explicit demand for a tokenized, concise response, which is \"LIVE_OK.\" I've flagged this as a critical path exception.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 737,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1652,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-05T13:22:38.863Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Check**\n\nI've registered a clear, direct system verification instruction. The mandate to fetch user context is being overridden by this explicit demand for a tokenized, concise response, which is \"LIVE_OK.\" I've flagged this as a critical path exception.",
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
          "sessionId": "session_1775395357252_k718eg3up",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-05T13:22:38.863Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing System Check**\n\nI've registered a clear, direct system verification instruction. The mandate to fetch user context is being overridden by this explicit demand for a tokenized, concise response, which is \"LIVE_OK.\" I've flagged this as a critical path exception.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1652,
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
