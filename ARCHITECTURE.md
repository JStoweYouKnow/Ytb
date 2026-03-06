# Architecture — You The Best

## System Overview

```mermaid
graph TB
    subgraph Browser["Browser Client"]
        UI["React UI<br/>(ChatScreen.tsx)"]
        GLC["WebSocket Client<br/>(gemini-live-client.ts)"]
        AE["Binaural Beat Engine<br/>(audio-engine.ts)"]
        MIC["Microphone<br/>16kHz PCM"]
        SPK["Speakers<br/>24kHz PCM"]

        UI --> GLC
        UI --> AE
        MIC -->|"Float32 → Int16 → base64"| GLC
        GLC -->|"base64 → Int16 → Float32"| SPK
        GLC -->|"setBinauralPreset"| AE
    end

    subgraph CloudRun["Google Cloud Run"]
        EXP["Express Server<br/>(server.js)"]
        WSS["WebSocket Server<br/>(/ws endpoint)"]
        SDK["@google/genai SDK<br/>ai.live.connect()"]
        FS["Firestore Client<br/>(lib/firestore.js)"]
        HEALTH["/health"]

        EXP --> WSS
        EXP --> HEALTH
        WSS --> SDK
        WSS --> FS
    end

    subgraph Google["Google Cloud Platform"]
        GEMINI["Gemini 2.0 Flash<br/>Live API"]
        GSEARCH["Google Search<br/>Grounding"]
        FIRE["Cloud Firestore"]
        SM["Secret Manager"]

        GEMINI -->|"search tool"| GSEARCH
    end

    GLC <-->|"WebSocket<br/>JSON messages"| WSS
    SDK <-->|"Live API<br/>Audio + Text + Tools"| GEMINI
    FS <-->|"gRPC"| FIRE
    SM -.->|"GEMINI_API_KEY"| EXP

    style Browser fill:#e8efec,stroke:#5b8fa8,stroke-width:2px
    style CloudRun fill:#f0f4f3,stroke:#6a9f7e,stroke-width:2px
    style Google fill:#fff3e0,stroke:#f9a825,stroke-width:2px
```

---

## Voice Conversation Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server as Cloud Run (server.js)
    participant SDK as @google/genai SDK
    participant Gemini as Gemini Live API
    participant Firestore

    User->>Browser: Tap mic button
    Browser->>Server: WebSocket connect /ws
    Server->>SDK: ai.live.connect(config)
    SDK->>Gemini: Open Live session
    Gemini-->>SDK: setupComplete
    SDK-->>Server: onopen callback
    Server-->>Browser: { type: "connected_to_gemini" }
    Browser->>Browser: Start microphone capture (16kHz)

    loop Real-time Voice Interaction
        User->>Browser: Speak
        Browser->>Browser: Float32 → Int16 PCM → base64
        Browser->>Server: { realtimeInput: { mediaChunks: [PCM] } }
        Server->>SDK: session.sendRealtimeInput({ audio })
        SDK->>Gemini: Forward audio

        Gemini-->>SDK: serverContent (audio + text)
        SDK-->>Server: onmessage callback
        Server-->>Browser: JSON.stringify(message)
        Server->>Firestore: saveTranscript(sessionId, entry)
        Browser->>Browser: Decode base64 → Int16 → Float32
        Browser->>User: Play 24kHz audio response

        opt Tool Call (setBinauralPreset)
            Gemini-->>SDK: toolCall { functionCalls }
            SDK-->>Server: onmessage callback
            Server->>SDK: session.sendToolResponse({ result: "ok" })
            Server-->>Browser: Forward toolCall JSON
            Browser->>AE: audioEngine.play(preset)
            AE->>User: Binaural beats (stereo oscillators)
        end
    end

    User->>Browser: Tap mic button (stop)
    Browser->>Server: WebSocket close
    Server->>SDK: session.close()
    SDK->>Gemini: Close Live session

    participant AE as Binaural Engine
```

---

## Tool Call Flow: Binaural Beats

```mermaid
graph LR
    A["User says:<br/>'I need to focus'"] --> B["Gemini detects<br/>intent"]
    B --> C["Tool call:<br/>setBinauralPreset<br/>preset: 'focus'"]
    C --> D["Server auto-responds:<br/>sendToolResponse()"]
    C --> E["Forwarded to<br/>browser client"]
    E --> F["BinauralBeatEngine<br/>play('focus')"]
    F --> G["Left ear: 220Hz<br/>Right ear: 234Hz<br/>Beat: 14Hz<br/>Alpha/Beta waves"]

    style A fill:#e3f2fd
    style C fill:#fff3e0
    style G fill:#e8f5e9
```

---

## Emotion-Aware Vision Flow

```mermaid
graph LR
    A["Camera<br/>640x480 @ 1fps"] --> B["Canvas<br/>JPEG encode"]
    B --> C["WebSocket<br/>base64 frame"]
    C --> D["Server<br/>sendRealtimeInput(video)"]
    D --> E["Gemini<br/>Vision Analysis"]
    E --> F{"Emotion<br/>Detected?"}
    F -->|"Tired/Yawning"| G["Suggest break<br/>or sleep preset"]
    F -->|"Smiling"| H["Celebrate<br/>hype them up"]
    F -->|"Tense/Frowning"| I["Offer relax preset<br/>or breathing exercise"]
    F -->|"Focused"| J["Stay quiet<br/>affirm briefly"]

    style A fill:#e3f2fd
    style E fill:#fff3e0
    style G fill:#e8f5e9
    style H fill:#e8f5e9
    style I fill:#e8f5e9
    style J fill:#e8f5e9
```

---

## Audio Processing Pipeline

```mermaid
graph LR
    subgraph Input["Audio Input (Browser → Gemini)"]
        M["Microphone"] --> WAI["Web Audio API<br/>AudioContext 16kHz"]
        WAI --> SP["ScriptProcessor<br/>4096 samples"]
        SP --> F2I["Float32 → Int16"]
        F2I --> B64E["Base64 encode"]
        B64E --> WS1["WebSocket send"]
    end

    subgraph Server["Server (proxy)"]
        WS1 --> SRI["session.sendRealtimeInput()"]
        SRI --> GEM["Gemini Live API"]
        GEM --> FWD["onmessage → forward"]
    end

    subgraph Output["Audio Output (Gemini → Browser)"]
        FWD --> WS2["WebSocket receive"]
        WS2 --> B64D["Base64 decode"]
        B64D --> I2F["Int16 → Float32"]
        I2F --> BUF["AudioBuffer<br/>24kHz"]
        BUF --> Q["Play queue"]
        Q --> SPKR["Speakers"]
    end

    style Input fill:#e3f2fd,stroke:#1565c0
    style Server fill:#f3e5f5,stroke:#7b1fa2
    style Output fill:#e8f5e9,stroke:#2e7d32
```

---

## Binaural Beat Synthesis

| Preset | Base Frequency | Beat Frequency | Brainwave Band | Effect |
|--------|---------------|----------------|----------------|--------|
| Focus | 220 Hz | 14 Hz | Alpha/Beta | Alert concentration |
| Relax | 180 Hz | 6 Hz | Theta | Meditation, calm |
| Sleep | 150 Hz | 3 Hz | Delta | Deep sleep |

**How it works:** Two sine waves are panned hard-left and hard-right. The left ear hears the base frequency, the right ear hears base + beat difference. The brain perceives a phantom "beat" at the difference frequency, entraining brainwave activity to the target band.

```
Left ear:  ───── 220 Hz sine ─────
Right ear: ───── 234 Hz sine ─────
Brain:     ───── 14 Hz beat  ───── (Alpha/Beta)
```

---

## Ambient Soundscapes

Procedurally generated ambient sounds using noise synthesis:

| Sound | Technique | Filter | Effect |
|-------|-----------|--------|--------|
| Rain | Brown noise + random droplet spikes | Lowpass 3kHz | Steady rain with occasional drops |
| Ocean | Pink noise × sine LFO (0.06Hz) | Lowpass 800Hz, LFO-modulated | Rhythmic wave swells |
| Forest | White noise floor + random sine chirps | Lowpass 6kHz | Quiet forest with bird calls |

---

## Offline-First Data Architecture

YTB uses a **dual-persistence** strategy to ensure the app works with or without Cloud Firestore:

```mermaid
graph TB
    subgraph Client["Browser (localStorage)"]
        WS["wellness-store.ts"]
        CS["chat-store.ts"]
        SS["settings-store.ts"]
        WS --> LS["localStorage"]
        CS --> LS
        SS --> LS
    end

    subgraph Server["Cloud Run"]
        SJ["server.js"]
        FS["lib/firestore.js"]
    end

    subgraph GCP["Google Cloud"]
        FIRE["Cloud Firestore"]
    end

    SJ -->|"Optional"| FS
    FS <-->|"gRPC"| FIRE
    SJ -->|"Graceful fallback<br/>if Firestore unavailable"| MEM["In-memory maps"]

    style Client fill:#e8efec,stroke:#5b8fa8
    style Server fill:#f0f4f3,stroke:#6a9f7e
    style GCP fill:#fff3e0,stroke:#f9a825
```

**How it works:**

1. **Client-side (always available):** `wellness-store.ts` persists all mood entries, wellness plans, emotion timelines, check-ins, and session recaps to `localStorage`. This is the primary data source for the UI.

2. **Server-side (optional):** `lib/firestore.js` mirrors data to Firestore when credentials are available. The server uses `try/catch` to load the module and falls back gracefully:
   - Rate limiting falls back to an in-memory `Map`
   - Agentic tools return offline-mode responses with empty data
   - All API endpoints return sensible defaults (empty arrays, null plans)

3. **No data loss:** Since the client stores all user data locally, the app is fully functional without Firestore. Firestore adds cross-device sync and server-side analytics but is not required.

**When Firestore is unavailable:**
- Rate limiting: In-memory per-IP sliding window (resets on server restart)
- Agentic tools (`getUserContext`, `getMoodHistory`, etc.): Return `{ message: "Running in offline mode" }` with empty data
- Conversation persistence: Relies on `localStorage` only
- Session recaps: Generated and stored client-side

---

## Agentic Tool Chain

YTB's 14 Gemini function tools form a proactive wellness loop:

```mermaid
graph TD
    START["Session Start"] --> UC["getUserContext<br/>Load history"]
    UC --> MH{"Mood patterns?"}
    MH -->|"Stress 3+ days"| GI["generateInsights<br/>Analyze trends"]
    GI --> CWP["createWellnessPlan<br/>Multi-day program"]
    MH -->|"Active plan"| TP["trackProgress<br/>Check adherence"]
    MH -->|"Normal"| CHAT["Normal conversation"]

    CHAT --> EM{"Vision: Emotion?"}
    EM -->|"Tired"| LEF["logEmotionFrame"] --> SBP["setBinauralPreset(sleep)"]
    EM -->|"Stressed"| LEF2["logEmotionFrame"] --> OBE["openBreathingExercise"]
    EM -->|"Happy"| LEF3["logEmotionFrame"]

    CHAT --> END{"Session ending?"}
    END -->|"Yes"| SCI["scheduleCheckIn"]
    SCI --> GSR["generateSessionRecap"]

    style START fill:#e3f2fd
    style GI fill:#fff3e0
    style CWP fill:#e8f5e9
    style GSR fill:#f3e5f5
```

**Session lifecycle:**
1. **Start:** `getUserContext` → `generateInsights` → `createWellnessPlan` (if needed)
2. **During:** `logMood`, `logEmotionFrame`, `setBinauralPreset`, `setAmbientSound`, `openBreathingExercise`, `getWellnessTip`, `saveJournalEntry`
3. **End:** `scheduleCheckIn` → `generateSessionRecap`

---

## Test Coverage

| Test File | Tests | Coverage Area |
|-----------|-------|---------------|
| `app/lib/audio-engine.test.ts` | 15 | Binaural beats + ambient sound engines |
| `app/lib/chat-service.test.ts` | 4 | Greeting generation, API fallback |
| `app/lib/wellness-store.test.ts` | 23 | Mood entries, plans, check-ins, recaps, heatmap |
| `server.test.js` | 34 | Crisis detection, rate limiting, schedule parsing, tool declarations |
| **Total** | **76** | |
