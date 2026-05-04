# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25321903395`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25321903395
- Generated at: `2026-05-04T13:31:50.938Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-04T13:31:27.242Z)

```json
{
  "checkedAt": "2026-05-04T13:31:27.242Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 148,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-04T13:31:27.369Z",
        "uptime": 2.011872202,
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
      "sessionId": "session_1777901487449_2sfn5b4ow",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-04T13:31:31.226Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Directives**\n\nI've zeroed in on the explicit instruction for a system check, realizing the need for precision. The core requirement is delivering \"LIVE_OK.\" as a single, standalone sentence. My analysis confirms that no additional tools are necessary for this simple v",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 802,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1832,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-04T13:31:31.226Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Directives**\n\nI've zeroed in on the explicit instruction for a system check, realizing the need for precision. The core requirement is delivering \"LIVE_OK.\" as a single, standalone sentence. My analysis confirms that no additional tools are necessary for this simple v",
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
          "sessionId": "session_1777901489446_102ufs9ij",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-04T13:31:31.226Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Directives**\n\nI've zeroed in on the explicit instruction for a system check, realizing the need for precision. The core requirement is delivering \"LIVE_OK.\" as a single, standalone sentence. My analysis confirms that no additional tools are necessary for this simple v",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1832,
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
