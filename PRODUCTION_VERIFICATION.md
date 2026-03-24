# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23491934068`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23491934068
- Generated at: `2026-03-24T13:29:27.329Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-24T13:29:08.408Z)

```json
{
  "checkedAt": "2026-03-24T13:29:08.408Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 152,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-24T13:29:08.528Z",
        "uptime": 2.658871787,
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
      "sessionId": "session_1774358948617_cuisx31cm",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-24T13:29:12.360Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Instruction**\n\nI've isolated the key instruction: Respond with the `LIVE_OK` token. I'm focusing on fulfilling this explicit command, ignoring the usual wellness prompts. Context isn't a factor here, so I'm omitting that consideration.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1001,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1598,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-24T13:29:12.360Z",
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
          "sessionId": "session_1774358950832_3ommo03uq",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-24T13:29:12.360Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Instruction**\n\nI've isolated the key instruction: Respond with the `LIVE_OK` token. I'm focusing on fulfilling this explicit command, ignoring the usual wellness prompts. Context isn't a factor here, so I'm omitting that consideration.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1598,
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
