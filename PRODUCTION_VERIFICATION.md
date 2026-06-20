# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27872641249`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27872641249
- Generated at: `2026-06-20T13:31:28.436Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-20T13:31:10.255Z)

```json
{
  "checkedAt": "2026-06-20T13:31:10.255Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 125,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-20T13:31:10.354Z",
        "uptime": 3.095238417,
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
      "sessionId": "session_1781962270438_fs01u7bzj",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-20T13:31:14.174Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Generating Direct Response**\n\nI've processed the verification prompt and am now focused on generating the required output. The instruction dictates a precise, concise response containing \"LIVE_OK.\" I've confirmed that no external tools or further analysis are necessary. My focu",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 1076,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1515,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-20T13:31:14.174Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Generating Direct Response**\n\nI've processed the verification prompt and am now focused on generating the required output. The instruction dictates a precise, concise response containing \"LIVE_OK.\" I've confirmed that no external tools or further analysis are necessary. My focu",
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
          "sessionId": "session_1781962272705_ax40ylr1b",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-20T13:31:14.174Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Generating Direct Response**\n\nI've processed the verification prompt and am now focused on generating the required output. The instruction dictates a precise, concise response containing \"LIVE_OK.\" I've confirmed that no external tools or further analysis are necessary. My focu",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1515,
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
