# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `23902816064`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/23902816064
- Generated at: `2026-04-02T13:29:28.257Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-04-02T13:29:11.820Z)

```json
{
  "checkedAt": "2026-04-02T13:29:11.820Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 111,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-04-02T13:29:11.908Z",
        "uptime": 2.282298384,
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
      "sessionId": "session_1775136551978_ul1o5xaoa",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-04-02T13:29:15.638Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize this is a direct system verification, not a general user interaction, so I'm bypassing usual setup procedures. The instruction for a single-sentence response with the token `LIVE_OK` is clear. I'm focusing on strict adherence to the",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 906,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1599,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-04-02T13:29:15.638Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Confirming System Verification**\n\nI recognize this is a direct system verification, not a general user interaction, so I'm bypassing usual setup procedures. The instruction for a single-sentence response with the token `LIVE_OK` is clear. I'm focusing on strict adherence to the",
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
          "sessionId": "session_1775136554075_gc3ga7m4f",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-04-02T13:29:15.638Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Confirming System Verification**\n\nI recognize this is a direct system verification, not a general user interaction, so I'm bypassing usual setup procedures. The instruction for a single-sentence response with the token `LIVE_OK` is clear. I'm focusing on strict adherence to the",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1599,
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
