# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25498968599`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25498968599
- Generated at: `2026-05-07T13:32:17.501Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-07T13:31:50.740Z)

```json
{
  "checkedAt": "2026-05-07T13:31:50.740Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 128,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-07T13:31:50.843Z",
        "uptime": 2.273306503,
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
      "sessionId": "session_1778160710929_16u0bd9g0",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-07T13:31:54.595Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Generating the Output**\n\nI've processed the user's input, recognizing it's a system verification request. My current focus is generating the required output, a single sentence containing only the token \"LIVE_OK\", in response to the prompt.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 961,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1565,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-07T13:31:54.595Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Generating the Output**\n\nI've processed the user's input, recognizing it's a system verification request. My current focus is generating the required output, a single sentence containing only the token \"LIVE_OK\", in response to the prompt.",
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
          "sessionId": "session_1778160713077_984hazi6f",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-07T13:31:54.595Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Generating the Output**\n\nI've processed the user's input, recognizing it's a system verification request. My current focus is generating the required output, a single sentence containing only the token \"LIVE_OK\", in response to the prompt.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1565,
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
