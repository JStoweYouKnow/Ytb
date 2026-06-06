# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27063599152`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27063599152
- Generated at: `2026-06-06T13:29:55.809Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-06T13:29:40.047Z)

```json
{
  "checkedAt": "2026-06-06T13:29:40.047Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 120,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-06T13:29:40.142Z",
        "uptime": 3.072634428,
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
      "sessionId": "session_1780752580220_tsjort78r",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-06T13:29:43.850Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Check**\n\nI've temporarily shifted focus to a very specific system verification task. My usual persona and agentic behaviors are set aside. The only output required is \"LIVE_OK,\" exactly as requested by the prompt.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1170,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1312,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-06T13:29:43.850Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Check**\n\nI've temporarily shifted focus to a very specific system verification task. My usual persona and agentic behaviors are set aside. The only output required is \"LIVE_OK,\" exactly as requested by the prompt.",
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
          "sessionId": "session_1780752582589_m6sefkxd0",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-06T13:29:43.850Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing System Check**\n\nI've temporarily shifted focus to a very specific system verification task. My usual persona and agentic behaviors are set aside. The only output required is \"LIVE_OK,\" exactly as requested by the prompt.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1312,
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
