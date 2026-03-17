# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23196606764`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23196606764
- Generated at: `2026-03-17T13:29:56.288Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-17T13:29:37.334Z)

```json
{
  "checkedAt": "2026-03-17T13:29:37.334Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 169,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-17T13:29:37.475Z",
        "uptime": 2.877747062,
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
      "sessionId": "session_1773754177577_98rc7ax5n",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-17T13:29:42.871Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Initiating The Session**\n\nI've got the initial instructions. I am starting by acknowledging the user as \"Live Output Probe,\" and I'm ready to provide a brief, warm greeting, followed by a check-in on their well-being. The key is brevity. I'll include the \"LIVE_OK\" token, as ins",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1003,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 3164,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-17T13:29:42.871Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Initiating The Session**\n\nI've got the initial instructions. I am starting by acknowledging the user as \"Live Output Probe,\" and I'm ready to provide a brief, warm greeting, followed by a check-in on their well-being. The key is brevity. I'll include the \"LIVE_OK\" token, as ins",
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
          "sessionId": "session_1773754179773_h85k4thgk",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-17T13:29:42.871Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Initiating The Session**\n\nI've got the initial instructions. I am starting by acknowledging the user as \"Live Output Probe,\" and I'm ready to provide a brief, warm greeting, followed by a check-in on their well-being. The key is brevity. I'll include the \"LIVE_OK\" token, as ins",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 3163,
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
