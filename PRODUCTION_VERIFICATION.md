# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24245323155`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24245323155
- Generated at: `2026-04-10T13:29:30.914Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-10T13:29:13.991Z)

```json
{
  "checkedAt": "2026-04-10T13:29:13.991Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 160,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-10T13:29:14.116Z",
        "uptime": 2.69735865,
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
      "sessionId": "session_1775827754217_uz1g1vo6f",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-10T13:29:18.345Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Formulating Direct Answer**\n\nI've determined this is a system check and not a typical user query. My focus shifted to bypassing the normal persona setup. I am now formulating a precise, one-sentence response incorporating \"LIVE_OK\" as instructed: \"Verification successful. LIVE_",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1050,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1943,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-10T13:29:18.345Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Formulating Direct Answer**\n\nI've determined this is a system check and not a typical user query. My focus shifted to bypassing the normal persona setup. I am now formulating a precise, one-sentence response incorporating \"LIVE_OK\" as instructed: \"Verification successful. LIVE_",
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
          "sessionId": "session_1775827756456_x4nmcjbmb",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-10T13:29:18.345Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Formulating Direct Answer**\n\nI've determined this is a system check and not a typical user query. My focus shifted to bypassing the normal persona setup. I am now formulating a precise, one-sentence response incorporating \"LIVE_OK\" as instructed: \"Verification successful. LIVE_",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1942,
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
