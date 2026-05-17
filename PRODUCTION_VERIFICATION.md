# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25992197731`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25992197731
- Generated at: `2026-05-17T13:29:12.756Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-17T13:28:55.752Z)

```json
{
  "checkedAt": "2026-05-17T13:28:55.752Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 100,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-17T13:28:55.838Z",
        "uptime": 1.781333342,
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
      "sessionId": "session_1779024535947_mvlusn93v",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-17T13:28:59.840Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Processing Direct Instruction**\n\nI've got a very straightforward instruction to follow. The task involves a system check, not typical conversational content. My goal is simple: generate the exact phrase \"LIVE_OK\" as a concise response.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 723,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2064,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-17T13:28:59.840Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Processing Direct Instruction**\n\nI've got a very straightforward instruction to follow. The task involves a system check, not typical conversational content. My goal is simple: generate the exact phrase \"LIVE_OK\" as a concise response.",
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
          "sessionId": "session_1779024537814_6yp2pyt3d",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-17T13:28:59.840Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Processing Direct Instruction**\n\nI've got a very straightforward instruction to follow. The task involves a system check, not typical conversational content. My goal is simple: generate the exact phrase \"LIVE_OK\" as a concise response.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2064,
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
