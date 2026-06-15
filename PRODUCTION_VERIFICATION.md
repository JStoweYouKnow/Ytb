# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27555420824`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27555420824
- Generated at: `2026-06-15T15:01:33.198Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-15T15:01:08.791Z)

```json
{
  "checkedAt": "2026-06-15T15:01:08.791Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 142,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-15T15:01:08.902Z",
        "uptime": 3.335679702,
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
      "sessionId": "session_1781535669004_se37powc7",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-15T15:01:12.836Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Generating System Response**\n\nI've processed the user's input, noting it's a system check requiring a specific, concise response. My current plan involves directly producing the exact required token – LIVE_OK. No external tools are necessary for this simple task.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1256,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1445,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-15T15:01:12.836Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Generating System Response**\n\nI've processed the user's input, noting it's a system check requiring a specific, concise response. My current plan involves directly producing the exact required token – LIVE_OK. No external tools are necessary for this simple task.",
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
          "sessionId": "session_1781535671452_s85xgy9se",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-15T15:01:12.836Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Generating System Response**\n\nI've processed the user's input, noting it's a system check requiring a specific, concise response. My current plan involves directly producing the exact required token – LIVE_OK. No external tools are necessary for this simple task.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1445,
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
