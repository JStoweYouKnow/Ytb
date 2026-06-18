# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27764824754`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27764824754
- Generated at: `2026-06-18T14:01:10.911Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-18T14:00:50.578Z)

```json
{
  "checkedAt": "2026-06-18T14:00:50.578Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 136,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-18T14:00:50.680Z",
        "uptime": 3.27983879,
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
      "sessionId": "session_1781791250777_3obxc8436",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-18T14:00:54.959Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Response**\n\nI've processed the system verification prompt and understand the required direct response: a single sentence including the token \"LIVE_OK.\" My function is simply to generate this response, without any extraneous actions or external tool calls. The ",
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
      "elapsedMs": 1733,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-18T14:00:54.959Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Response**\n\nI've processed the system verification prompt and understand the required direct response: a single sentence including the token \"LIVE_OK.\" My function is simply to generate this response, without any extraneous actions or external tool calls. The ",
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
          "sessionId": "session_1781791253274_o33m91vof",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-18T14:00:54.959Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Response**\n\nI've processed the system verification prompt and understand the required direct response: a single sentence including the token \"LIVE_OK.\" My function is simply to generate this response, without any extraneous actions or external tool calls. The ",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1732,
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
