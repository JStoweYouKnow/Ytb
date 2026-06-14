# Production Verification Report

This file is auto-generated from the latest successful **Production Verification** workflow run.

## Source

- Workflow run ID: `27500415582`
- Workflow run URL: https://github.com/JStoweYouKnow/Ytb/actions/runs/27500415582
- Generated at: `2026-06-14T13:31:32.932Z`

## Command

```bash
npm run verify:production
```

## Latest Result (2026-06-14T13:31:15.455Z)

```json
{
  "checkedAt": "2026-06-14T13:31:15.455Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 115,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-06-14T13:31:15.553Z",
        "uptime": 2.516253625,
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
      "sessionId": "session_1781443875616_vcuywsl1a",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": true,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "serverContentSample": {
        "capturedAt": "2026-06-14T13:31:19.363Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing the System Check**\n\nI've zeroed in on the task: a straightforward system check. The critical factors are the succinct response format and the required \"LIVE_OK\" token inclusion. I'm focusing solely on compliant response generation, bypassing all unrelated consideratio",
        "textPartCount": 1,
        "audioMimeTypes": [],
        "functionCalls": [],
        "totalParts": 1
      },
      "errors": [],
      "elapsedMs": 949,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    },
    "liveOutputProbe": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "attempts": 3,
      "elapsedMs": 1642,
      "result": "pass",
      "message": "Live output sample captured successfully",
      "sample": {
        "capturedAt": "2026-06-14T13:31:19.363Z",
        "turnComplete": false,
        "interrupted": false,
        "textPreview": "**Analyzing the System Check**\n\nI've zeroed in on the task: a straightforward system check. The critical factors are the succinct response format and the required \"LIVE_OK\" token inclusion. I'm focusing solely on compliant response generation, bypassing all unrelated consideratio",
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
          "sessionId": "session_1781443877756_yefj10c7r",
          "sawServerContent": true,
          "sawToolCall": false,
          "serverContentSample": {
            "capturedAt": "2026-06-14T13:31:19.363Z",
            "turnComplete": false,
            "interrupted": false,
            "textPreview": "**Analyzing the System Check**\n\nI've zeroed in on the task: a straightforward system check. The critical factors are the succinct response format and the required \"LIVE_OK\" token inclusion. I'm focusing solely on compliant response generation, bypassing all unrelated consideratio",
            "textPartCount": 1,
            "audioMimeTypes": [],
            "functionCalls": [],
            "totalParts": 1
          },
          "elapsedMs": 1642,
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
