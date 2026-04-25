# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `24931949306`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/24931949306
- Generated at: `2026-04-25T13:27:08.469Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-25T13:26:52.893Z)

```json
{
  "checkedAt": "2026-04-25T13:26:52.893Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 109,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-25T13:26:52.984Z",
        "uptime": 2.655478491,
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
      "sessionId": "session_1777123613041_6n0rgvapm",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-25T13:26:56.670Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Instruction Adherence**\n\nI've processed the user's explicit directive. My focus remains on delivering the \"LIVE_OK\" token as the sole output, directly addressing the requirement for system verification without any added content or use of external resources. The task ",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 871,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1595,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-25T13:26:56.670Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Instruction Adherence**\n\nI've processed the user's explicit directive. My focus remains on delivering the \"LIVE_OK\" token as the sole output, directly addressing the requirement for system verification without any added content or use of external resources. The task ",
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
          "sessionId": "session_1777123615112_20tj9aflt",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-25T13:26:56.670Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Instruction Adherence**\n\nI've processed the user's explicit directive. My focus remains on delivering the \"LIVE_OK\" token as the sole output, directly addressing the requirement for system verification without any added content or use of external resources. The task ",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1595,
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
