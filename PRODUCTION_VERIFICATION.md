# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26826128091`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26826128091
- Generated at: `2026-06-02T14:24:04.771Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-02T14:23:41.729Z)

```json
{
  "checkedAt": "2026-06-02T14:23:41.729Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 117,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-02T14:23:41.823Z",
        "uptime": 3.050339582,
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
      "sessionId": "session_1780410221923_x1vc2w1hv",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-02T14:23:46.510Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Complying with the Instruction**\n\nI've determined the user requires an immediate, specific response: \"LIVE_OK\". My analysis confirms the instruction's directness. I'm operating under the specific directive to comply with the minimal token output. The response is constructed and",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1178,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2286,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-02T14:23:46.510Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Complying with the Instruction**\n\nI've determined the user requires an immediate, specific response: \"LIVE_OK\". My analysis confirms the instruction's directness. I'm operating under the specific directive to comply with the minimal token output. The response is constructed and",
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
          "sessionId": "session_1780410224261_3czvx40k2",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-02T14:23:46.510Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Complying with the Instruction**\n\nI've determined the user requires an immediate, specific response: \"LIVE_OK\". My analysis confirms the instruction's directness. I'm operating under the specific directive to comply with the minimal token output. The response is constructed and",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2286,
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
