"use client";

import React from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps {
    isListening: boolean;
    onToggle: () => void;
    disabled?: boolean;
    isHero?: boolean;
}

export default function VoiceButton({ isListening, onToggle, disabled, isHero }: VoiceButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className={`voice-btn ${isListening ? "voice-btn-active" : ""} ${isHero ? "voice-btn-hero" : ""}`}
            aria-label={isListening ? "Stop live session" : "Start live session"}
            title={isListening ? "Tap to stop" : "Tap to speak"}
        >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
    );
}
