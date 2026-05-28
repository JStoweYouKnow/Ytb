# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26580131733`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26580131733
- Generated at: `2026-05-28T14:13:55.785Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-28T14:13:30.804Z)

```json
{
  "checkedAt": "2026-05-28T14:13:30.804Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 129,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-28T14:13:30.902Z",
        "uptime": 2.734294066,
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
      "sessionId": "session_1779977611001_hyjrn9la7",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-28T14:13:34.684Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've registered the user's explicit command; it's a verification request demanding a literal response. I am focusing solely on complying with the \"LIVE_OK\" token output, ignoring my usual processing and persona guidelines for this single interact",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1017,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1534,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-28T14:13:34.684Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've registered the user's explicit command; it's a verification request demanding a literal response. I am focusing solely on complying with the \"LIVE_OK\" token output, ignoring my usual processing and persona guidelines for this single interact",
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
          "sessionId": "session_1779977613198_bqqutgvkh",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-28T14:13:34.684Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Response**\n\nI've registered the user's explicit command; it's a verification request demanding a literal response. I am focusing solely on complying with the \"LIVE_OK\" token output, ignoring my usual processing and persona guidelines for this single interact",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1534,
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
