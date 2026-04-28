# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25055836165`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25055836165
- Generated at: `2026-04-28T13:32:12.427Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-28T13:31:55.218Z)

```json
{
  "checkedAt": "2026-04-28T13:31:55.218Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 130,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-28T13:31:55.320Z",
        "uptime": 2.053027614,
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
      "sessionId": "session_1777383115401_l33adeegf",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-28T13:31:58.901Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verify System Prompt Response**\n\nI've zeroed in on the critical instruction: the response *must* be `LIVE_OK`. It's a precise system check, demanding absolute adherence to the specified token and nothing more. I understand to avoid any extraneous actions.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 763,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1588,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-28T13:31:58.901Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Verify System Prompt Response**\n\nI've zeroed in on the critical instruction: the response *must* be `LIVE_OK`. It's a precise system check, demanding absolute adherence to the specified token and nothing more. I understand to avoid any extraneous actions.",
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
          "sessionId": "session_1777383117361_70d9ikam9",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-28T13:31:58.901Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Verify System Prompt Response**\n\nI've zeroed in on the critical instruction: the response *must* be `LIVE_OK`. It's a precise system check, demanding absolute adherence to the specified token and nothing more. I understand to avoid any extraneous actions.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1588,
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
