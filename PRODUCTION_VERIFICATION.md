# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25963155862`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25963155862
- Generated at: `2026-05-16T13:29:25.321Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-16T13:29:04.373Z)

```json
{
  "checkedAt": "2026-05-16T13:29:04.373Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 125,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-16T13:29:04.465Z",
        "uptime": 2.052653917,
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
      "sessionId": "session_1778938144546_3htawxp89",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-16T13:29:09.634Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI've analyzed the verification prompt. My response will be a concise sentence that includes the \"LIVE_OK\" token, specifically avoiding any tool calls, adhering to the instruction's implicit and explicit requirements. I will respond, LIVE_OK, as I've b",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 780,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 3155,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-16T13:29:09.634Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI've analyzed the verification prompt. My response will be a concise sentence that includes the \"LIVE_OK\" token, specifically avoiding any tool calls, adhering to the instruction's implicit and explicit requirements. I will respond, LIVE_OK, as I've b",
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
          "sessionId": "session_1778938146522_j68beuhu8",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-16T13:29:09.634Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying System Output**\n\nI've analyzed the verification prompt. My response will be a concise sentence that includes the \"LIVE_OK\" token, specifically avoiding any tool calls, adhering to the instruction's implicit and explicit requirements. I will respond, LIVE_OK, as I've b",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 3155,
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
