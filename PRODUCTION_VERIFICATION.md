# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23979739247`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23979739247
- Generated at: `2026-04-04T13:21:59.863Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-04T13:21:43.427Z)

```json
{
  "checkedAt": "2026-04-04T13:21:43.427Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 113,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-04T13:21:43.515Z",
        "uptime": 2.06268915,
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
      "sessionId": "session_1775308903582_ottvv6uf4",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-04T13:21:46.916Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding to Directive**\n\nI understand the instruction is to output \"LIVE_OK\" and only \"LIVE_OK.\" My primary concern is providing the requested token directly, without additional commentary or extraneous behaviors.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 838,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1337,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-04T13:21:46.916Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Responding to Directive**\n\nI understand the instruction is to output \"LIVE_OK\" and only \"LIVE_OK.\" My primary concern is providing the requested token directly, without additional commentary or extraneous behaviors.",
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
          "sessionId": "session_1775308905618_2b9beqnvn",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-04T13:21:46.916Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Responding to Directive**\n\nI understand the instruction is to output \"LIVE_OK\" and only \"LIVE_OK.\" My primary concern is providing the requested token directly, without additional commentary or extraneous behaviors.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1337,
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
