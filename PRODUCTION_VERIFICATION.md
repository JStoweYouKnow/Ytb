# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27830141833`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27830141833
- Generated at: `2026-06-19T14:00:36.670Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-19T14:00:15.874Z)

```json
{
  "checkedAt": "2026-06-19T14:00:15.874Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 138,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-19T14:00:15.977Z",
        "uptime": 3.471028055,
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
      "sessionId": "session_1781877616068_qmpl7lqo5",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-19T14:00:19.945Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI've successfully identified and processed the user's specific instruction. I've focused on the direct output request and constructed the precise response: \"LIVE_OK\". This represents completion of the immediate task.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1221,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1510,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-19T14:00:19.945Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying System Output**\n\nI've successfully identified and processed the user's specific instruction. I've focused on the direct output request and constructed the precise response: \"LIVE_OK\". This represents completion of the immediate task.",
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
          "sessionId": "session_1781877618492_622vzn7ys",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-19T14:00:19.945Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying System Output**\n\nI've successfully identified and processed the user's specific instruction. I've focused on the direct output request and constructed the precise response: \"LIVE_OK\". This represents completion of the immediate task.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1510,
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
