# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `26291424360`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/26291424360
- Generated at: `2026-05-22T13:45:19.744Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-05-22T13:45:02.253Z)

```json
{
  "checkedAt": "2026-05-22T13:45:02.253Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 111,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-05-22T13:45:02.342Z",
        "uptime": 2.666992704,
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
      "sessionId": "session_1779457502408_bgb18gqyq",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-05-22T13:45:06.372Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing Verification Protocol**\n\nI've processed the input as a system verification, overriding the usual persona. The instruction is clear: a single short sentence including \"LIVE_OK.\" No tools are necessary, as this is solely a verification step.",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 847,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1959,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-05-22T13:45:06.372Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Executing Verification Protocol**\n\nI've processed the input as a system verification, overriding the usual persona. The instruction is clear: a single short sentence including \"LIVE_OK.\" No tools are necessary, as this is solely a verification step.",
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
          "sessionId": "session_1779457504452_o6gmgafvv",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-05-22T13:45:06.372Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Executing Verification Protocol**\n\nI've processed the input as a system verification, overriding the usual persona. The instruction is clear: a single short sentence including \"LIVE_OK.\" No tools are necessary, as this is solely a verification step.",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1959,
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
