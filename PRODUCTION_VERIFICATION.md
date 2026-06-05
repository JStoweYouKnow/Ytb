# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27019099556`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27019099556
- Generated at: `2026-06-05T13:56:39.593Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-05T13:56:18.682Z)

```json
{
  "checkedAt": "2026-06-05T13:56:18.682Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 120,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-05T13:56:18.775Z",
        "uptime": 3.625776876,
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
      "sessionId": "session_1780667778849_197iumouw",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-05T13:56:23.232Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Complying with Instructions**\n\nI've processed the direct instruction for the system check. My focus is now on delivering the specific response requested. I am prioritizing a concise, direct answer that meets the constraint of including `LIVE_OK` in a single short sentence, over",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1265,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1963,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-05T13:56:23.232Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Complying with Instructions**\n\nI've processed the direct instruction for the system check. My focus is now on delivering the specific response requested. I am prioritizing a concise, direct answer that meets the constraint of including `LIVE_OK` in a single short sentence, over",
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
          "sessionId": "session_1780667781310_v8sbxgzk3",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-05T13:56:23.232Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Complying with Instructions**\n\nI've processed the direct instruction for the system check. My focus is now on delivering the specific response requested. I am prioritizing a concise, direct answer that meets the constraint of including `LIVE_OK` in a single short sentence, over",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1963,
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
