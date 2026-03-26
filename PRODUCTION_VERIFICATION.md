# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23596884062`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23596884062
- Generated at: `2026-03-26T13:29:40.620Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-26T13:29:23.706Z)

```json
{
  "checkedAt": "2026-03-26T13:29:23.706Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 105,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-26T13:29:23.795Z",
        "uptime": 2.615786908,
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
      "sessionId": "session_1774531763856_hljlw9b5f",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-03-26T13:29:27.591Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Instruction Adherence**\n\nI've assessed the system verification check and the imperative to deliver a concise response: \"LIVE_OK.\" The constraints are explicit; I'm to focus solely on the instruction, disregarding any agentic behavior or persona logic. The goal is pin",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 889,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1691,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-03-26T13:29:27.591Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Instruction Adherence**\n\nI've assessed the system verification check and the imperative to deliver a concise response: \"LIVE_OK.\" The constraints are explicit; I'm to focus solely on the instruction, disregarding any agentic behavior or persona logic. The goal is pin",
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
          "sessionId": "session_1774531765955_0g7gh63ia",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-03-26T13:29:27.591Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Instruction Adherence**\n\nI've assessed the system verification check and the imperative to deliver a concise response: \"LIVE_OK.\" The constraints are explicit; I'm to focus solely on the instruction, disregarding any agentic behavior or persona logic. The goal is pin",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1691,
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
