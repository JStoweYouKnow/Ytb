# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24781054263`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24781054263
- Generated at: `2026-04-22T13:30:31.875Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-22T13:30:10.482Z)

```json
{
  "checkedAt": "2026-04-22T13:30:10.482Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 116,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-22T13:30:10.572Z",
        "uptime": 2.483605432,
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
      "sessionId": "session_1776864610663_7uyqixbho",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-22T13:30:14.561Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Directives Promptly**\n\nI've streamlined the process for this verification check, focusing solely on immediate instruction execution. My response will be a single, direct sentence: \"Verification successful, LIVE_OK.\" No extraneous processing or tools are needed; the a",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 891,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1869,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-22T13:30:14.561Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Directives Promptly**\n\nI've streamlined the process for this verification check, focusing solely on immediate instruction execution. My response will be a single, direct sentence: \"Verification successful, LIVE_OK.\" No extraneous processing or tools are needed; the a",
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
          "sessionId": "session_1776864612767_046m2g0cp",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-22T13:30:14.561Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Directives Promptly**\n\nI've streamlined the process for this verification check, focusing solely on immediate instruction execution. My response will be a single, direct sentence: \"Verification successful, LIVE_OK.\" No extraneous processing or tools are needed; the a",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1869,
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
