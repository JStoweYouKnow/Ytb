# Production Verification Report

This file provides reproducible runtime evidence for the production deployment.

## Command

```bash
npm run verify:production
```

## Latest Result (2026-03-15)

```json
{
  "checkedAt": "2026-03-15T01:20:48.965Z",
  "targetUrl": "https://ashanti-6exqtj2u2q-uc.a.run.app",
  "stage": {
    "health": {
      "result": "pass",
      "elapsedMs": 201,
      "payload": {
        "status": "healthy",
        "timestamp": "2026-03-15T01:20:49.132Z",
        "uptime": 721.018174027
      }
    },
    "websocketLivePath": {
      "wsUrl": "wss://ashanti-6exqtj2u2q-uc.a.run.app/ws",
      "opened": true,
      "connectedToGemini": true,
      "sessionId": "session_1773537649267_j222os0er",
      "sentImageChunk": true,
      "sentAudioChunk": true,
      "sentTextTurn": true,
      "sawServerContent": false,
      "sawToolCall": false,
      "sawAudioChunk": false,
      "sawTextPart": false,
      "errors": [],
      "elapsedMs": 421,
      "result": "pass",
      "message": "Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)"
    }
  },
  "result": "pass"
}
```

## Interpretation

- Cloud Run service is healthy.
- The real production websocket live path works (`/ws` + Gemini session open).
- Multimodal payloads (image, audio, and text) are successfully sent during the live session.
- This run did not receive a model content event before session close, but still verifies runtime connectivity and multimodal ingress on the production stack.
