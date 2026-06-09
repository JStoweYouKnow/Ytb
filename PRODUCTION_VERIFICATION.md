# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27210737658`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27210737658
- Generated at: `2026-06-09T13:49:29.416Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-09T13:49:12.420Z)

```json
{
  "checkedAt": "2026-06-09T13:49:12.420Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 127,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-09T13:49:12.519Z",
        "uptime": 2.725912079,
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
      "sessionId": "session_1781012952600_6poi8b63y",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-09T13:49:16.169Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've homed in on the core of this task. The directive is crystal clear: provide a specific token, LIVE_OK, in a single sentence. I am now focused exclusively on executing this instruction, avoiding any extraneous processing. My priority is accura",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 926,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1494,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-09T13:49:16.169Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've homed in on the core of this task. The directive is crystal clear: provide a specific token, LIVE_OK, in a single sentence. I am now focused exclusively on executing this instruction, avoiding any extraneous processing. My priority is accura",
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
          "sessionId": "session_1781012954726_8bbdpbkdl",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-09T13:49:16.169Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Response**\n\nI've homed in on the core of this task. The directive is crystal clear: provide a specific token, LIVE_OK, in a single sentence. I am now focused exclusively on executing this instruction, avoiding any extraneous processing. My priority is accura",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1494,
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
