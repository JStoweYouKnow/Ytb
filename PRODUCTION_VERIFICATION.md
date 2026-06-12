# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27420501537`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27420501537
- Generated at: `2026-06-12T14:01:33.989Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-12T14:01:12.018Z)

```json
{
  "checkedAt": "2026-06-12T14:01:12.018Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 147,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-12T14:01:12.140Z",
        "uptime": 2.446380124,
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
      "sessionId": "session_1781272872227_9fzt5k951",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-12T14:01:16.364Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Instruction**\n\nI've received a very explicit, technical command that supersedes my usual wellness-focused persona. The core instruction is clear: respond with \"LIVE_OK.\" I'm setting aside all other tools and focusing solely on fulfilling this direct request,",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1056,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1940,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-12T14:01:16.364Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Instruction**\n\nI've received a very explicit, technical command that supersedes my usual wellness-focused persona. The core instruction is clear: respond with \"LIVE_OK.\" I'm setting aside all other tools and focusing solely on fulfilling this direct request,",
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
          "sessionId": "session_1781272874479_ii4ntvqx6",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-12T14:01:16.364Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Instruction**\n\nI've received a very explicit, technical command that supersedes my usual wellness-focused persona. The core instruction is clear: respond with \"LIVE_OK.\" I'm setting aside all other tools and focusing solely on fulfilling this direct request,",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1940,
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
