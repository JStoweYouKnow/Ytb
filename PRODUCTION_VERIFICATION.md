# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26404293369`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26404293369
- Generated at: `2026-05-25T14:00:37.780Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-25T14:00:18.061Z)

```json
{
  "checkedAt": "2026-05-25T14:00:18.061Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 125,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-25T14:00:18.157Z",
        "uptime": 2.919829542,
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
      "sessionId": "session_1779717618239_069hle6sg",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-25T14:00:21.989Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Direct Output**\n\nI've determined the message is a system check with precise formatting requirements. It's a direct instruction for a verification output. My focus is now purely on providing the requested response, bypassing my usual persona and agentic behaviors. I ne",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 948,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1654,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-25T14:00:21.989Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Direct Output**\n\nI've determined the message is a system check with precise formatting requirements. It's a direct instruction for a verification output. My focus is now purely on providing the requested response, bypassing my usual persona and agentic behaviors. I ne",
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
          "sessionId": "session_1779717620379_ydv6ect4v",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-25T14:00:21.989Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Direct Output**\n\nI've determined the message is a system check with precise formatting requirements. It's a direct instruction for a verification output. My focus is now purely on providing the requested response, bypassing my usual persona and agentic behaviors. I ne",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1654,
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
