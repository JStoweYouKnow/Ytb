type ToolCall = {
    functionCalls: Array<{
        name: string;
        args: any;
        id?: string;
    }>;
};

export type GroundingSource = {
    title?: string;
    uri?: string;
    snippet?: string;
};

function extractGroundingSources(metadata: any): GroundingSource[] {
    const sources: GroundingSource[] = [];
    try {
        const chunks = metadata.groundingChunks || metadata.groundingSupports || metadata.searchEntryPoint?.renderedContent || [];
        if (Array.isArray(chunks)) {
            for (const c of chunks) {
                if (typeof c === 'string') sources.push({ snippet: c });
                else if (c?.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title, snippet: c.web.snippet });
                else if (c?.uri) sources.push({ uri: c.uri, title: c.title, snippet: c.snippet });
            }
        }
        const webQueries = metadata.webSearchQueries || metadata.groundingQueries;
        if (Array.isArray(webQueries) && sources.length === 0) {
            webQueries.slice(0, 5).forEach((q: string) => sources.push({ snippet: q }));
        }
    } catch {
        // Ignore parse errors
    }
    return sources;
}

export class GeminiLiveClient {
    private ws: WebSocket | null = null;
    private audioContext: AudioContext | null = null;
    private stream: MediaStream | null = null;
    private videoStream: MediaStream | null = null;
    private videoElement: HTMLVideoElement | null = null;
    private videoCanvas: HTMLCanvasElement | null = null;
    private videoInterval: ReturnType<typeof setInterval> | null = null;
    private playQueue: AudioBuffer[] = [];
    private isPlaying = false;
    private startTime = 0;
    private activeSource: AudioBufferSourceNode | null = null;

    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private isIntentionallyClosed = false;
    private pendingInit?: { userName?: string; hypeLevel?: string };

    public onTranscript?: (text: string) => void;
    public onToolCall?: (call: ToolCall) => void;
    public onConnected?: () => void;
    public onDisconnected?: () => void;
    public onSessionId?: (sessionId: string) => void;
    public onGroundingResult?: () => void;
    public onAudioLevel?: (level: number) => void;
    public onResponseStateChange?: (responding: boolean) => void;
    public onGroundingSources?: (sources: GroundingSource[]) => void;
    public onVisionActive?: (active: boolean) => void;

    /** Expose the camera stream so the UI can show a self-view preview */
    public getVideoStream(): MediaStream | null {
        return this.videoStream;
    }

    public async connect(init?: { userName?: string; hypeLevel?: string }) {
        if (this.ws) return;
        this.isIntentionallyClosed = false;
        this.pendingInit = init;

        const connectWs = () => {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const host = window.location.host;
            this.ws = new WebSocket(`${protocol}//${host}/ws`);

            this.ws.onopen = () => {
                console.log('Connected to local WebSocket proxy');
                this.reconnectAttempts = 0;
                // Send init first so server can personalize the system prompt
                this.ws!.send(JSON.stringify({
                    type: 'init',
                    userName: this.pendingInit?.userName || '',
                    hypeLevel: this.pendingInit?.hypeLevel || 'normal',
                }));
            };

            this.ws.onmessage = async (event) => {
                if (typeof event.data === 'string') {
                    try {
                        const data = JSON.parse(event.data);

                        if (data.type === 'connected_to_gemini') {
                            if (this.onConnected) this.onConnected();
                            await this.startRecording();
                            return;
                        }

                        if (data.type === 'session_id') {
                            if (this.onSessionId) this.onSessionId(data.sessionId);
                            return;
                        }

                        // Handle content from serverContent (text, audio, embedded tool calls)
                        if (data.serverContent?.modelTurn?.parts) {
                            const parts = data.serverContent.modelTurn.parts;

                            const textParts = parts.filter((p: any) => p.text);
                            if (textParts.length > 0 && this.onTranscript) {
                                const fullText = textParts.map((p: any) => p.text).join(' ');
                                this.onTranscript(fullText);
                            }

                            for (const part of parts) {
                                if (part.functionCall && this.onToolCall) {
                                    this.onToolCall({ functionCalls: [part.functionCall] });
                                }
                            }

                            // Decode and play base64 audio
                            const hasAudio = parts.some((p: any) => p.inlineData?.mimeType?.startsWith('audio/pcm'));
                            if (hasAudio && this.onResponseStateChange) {
                                this.onResponseStateChange(true);
                            }

                            await this.handleIncomingJson(data);
                        }

                        // Turn complete — Gemini finished speaking
                        if (data.serverContent?.turnComplete) {
                            if (this.onResponseStateChange) this.onResponseStateChange(false);
                        }

                        // Handle top-level toolCall from SDK format
                        if (data.toolCall?.functionCalls && this.onToolCall) {
                            this.onToolCall({ functionCalls: data.toolCall.functionCalls });
                        }

                        // Google Search grounding indicator and sources
                        const grounding = data.groundingMetadata || data.serverContent?.groundingMetadata;
                        if (grounding) {
                            if (this.onGroundingResult) this.onGroundingResult();
                            const sources = extractGroundingSources(grounding);
                            if (sources.length > 0 && this.onGroundingSources) this.onGroundingSources(sources);
                        }

                        // Interruption: Gemini signals the user started speaking mid-response
                        if (data.serverContent?.interrupted) {
                            this.stopPlayback();
                        }
                    } catch (e) {
                        console.error('Error parsing message from proxy', e);
                    }
                } else if (event.data instanceof ArrayBuffer) {
                    await this.handleAudioBuffer(event.data);
                }
            };

            this.ws.onclose = () => {
                console.log('Disconnected from local WebSocket proxy');
                
                // Clear the active WebSocket to prevent stop() from attempting to close it again
                // or triggering multiple onclose events
                this.ws = null;
                this.stop(false);

                if (!this.isIntentionallyClosed && this.reconnectAttempts < this.maxReconnectAttempts) {
                    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
                    console.log(`Reconnecting to WebSocket in ${delay}ms... (Attempt ${this.reconnectAttempts + 1})`);
                    this.reconnectAttempts++;
                    setTimeout(() => connectWs(), delay);
                } else {
                    if (this.onDisconnected) this.onDisconnected();
                }
            };
        };
        connectWs();
    }

    /** Send conversation context to Gemini for session memory */
    public sendContext(messages: Array<{ role: string; content: string }>) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        // Only send the last 8 messages to keep context tight
        const recent = messages.slice(-8);
        if (recent.length === 0) return;
        this.ws.send(JSON.stringify({ type: 'context', messages: recent }));
    }

    /** Start camera and send periodic video frames to Gemini */
    public async startCamera() {
        try {
            this.videoStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' },
            });

            // Create hidden video element for frame capture
            this.videoElement = document.createElement('video');
            this.videoElement.srcObject = this.videoStream;
            this.videoElement.playsInline = true;
            this.videoElement.muted = true;
            await this.videoElement.play();

            // Create canvas for JPEG extraction (optimization for lower-end devices)
            this.videoCanvas = document.createElement('canvas');
            this.videoCanvas.width = 320;
            this.videoCanvas.height = 240;

            if (this.onVisionActive) this.onVisionActive(true);
            // Send a frame every second for near-real-time vision
            this.videoInterval = setInterval(() => {
                this.captureAndSendFrame();
            }, 1000);
        } catch (error) {
            console.error('Error starting camera:', error);
        }
    }

    public stopCamera(): void {
        if (this.onVisionActive) this.onVisionActive(false);
        if (this.videoInterval) {
            clearInterval(this.videoInterval);
            this.videoInterval = null;
        }
        if (this.videoStream) {
            this.videoStream.getTracks().forEach((t) => t.stop());
            this.videoStream = null;
        }
        this.videoElement = null;
        this.videoCanvas = null;
    }

    public get isCameraActive(): boolean {
        return this.videoStream !== null && this.videoInterval !== null;
    }

    private captureAndSendFrame() {
        if (!this.videoElement || !this.videoCanvas || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const ctx = this.videoCanvas.getContext('2d');
        if (!ctx) return;

        // Draw the 640x480 video scaled down to 320x240 for performance
        ctx.drawImage(this.videoElement, 0, 0, 320, 240);

        // Convert to JPEG base64
        const dataUrl = this.videoCanvas.toDataURL('image/jpeg', 0.5);
        const base64Data = dataUrl.split(',')[1];

        const message = {
            realtimeInput: {
                mediaChunks: [{
                    mimeType: 'image/jpeg',
                    data: base64Data,
                }],
            },
        };

        this.ws.send(JSON.stringify(message));
    }

    private async handleIncomingJson(data: any) {
        if (data.serverContent?.modelTurn?.parts) {
            for (const part of data.serverContent.modelTurn.parts) {
                if (part.inlineData && part.inlineData.mimeType?.startsWith('audio/pcm')) {
                    const base64Audio = part.inlineData.data;
                    const binaryStr = atob(base64Audio);
                    const len = binaryStr.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        bytes[i] = binaryStr.charCodeAt(i);
                    }
                    await this.handleAudioBuffer(bytes.buffer);
                }
            }
        }
    }

    private async startRecording() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });

            this.audioContext = new AudioContext({ sampleRate: 16000 });

            const source = this.audioContext.createMediaStreamSource(this.stream);
            const processor = this.audioContext.createScriptProcessor(4096, 1, 1);

            processor.onaudioprocess = (e) => {
                if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

                const inputData = e.inputBuffer.getChannelData(0);

                // Compute RMS for audio level visualization
                if (this.onAudioLevel) {
                    let sum = 0;
                    for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
                    const rms = Math.sqrt(sum / inputData.length);
                    this.onAudioLevel(Math.min(rms * 5, 1));
                }

                const pcmData = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                    const s = Math.max(-1, Math.min(1, inputData[i]));
                    pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                }

                const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));

                this.ws.send(JSON.stringify({
                    realtimeInput: {
                        mediaChunks: [{
                            mimeType: 'audio/pcm;rate=16000',
                            data: base64Data,
                        }],
                    },
                }));
            };

            source.connect(processor);
            processor.connect(this.audioContext.destination);
        } catch (error) {
            console.error('Error starting audio recording:', error);
        }
    }

    private async handleAudioBuffer(buffer: ArrayBuffer) {
        if (!this.audioContext) return;

        try {
            const int16Array = new Int16Array(buffer);
            const float32Array = new Float32Array(int16Array.length);
            for (let i = 0; i < int16Array.length; i++) {
                float32Array[i] = int16Array[i] / 32768.0;
            }

            const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, 24000);
            audioBuffer.copyToChannel(float32Array, 0);

            this.playQueue.push(audioBuffer);
            this.playNext();
        } catch (error) {
            console.error('Error handling audio buffer:', error);
        }
    }

    private playNext() {
        if (this.isPlaying || this.playQueue.length === 0 || !this.audioContext) return;

        this.isPlaying = true;
        const buffer = this.playQueue.shift()!;
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);

        // Track active source so we can stop it on interruption
        this.activeSource = source;

        source.onended = () => {
            this.isPlaying = false;
            this.activeSource = null;
            this.playNext();
        };

        const playTime = Math.max(this.audioContext.currentTime, this.startTime);
        source.start(playTime);
        this.startTime = playTime + buffer.duration;
    }

    /** Stop all queued and currently playing audio (interruption handling) */
    private stopPlayback() {
        this.playQueue = [];
        this.isPlaying = false;

        // Actually stop the currently playing audio source
        if (this.activeSource) {
            try {
                this.activeSource.stop();
            } catch {
                // Already stopped
            }
            this.activeSource = null;
        }

        this.startTime = this.audioContext?.currentTime || 0;
    }

    public stop(intentional: boolean = true) {
        if (intentional) {
            this.isIntentionallyClosed = true;
        }

        if (this.ws) {
            // Need to remove onclose listener momentarily if we call stop() internally without intending to trigger reconnections.
            // But since stop() is called from onclose, we shouldn't attempt to close if it's already closed.
            if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
                this.ws.close();
            }
            this.ws = null;
        }
        this.stopCamera();
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        this.stopPlayback();
    }
}
