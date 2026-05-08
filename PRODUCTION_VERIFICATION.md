# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25558339896`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25558339896
- Generated at: `2026-05-08T13:31:17.609Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-08T13:30:55.532Z)

```json
{
  "checkedAt": "2026-05-08T13:30:55.532Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 117,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-08T13:30:55.625Z",
        "uptime": 2.419979421,
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
      "sessionId": "session_1778247055695_95tgacu9g",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-08T13:31:00.031Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Live Output**\n\nI have processed the request as a direct directive. My response will be \"LIVE_OK.\" I understand the immediate need for verification and am executing the response accordingly. I am focusing on precision to meet the exact output specification.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 934,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 2246,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-08T13:31:00.031Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Live Output**\n\nI have processed the request as a direct directive. My response will be \"LIVE_OK.\" I understand the immediate need for verification and am executing the response accordingly. I am focusing on precision to meet the exact output specification.",
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
          "sessionId": "session_1778247057822_am0o00dnf",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-08T13:31:00.031Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Live Output**\n\nI have processed the request as a direct directive. My response will be \"LIVE_OK.\" I understand the immediate need for verification and am executing the response accordingly. I am focusing on precision to meet the exact output specification.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 2246,
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
