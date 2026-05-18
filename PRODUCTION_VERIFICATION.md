# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26038768116`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26038768116
- Generated at: `2026-05-18T14:09:39.035Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-18T14:09:17.760Z)

```json
{
  "checkedAt": "2026-05-18T14:09:17.760Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 156,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-18T14:09:17.877Z",
        "uptime": 2.486247488,
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
      "sessionId": "session_1779113357960_2und9xh90",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-18T14:09:21.612Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've streamlined my focus to address the core instruction. My primary objective is to generate the exact phrase \"LIVE_OK\" as a direct answer, avoiding any unnecessary context or persona elements.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 792,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1703,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-18T14:09:21.612Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing Direct Response**\n\nI've streamlined my focus to address the core instruction. My primary objective is to generate the exact phrase \"LIVE_OK\" as a direct answer, avoiding any unnecessary context or persona elements.",
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
          "sessionId": "session_1779113359947_ghg1s67ee",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-18T14:09:21.612Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing Direct Response**\n\nI've streamlined my focus to address the core instruction. My primary objective is to generate the exact phrase \"LIVE_OK\" as a direct answer, avoiding any unnecessary context or persona elements.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1702,
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
