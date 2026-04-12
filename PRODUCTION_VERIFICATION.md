# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24307755070`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24307755070
- Generated at: `2026-04-12T13:24:35.088Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-12T13:24:18.192Z)

```json
{
  "checkedAt": "2026-04-12T13:24:18.192Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 109,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-12T13:24:18.280Z",
        "uptime": 2.186231972,
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
      "sessionId": "session_1776000258349_a6z6jfzgx",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-12T13:24:22.062Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI have received a system check and determined the required action. My response will be a single sentence containing the exact token \"LIVE_OK.\" I recognize this as a test prompt and will not engage in any other actions or tools, adhering precisely to t",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 881,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1677,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-12T13:24:22.062Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI have received a system check and determined the required action. My response will be a single sentence containing the exact token \"LIVE_OK.\" I recognize this as a test prompt and will not engage in any other actions or tools, adhering precisely to t",
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
          "sessionId": "session_1776000260422_pg0hdq396",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-12T13:24:22.062Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying System Output**\n\nI have received a system check and determined the required action. My response will be a single sentence containing the exact token \"LIVE_OK.\" I recognize this as a test prompt and will not engage in any other actions or tools, adhering precisely to t",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1676,
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
