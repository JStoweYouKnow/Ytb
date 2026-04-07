# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24083952369`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24083952369
- Generated at: `2026-04-07T13:29:53.667Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-07T13:29:36.493Z)

```json
{
  "checkedAt": "2026-04-07T13:29:36.493Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 111,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-07T13:29:36.582Z",
        "uptime": 3.024151229,
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
      "sessionId": "session_1775568576656_8aa7nsden",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-07T13:29:40.258Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Instructions Directly**\n\nI've received a straightforward instruction: to respond with \"LIVE_OK\". My focus remains on adhering precisely to this directive for live output verification. No persona, tool use, or further reasoning is required in this scenario.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1106,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1346,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-07T13:29:40.258Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Instructions Directly**\n\nI've received a straightforward instruction: to respond with \"LIVE_OK\". My focus remains on adhering precisely to this directive for live output verification. No persona, tool use, or further reasoning is required in this scenario.",
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
          "sessionId": "session_1775568578951_m3l0xsa32",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-07T13:29:40.258Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Instructions Directly**\n\nI've received a straightforward instruction: to respond with \"LIVE_OK\". My focus remains on adhering precisely to this directive for live output verification. No persona, tool use, or further reasoning is required in this scenario.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1346,
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
