# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27144305918`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27144305918
- Generated at: `2026-06-08T14:23:44.734Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-08T14:23:23.873Z)

```json
{
  "checkedAt": "2026-06-08T14:23:23.873Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 125,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-08T14:23:23.979Z",
        "uptime": 2.915618611,
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
      "sessionId": "session_1780928604073_a495tcaaz",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-08T14:23:28.171Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Prompt Adherence**\n\nI've processed the user's input, which is a system verification prompt. My analysis concluded that the required response is a simple token output based on the instructions. The required format will be applied, producing the output as requested. No",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1312,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1659,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-08T14:23:28.171Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Prompt Adherence**\n\nI've processed the user's input, which is a system verification prompt. My analysis concluded that the required response is a simple token output based on the instructions. The required format will be applied, producing the output as requested. No",
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
          "sessionId": "session_1780928606576_fp737eboz",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-08T14:23:28.171Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Prompt Adherence**\n\nI've processed the user's input, which is a system verification prompt. My analysis concluded that the required response is a simple token output based on the instructions. The required format will be applied, producing the output as requested. No",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1659,
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
