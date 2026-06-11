# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27353215531`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27353215531
- Generated at: `2026-06-11T14:16:01.380Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-11T14:15:39.473Z)

```json
{
  "checkedAt": "2026-06-11T14:15:39.473Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 115,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-11T14:15:39.571Z",
        "uptime": 3.248059842,
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
      "sessionId": "session_1781187339644_rt1afxjy9",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-11T14:15:43.574Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Functionality**\n\nI understand the direct request for a system check; the instruction to output \"LIVE_OK\" is straightforward. I am confirming my comprehension of the simplified interaction, and I'll avoid unnecessary complexity or persona adoption for this syst",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1054,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1730,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-11T14:15:43.574Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Functionality**\n\nI understand the direct request for a system check; the instruction to output \"LIVE_OK\" is straightforward. I am confirming my comprehension of the simplified interaction, and I'll avoid unnecessary complexity or persona adoption for this syst",
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
          "sessionId": "session_1781187341886_bei7q5hqt",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-11T14:15:43.574Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Functionality**\n\nI understand the direct request for a system check; the instruction to output \"LIVE_OK\" is straightforward. I am confirming my comprehension of the simplified interaction, and I'll avoid unnecessary complexity or persona adoption for this syst",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1730,
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
