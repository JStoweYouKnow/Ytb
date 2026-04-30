# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `25168223271`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/25168223271
- Generated at: `2026-04-30T13:31:40.308Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-30T13:31:18.996Z)

```json
{
  "checkedAt": "2026-04-30T13:31:18.996Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 123,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-30T13:31:19.095Z",
        "uptime": 2.093550735,
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
      "sessionId": "session_1777555879187_qf3vkow0l",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-30T13:31:22.765Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Directives Adherence**\n\nI've processed the verification request and distilled it to its core instruction: deliver the token `LIVE_OK` within a single sentence. All other elements, like persona or extraneous information, are considered irrelevant. The task's simplicit",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 907,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1535,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-30T13:31:22.765Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming Directives Adherence**\n\nI've processed the verification request and distilled it to its core instruction: deliver the token `LIVE_OK` within a single sentence. All other elements, like persona or extraneous information, are considered irrelevant. The task's simplicit",
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
          "sessionId": "session_1777555881293_8pycj9vly",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-30T13:31:22.765Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming Directives Adherence**\n\nI've processed the verification request and distilled it to its core instruction: deliver the token `LIVE_OK` within a single sentence. All other elements, like persona or extraneous information, are considered irrelevant. The task's simplicit",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1535,
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
