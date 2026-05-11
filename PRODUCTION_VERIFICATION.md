# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25674419510`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25674419510
- Generated at: `2026-05-11T13:52:45.344Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-11T13:52:25.171Z)

```json
{
  "checkedAt": "2026-05-11T13:52:25.171Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 154,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-11T13:52:25.298Z",
        "uptime": 2.230548811,
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
      "sessionId": "session_1778507545398_f5cflrrcq",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-11T13:52:29.417Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Directives Precisely**\n\nI've processed the input as a system verification request. My current focus is solely on delivering the exact response dictated: a single sentence containing the token `LIVE_OK`. I am deliberately avoiding any additional conversational element",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 789,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2101,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-11T13:52:29.417Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Directives Precisely**\n\nI've processed the input as a system verification request. My current focus is solely on delivering the exact response dictated: a single sentence containing the token `LIVE_OK`. I am deliberately avoiding any additional conversational element",
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
          "sessionId": "session_1778507547371_gzu2125w7",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-11T13:52:29.417Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Directives Precisely**\n\nI've processed the input as a system verification request. My current focus is solely on delivering the exact response dictated: a single sentence containing the token `LIVE_OK`. I am deliberately avoiding any additional conversational element",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2101,
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
