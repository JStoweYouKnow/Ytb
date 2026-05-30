# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26685029631`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26685029631
- Generated at: `2026-05-30T13:29:53.434Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-30T13:29:35.035Z)

```json
{
  "checkedAt": "2026-05-30T13:29:35.035Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 142,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-30T13:29:35.146Z",
        "uptime": 2.611288329,
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
      "sessionId": "session_1780147775238_3m7mtmgh5",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-30T13:29:39.287Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Immediate Action**\n\nI've got a simple system check here. The task is straightforward: verify live output using a specific token. I'm focusing on that direct instruction and will answer with \"LIVE_OK.\" No further analysis or contextual understanding is needed, just fo",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1031,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1877,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-30T13:29:39.287Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Immediate Action**\n\nI've got a simple system check here. The task is straightforward: verify live output using a specific token. I'm focusing on that direct instruction and will answer with \"LIVE_OK.\" No further analysis or contextual understanding is needed, just fo",
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
          "sessionId": "session_1780147777466_sgryujoxu",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-30T13:29:39.287Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Immediate Action**\n\nI've got a simple system check here. The task is straightforward: verify live output using a specific token. I'm focusing on that direct instruction and will answer with \"LIVE_OK.\" No further analysis or contextual understanding is needed, just fo",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1877,
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
