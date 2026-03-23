# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23439724275`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23439724275
- Generated at: `2026-03-23T13:29:06.443Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-23T13:28:46.830Z)

```json
{
  "checkedAt": "2026-03-23T13:28:46.830Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 115,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-23T13:28:46.923Z",
        "uptime": 3.080353249,
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
      "sessionId": "session_1774272526988_3jdtfcny2",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-23T13:28:50.826Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Integrity**\n\nI've processed the verification request, recognizing its unique nature as a system check that supersedes regular interaction protocols. I understand I must respond with a short sentence containing the token `LIVE_OK`. I'll prioritize adherence to ",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 990,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1690,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-23T13:28:50.826Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Integrity**\n\nI've processed the verification request, recognizing its unique nature as a system check that supersedes regular interaction protocols. I understand I must respond with a short sentence containing the token `LIVE_OK`. I'll prioritize adherence to ",
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
          "sessionId": "session_1774272529176_jbqvrt2fa",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-23T13:28:50.826Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Integrity**\n\nI've processed the verification request, recognizing its unique nature as a system check that supersedes regular interaction protocols. I understand I must respond with a short sentence containing the token `LIVE_OK`. I'll prioritize adherence to ",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1688,
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
