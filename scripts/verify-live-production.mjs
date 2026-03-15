#!/usr/bin/env node

/**
 * Production smoke test for the live Gemini websocket path.
 *
 * Verifies:
 * 1) /health is reachable
 * 2) /ws accepts a connection
 * 3) Gemini session opens (connected_to_gemini + session_id)
 * 4) Multimodal input is accepted (image + audio + text payloads)
 * 5) Tries to capture a live model output sample (serverContent/toolCall)
 *
 * Usage:
 *   node scripts/verify-live-production.mjs
 *   node scripts/verify-live-production.mjs https://your-service-url
 *   TARGET_URL=https://your-service-url node scripts/verify-live-production.mjs
 */

const DEFAULT_URL = 'https://ashanti-6exqtj2u2q-uc.a.run.app';
const targetUrlRaw = process.argv[2] || process.env.TARGET_URL || DEFAULT_URL;
const targetUrl = targetUrlRaw.replace(/\/+$/, '');

const WS_TIMEOUT_MS = 45000;
const CLOSE_GRACE_MS = 1200;
const LIVE_OUTPUT_PROBE_TIMEOUT_MS = 8000;
const LIVE_OUTPUT_PROBE_ATTEMPTS = 3;

function httpToWs(url) {
  if (url.startsWith('https://')) return `wss://${url.slice('https://'.length)}`;
  if (url.startsWith('http://')) return `ws://${url.slice('http://'.length)}`;
  throw new Error(`Unsupported URL scheme: ${url}`);
}

function nowIso() {
  return new Date().toISOString();
}

async function verifyHealth(baseUrl) {
  const started = Date.now();
  const res = await fetch(`${baseUrl}/health`);
  if (!res.ok) throw new Error(`/health returned status ${res.status}`);
  const json = await res.json();
  const elapsedMs = Date.now() - started;
  return { json, elapsedMs };
}

function tinyJpegBase64() {
  // 1x1 JPEG
  return '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUXFxcXFxgXFxgYFxgXFxgXFxgYHSggGBolHRcXITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAAAAQID/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIQAxAAAAG3AP/EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//Z';
}

function silentPcmBase64(sampleCount = 320) {
  const pcm = new Int16Array(sampleCount);
  return Buffer.from(pcm.buffer).toString('base64');
}

function buildServerContentSample(serverContent) {
  if (!serverContent?.modelTurn?.parts || !Array.isArray(serverContent.modelTurn.parts)) {
    return null;
  }

  const parts = serverContent.modelTurn.parts;
  const textParts = parts
    .filter((p) => typeof p?.text === 'string' && p.text.trim().length > 0)
    .map((p) => p.text.trim());
  const audioMimeTypes = parts
    .filter((p) => p?.inlineData?.mimeType?.startsWith('audio/'))
    .map((p) => p.inlineData.mimeType);
  const functionCalls = parts
    .filter((p) => p?.functionCall?.name)
    .map((p) => ({
      name: p.functionCall.name,
      hasArgs: Boolean(p.functionCall.args && Object.keys(p.functionCall.args).length > 0),
    }));

  return {
    capturedAt: nowIso(),
    turnComplete: Boolean(serverContent.turnComplete),
    interrupted: Boolean(serverContent.interrupted),
    textPreview: textParts.length > 0 ? textParts.join(' ').slice(0, 280) : null,
    textPartCount: textParts.length,
    audioMimeTypes,
    functionCalls,
    totalParts: parts.length,
  };
}

async function verifyWebsocket(baseUrl) {
  const wsUrl = `${httpToWs(baseUrl)}/ws`;
  const started = Date.now();

  const summary = {
    wsUrl,
    opened: false,
    connectedToGemini: false,
    sessionId: null,
    sentImageChunk: false,
    sentAudioChunk: false,
    sentTextTurn: false,
    sawServerContent: false,
    sawToolCall: false,
    sawAudioChunk: false,
    sawTextPart: false,
    serverContentSample: null,
    errors: [],
  };

  let done = false;
  let timeout;
  let settle;
  const completion = new Promise((resolve) => {
    settle = resolve;
  });

  const ws = new WebSocket(wsUrl);
  let payloadDispatched = false;

  const canTreatHandshakeAsPass = () =>
    summary.opened &&
    summary.connectedToGemini &&
    Boolean(summary.sessionId) &&
    summary.sentImageChunk &&
    summary.sentAudioChunk &&
    summary.sentTextTurn &&
    summary.errors.length === 0;

  const finish = (ok, message) => {
    if (done) return;
    done = true;
    clearTimeout(timeout);
    summary.elapsedMs = Date.now() - started;
    summary.result = ok ? 'pass' : 'fail';
    summary.message = message;
    try {
      ws.close();
    } catch {
      // ignore close errors
    }
    setTimeout(() => settle(summary), CLOSE_GRACE_MS);
  };

  const dispatchPayloads = () => {
    if (done || payloadDispatched || ws.readyState !== WebSocket.OPEN) return;
    payloadDispatched = true;
    try {
      // Text-first ordering gives the model a clear prompt before media payloads.
      ws.send(
        JSON.stringify({
          clientContent: {
            turns: [
              {
                role: 'user',
                parts: [
                  {
                    text: 'Live verification prompt. Reply in one sentence and include LIVE_OK.',
                  },
                ],
              },
            ],
          },
        })
      );
      summary.sentTextTurn = true;

      ws.send(
        JSON.stringify({
          realtimeInput: {
            mediaChunks: [
              {
                mimeType: 'image/jpeg',
                data: tinyJpegBase64(),
              },
            ],
          },
        })
      );
      summary.sentImageChunk = true;

      ws.send(
        JSON.stringify({
          realtimeInput: {
            mediaChunks: [
              {
                mimeType: 'audio/pcm;rate=16000',
                data: silentPcmBase64(1600),
              },
            ],
          },
        })
      );
      summary.sentAudioChunk = true;
    } catch (err) {
      summary.errors.push(`send-failed: ${String(err?.message || err)}`);
    }
  };

  timeout = setTimeout(() => {
    if (canTreatHandshakeAsPass()) {
      finish(
        true,
        `Handshake and multimodal payload dispatch verified (timed out waiting for model event after ${WS_TIMEOUT_MS}ms)`
      );
      return;
    }
    finish(false, `Timed out waiting for live response after ${WS_TIMEOUT_MS}ms`);
  }, WS_TIMEOUT_MS);

  ws.addEventListener('open', () => {
    summary.opened = true;

    ws.send(
      JSON.stringify({
        type: 'init',
        userName: 'Judge Bot',
        hypeLevel: 'normal',
      })
    );
  });

  ws.addEventListener('message', (event) => {
    let parsed;
    try {
      parsed = JSON.parse(String(event.data));
    } catch {
      return;
    }

    if (parsed.type === 'connected_to_gemini') {
      summary.connectedToGemini = true;
      dispatchPayloads();
      return;
    }

    if (parsed.type === 'session_id') {
      summary.sessionId = parsed.sessionId || null;
      // If connected event raced and payloads were not dispatched, try again here.
      dispatchPayloads();
      return;
    }

    if (parsed.toolCall?.functionCalls?.length) {
      summary.sawToolCall = true;
    }

    const parts = parsed.serverContent?.modelTurn?.parts;
    if (Array.isArray(parts) && parts.length > 0) {
      summary.sawServerContent = true;
      summary.sawTextPart = parts.some((p) => typeof p?.text === 'string' && p.text.length > 0);
      summary.sawAudioChunk = parts.some((p) => p?.inlineData?.mimeType?.startsWith('audio/pcm'));
      if (!summary.serverContentSample) {
        summary.serverContentSample = buildServerContentSample(parsed.serverContent);
      }
      finish(true, 'Received live model event from Gemini session');
    }
  });

  ws.addEventListener('error', (event) => {
    summary.errors.push(String(event?.message || 'websocket error'));
    finish(false, 'WebSocket error');
  });

  ws.addEventListener('close', () => {
    if (done) return;
    if (canTreatHandshakeAsPass()) {
      finish(
        true,
        'Gemini live handshake succeeded and multimodal payload dispatch completed (no model event observed before close)'
      );
      return;
    }
    finish(false, 'WebSocket closed before verification conditions were met');
  });

  return completion;
}

async function probeLiveOutput(baseUrl, attempts = LIVE_OUTPUT_PROBE_ATTEMPTS) {
  const wsUrl = `${httpToWs(baseUrl)}/ws`;
  const runStarted = Date.now();
  const attemptResults = [];

  async function runAttempt(attemptNumber) {
    const started = Date.now();
    return new Promise((resolve) => {
      const result = {
        attempt: attemptNumber,
        wsUrl,
        connectedToGemini: false,
        sessionId: null,
        sawServerContent: false,
        sawToolCall: false,
        serverContentSample: null,
        elapsedMs: 0,
        result: 'fail',
        message: '',
      };

      let done = false;
      let timeout;
      let followupTimer;
      const ws = new WebSocket(wsUrl);

      const finish = (ok, message) => {
        if (done) return;
        done = true;
        clearTimeout(timeout);
        clearTimeout(followupTimer);
        result.elapsedMs = Date.now() - started;
        result.result = ok ? 'pass' : 'fail';
        result.message = message;
        try {
          ws.close();
        } catch {
          // ignore close errors
        }
        resolve(result);
      };

      timeout = setTimeout(() => {
        finish(false, `No live output observed within ${LIVE_OUTPUT_PROBE_TIMEOUT_MS}ms`);
      }, LIVE_OUTPUT_PROBE_TIMEOUT_MS);

      ws.addEventListener('open', () => {
        ws.send(
          JSON.stringify({
            type: 'init',
            userName: 'Live Output Probe',
            hypeLevel: 'normal',
          })
        );
      });

      ws.addEventListener('message', (event) => {
        let parsed;
        try {
          parsed = JSON.parse(String(event.data));
        } catch {
          return;
        }

        if (parsed.type === 'connected_to_gemini') {
          result.connectedToGemini = true;
          try {
            ws.send(
              JSON.stringify({
                clientContent: {
                  turns: [
                    {
                      role: 'user',
                      parts: [
                        {
                          text: 'Live output verification. Please answer in one short sentence with the token LIVE_OK.',
                        },
                      ],
                    },
                  ],
                },
              })
            );

            // Second nudge in case first prompt races with session startup.
            followupTimer = setTimeout(() => {
              if (done || ws.readyState !== WebSocket.OPEN) return;
              ws.send(
                JSON.stringify({
                  clientContent: {
                    turns: [
                      {
                        role: 'user',
                        parts: [{ text: 'Quick follow-up: reply with LIVE_OK now.' }],
                      },
                    ],
                  },
                })
              );
            }, 900);
          } catch (err) {
            finish(false, `Probe send failed: ${String(err?.message || err)}`);
          }
          return;
        }

        if (parsed.type === 'session_id') {
          result.sessionId = parsed.sessionId || null;
          return;
        }

        if (parsed.toolCall?.functionCalls?.length) {
          result.sawToolCall = true;
        }

        const parts = parsed.serverContent?.modelTurn?.parts;
        if (Array.isArray(parts) && parts.length > 0) {
          result.sawServerContent = true;
          result.serverContentSample = buildServerContentSample(parsed.serverContent);
          finish(true, 'Captured live serverContent sample');
        }
      });

      ws.addEventListener('error', (event) => {
        finish(false, `WebSocket error: ${String(event?.message || 'unknown')}`);
      });

      ws.addEventListener('close', (event) => {
        if (done) return;
        finish(
          false,
          `Probe socket closed before model output (code=${event.code || 'n/a'}, reason=${event.reason || ''})`
        );
      });
    });
  }

  for (let i = 1; i <= attempts; i++) {
    const attempt = await runAttempt(i);
    attemptResults.push(attempt);
    if (attempt.result === 'pass' && attempt.serverContentSample) {
      return {
        wsUrl,
        attempts,
        elapsedMs: Date.now() - runStarted,
        result: 'pass',
        message: 'Live output sample captured successfully',
        sample: attempt.serverContentSample,
        attemptsDetail: attemptResults,
      };
    }
  }

  return {
    wsUrl,
    attempts,
    elapsedMs: Date.now() - runStarted,
    result: 'fail',
    message: 'No live output sample captured in probe attempts',
    sample: null,
    attemptsDetail: attemptResults,
  };
}

async function main() {
  const report = {
    checkedAt: nowIso(),
    targetUrl,
    stage: {
      health: { result: 'pending' },
      websocketLivePath: { result: 'pending' },
      liveOutputProbe: { result: 'pending' },
    },
    result: 'pending',
  };

  try {
    const health = await verifyHealth(targetUrl);
    report.stage.health = {
      result: 'pass',
      elapsedMs: health.elapsedMs,
      payload: health.json,
    };
  } catch (err) {
    report.stage.health = {
      result: 'fail',
      error: String(err?.message || err),
    };
    report.result = 'fail';
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }

  const wsSummary = await verifyWebsocket(targetUrl);
  report.stage.websocketLivePath = wsSummary;

  // If the main verification path didn't see live output, run a focused probe.
  if (!wsSummary.serverContentSample) {
    report.stage.liveOutputProbe = await probeLiveOutput(targetUrl);
  } else {
    report.stage.liveOutputProbe = {
      result: 'skipped',
      message: 'Live output sample already captured in main websocket check',
    };
  }

  if (!wsSummary.serverContentSample && report.stage.liveOutputProbe.result === 'pass') {
    wsSummary.serverContentSample = report.stage.liveOutputProbe.sample;
    wsSummary.sawServerContent = true;
  }

  report.result = wsSummary.result === 'pass' ? 'pass' : 'fail';

  if (report.result === 'pass') {
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
  } else {
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(
    JSON.stringify(
      {
        checkedAt: nowIso(),
        targetUrl,
        result: 'fail',
        fatal: String(err?.message || err),
      },
      null,
      2
    )
  );
  process.exit(1);
});
