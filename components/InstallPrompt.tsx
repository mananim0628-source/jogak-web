"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || !deferredPrompt) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted" || outcome === "dismissed") {
      setVisible(false);
      setDeferredPrompt(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="앱 설치"
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "calc(100% - 2.5rem)",
        maxWidth: "380px",
        background: "rgba(26,18,48,0.96)",
        border: "1px solid rgba(201,169,97,0.35)",
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.875rem",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-192.png"
        alt="조각닷컴"
        width={40}
        height={40}
        style={{ borderRadius: "0.5rem", flexShrink: 0 }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "#F2EDE4",
            marginBottom: "0.125rem",
          }}
        >
          조각닷컴 앱으로 설치
        </p>
        <p style={{ fontSize: "0.7rem", color: "#8C849F", lineHeight: 1.4 }}>
          홈 화면에 추가하면 더 빠르게 볼 수 있어요
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <button
          onClick={() => setVisible(false)}
          style={{
            fontSize: "0.7rem",
            color: "#4E4869",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
          }}
          aria-label="닫기"
        >
          ✕
        </button>
        <button
          onClick={handleInstall}
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#1A1230",
            background: "#C9A961",
            border: "none",
            borderRadius: "100px",
            padding: "0.375rem 0.875rem",
            cursor: "pointer",
          }}
        >
          설치
        </button>
      </div>
    </div>
  );
}
