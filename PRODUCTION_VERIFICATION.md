# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25280456834`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25280456834
- Generated at: `2026-05-03T13:28:51.300Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-03T13:28:34.421Z)

```json
{
  "checkedAt": "2026-05-03T13:28:34.421Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 148,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-03T13:28:34.542Z",
        "uptime": 2.009651341,
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
      "sessionId": "session_1777814914642_qw16hsggn",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-03T13:28:39.876Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Instruction Compliance**\n\nI've processed the verification message. The instruction is explicit: provide \"LIVE_OK\" in a single short sentence. I am now prepared to provide the response without any deviation or additional steps.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 797,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 3309,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-03T13:28:39.876Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verifying Instruction Compliance**\n\nI've processed the verification message. The instruction is explicit: provide \"LIVE_OK\" in a single short sentence. I am now prepared to provide the response without any deviation or additional steps.",
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
          "sessionId": "session_1777814916630_60nzbkaln",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-03T13:28:39.876Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verifying Instruction Compliance**\n\nI've processed the verification message. The instruction is explicit: provide \"LIVE_OK\" in a single short sentence. I am now prepared to provide the response without any deviation or additional steps.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 3308,
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
