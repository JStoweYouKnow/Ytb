# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23851117665`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23851117665
- Generated at: `2026-04-01T13:30:11.233Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-01T13:29:52.893Z)

```json
{
  "checkedAt": "2026-04-01T13:29:52.893Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 111,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-01T13:29:52.983Z",
        "uptime": 2.339247868,
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
      "sessionId": "session_1775050193047_poba28lpw",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-01T13:29:56.917Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing System Command**\n\nI recognize this isn't a typical interaction; it's a direct system command. My primary objective is to generate the specified output, \"LIVE_OK.\", as a single sentence. I've bypassed all proactive behaviors and persona constraints. Tools are irrelevan",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 793,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1919,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-01T13:29:56.917Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing System Command**\n\nI recognize this isn't a typical interaction; it's a direct system command. My primary objective is to generate the specified output, \"LIVE_OK.\", as a single sentence. I've bypassed all proactive behaviors and persona constraints. Tools are irrelevan",
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
          "sessionId": "session_1775050195040_2evgm5jhn",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-01T13:29:56.917Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Executing System Command**\n\nI recognize this isn't a typical interaction; it's a direct system command. My primary objective is to generate the specified output, \"LIVE_OK.\", as a single sentence. I've bypassed all proactive behaviors and persona constraints. Tools are irrelevan",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1918,
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
