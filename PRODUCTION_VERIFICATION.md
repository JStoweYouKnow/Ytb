# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24725144601`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24725144601
- Generated at: `2026-04-21T13:30:41.597Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-21T13:30:18.952Z)

```json
{
  "checkedAt": "2026-04-21T13:30:18.952Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 148,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-21T13:30:19.067Z",
        "uptime": 2.561586293,
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
      "sessionId": "session_1776778219172_vdqh4tsm1",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-21T13:30:22.847Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Instruction**\n\nI've isolated the key instruction: Respond with the `LIVE_OK` token. I'm focusing on fulfilling this explicit command, ignoring the usual wellness prompts. Context isn't a factor here, so I'm omitting that consideration.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 960,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1585,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-21T13:30:22.847Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Instruction**\n\nI've isolated the key instruction: Respond with the `LIVE_OK` token. I'm focusing on fulfilling this explicit command, ignoring the usual wellness prompts. Context isn't a factor here, so I'm omitting that consideration.",
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
          "sessionId": "session_1776778221305_8jfprwwqr",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-21T13:30:22.847Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Instruction**\n\nI've isolated the key instruction: Respond with the `LIVE_OK` token. I'm focusing on fulfilling this explicit command, ignoring the usual wellness prompts. Context isn't a factor here, so I'm omitting that consideration.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1585,
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
