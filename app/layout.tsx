import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalEffects from "./components/GlobalEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#5b8fa8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "YTB - AI Companion",
  description: "Real-time AI wellness companion. Voice + vision conversations, emotion-aware responses, binaural beats, and guided breathing. Built with Gemini Live API.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "YTB",
  },
  openGraph: {
    title: "YTB — AI-Powered Personal Hypeman",
    description: "Your real-time AI wellness companion. Talk naturally, get empathetic responses, binaural beats, and guided breathing. Built for the Gemini Live Agent Challenge.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YTB — AI Wellness Companion",
    description: "Real-time voice + vision AI companion. Emotion-aware, binaural beats, breathing exercises.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalEffects />
        {children}
        <footer className="site-footer">
          <span className="site-footer-crisis">
            In crisis? Call or text <a href="tel:988" className="site-footer-crisis-link">988</a> (Suicide &amp; Crisis Lifeline)
          </span>
          <a href="/health" target="_blank" rel="noopener noreferrer" className="site-footer-status">
            Status
          </a>
        </footer>
      </body>
    </html>
  );
}
