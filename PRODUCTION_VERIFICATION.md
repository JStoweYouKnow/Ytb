# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27281935541`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27281935541
- Generated at: `2026-06-10T14:05:49.582Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-10T14:05:23.590Z)

```json
{
  "checkedAt": "2026-06-10T14:05:23.590Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 142,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-10T14:05:23.708Z",
        "uptime": 3.015072045,
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
      "sessionId": "session_1781100323810_6h3lc7hey",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-10T14:05:27.821Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Simple Response**\n\nI've processed the verification prompt and its constraints. I understand that a single-token response is required, specifically \"LIVE_OK.\" No further analysis or tool usage is needed; the answer is straightforward.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1134,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1754,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-10T14:05:27.821Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Simple Response**\n\nI've processed the verification prompt and its constraints. I understand that a single-token response is required, specifically \"LIVE_OK.\" No further analysis or tool usage is needed; the answer is straightforward.",
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
          "sessionId": "session_1781100326130_n7fw26i60",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-10T14:05:27.821Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Simple Response**\n\nI've processed the verification prompt and its constraints. I understand that a single-token response is required, specifically \"LIVE_OK.\" No further analysis or tool usage is needed; the answer is straightforward.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1754,
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
