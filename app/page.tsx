'use client';

import { useRouter } from "next/navigation";
import BrandLogo from "./components/BrandLogo";
import MagneticWrapper from "./components/MagneticWrapper";

export default function Home() {
  const router = useRouter();

  return (
    <main className="landing-container">
      {/* The ambient orbs from layout.tsx (GlobalEffects) provides the backdrop */}

      <div className="landing-content">
        <div className="landing-hero-wrap">
          <BrandLogo size={64} className="landing-hero-logo" />
          <h1 className="landing-title">YTB</h1>
          <p className="landing-subtitle">Your real-time AI wellness companion.</p>
        </div>

        <div className="landing-features">
          <div className="landing-feature">
            <span className="feature-icon">🎙️</span> Live Voice & Vision
          </div>
          <div className="landing-feature">
            <span className="feature-icon">🧠</span> Emotion-Aware AI
          </div>
          <div className="landing-feature">
            <span className="feature-icon">🎧</span> Binaural Beats
          </div>
        </div>

        <div className="landing-actions">
          <MagneticWrapper strength={0.4}>
            <button
              className="btn btn-primary landing-begin-btn"
              onClick={() => router.push('/chat')}
            >
              Begin Session
            </button>
          </MagneticWrapper>
          <button
            className="btn btn-ghost landing-text-btn"
            onClick={() => router.push('/chat')}
          >
            Try text chat
          </button>
        </div>

        <p className="landing-disclaimer">
          YTB is a wellness companion, not a therapist or medical professional.
          If you&apos;re in crisis, please call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline).
        </p>
      </div>
    </main>
  );
}

