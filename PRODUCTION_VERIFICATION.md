# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25438428068`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25438428068
- Generated at: `2026-05-06T13:32:46.349Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-06T13:32:17.116Z)

```json
{
  "checkedAt": "2026-05-06T13:32:17.116Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 133,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-06T13:32:17.234Z",
        "uptime": 2.334640487,
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
      "sessionId": "session_1778074337309_m4vktvqwz",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-06T13:32:21.695Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Instruction Compliance**\n\nI've processed the user's explicit direction. My focus is now solely on providing the exact, requested output, \"LIVE_OK.\" No further analysis or external tools are needed; it's a straightforward instruction fulfillment.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 913,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2332,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-06T13:32:21.695Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Instruction Compliance**\n\nI've processed the user's explicit direction. My focus is now solely on providing the exact, requested output, \"LIVE_OK.\" No further analysis or external tools are needed; it's a straightforward instruction fulfillment.",
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
          "sessionId": "session_1778074339413_j008kiyxr",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-06T13:32:21.695Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Instruction Compliance**\n\nI've processed the user's explicit direction. My focus is now solely on providing the exact, requested output, \"LIVE_OK.\" No further analysis or external tools are needed; it's a straightforward instruction fulfillment.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2332,
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
