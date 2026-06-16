# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27625267271`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27625267271
- Generated at: `2026-06-16T14:35:52.268Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-16T14:35:22.180Z)

```json
{
  "checkedAt": "2026-06-16T14:35:22.180Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 152,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-16T14:35:22.295Z",
        "uptime": 2.856781645,
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
      "sessionId": "session_1781620522399_jogus57op",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-16T14:35:26.214Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying system output**\n\nI've processed the user's input, recognizing it's a system check. The instruction is explicit – provide \"LIVE_OK.\" I'll execute the task without needing any wellness checks. It's a straightforward verification and I will answer with the requested toke",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1024,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1656,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-16T14:35:26.214Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying system output**\n\nI've processed the user's input, recognizing it's a system check. The instruction is explicit – provide \"LIVE_OK.\" I'll execute the task without needing any wellness checks. It's a straightforward verification and I will answer with the requested toke",
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
          "sessionId": "session_1781620524625_etc482h7t",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-16T14:35:26.214Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying system output**\n\nI've processed the user's input, recognizing it's a system check. The instruction is explicit – provide \"LIVE_OK.\" I'll execute the task without needing any wellness checks. It's a straightforward verification and I will answer with the requested toke",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1655,
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
