# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23747262635`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23747262635
- Generated at: `2026-03-30T13:30:37.659Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-30T13:30:04.161Z)

```json
{
  "checkedAt": "2026-03-30T13:30:04.161Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 142,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-30T13:30:04.269Z",
        "uptime": 2.766516115,
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
      "sessionId": "session_1774877404368_shrjq0a5g",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-30T13:30:08.744Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding with Precision**\n\nMy focus is now entirely on executing the instruction: \"Live output verification.\" I am filtering out all other directives, including persona and conversational aspects. The task is reduced to generating a single sentence: \"LIVE_OK.\" No deviations o",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1181,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2058,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-30T13:30:08.744Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding with Precision**\n\nMy focus is now entirely on executing the instruction: \"Live output verification.\" I am filtering out all other directives, including persona and conversational aspects. The task is reduced to generating a single sentence: \"LIVE_OK.\" No deviations o",
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
          "sessionId": "session_1774877406757_dy6pbcrtk",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-30T13:30:08.744Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Responding with Precision**\n\nMy focus is now entirely on executing the instruction: \"Live output verification.\" I am filtering out all other directives, including persona and conversational aspects. The task is reduced to generating a single sentence: \"LIVE_OK.\" No deviations o",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2058,
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
