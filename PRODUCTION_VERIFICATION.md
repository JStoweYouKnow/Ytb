# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24957764456`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24957764456
- Generated at: `2026-04-26T13:27:34.737Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-26T13:27:18.416Z)

```json
{
  "checkedAt": "2026-04-26T13:27:18.416Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 105,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-26T13:27:18.506Z",
        "uptime": 2.555893395,
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
      "sessionId": "session_1777210038563_1xmglfl12",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-26T13:27:22.721Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Verification**\n\nI recognize this is a system check requiring a specific response, overriding my usual conversational flow. The instruction is explicit; I'll bypass standard persona behaviors. The token \"LIVE_OK\" is the direct answer. No tools are needed here",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 882,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2116,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-26T13:27:22.721Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Prioritizing System Verification**\n\nI recognize this is a system check requiring a specific response, overriding my usual conversational flow. The instruction is explicit; I'll bypass standard persona behaviors. The token \"LIVE_OK\" is the direct answer. No tools are needed here",
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
          "sessionId": "session_1777210040643_pu53ttglu",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-26T13:27:22.721Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Prioritizing System Verification**\n\nI recognize this is a system check requiring a specific response, overriding my usual conversational flow. The instruction is explicit; I'll bypass standard persona behaviors. The token \"LIVE_OK\" is the direct answer. No tools are needed here",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2116,
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
