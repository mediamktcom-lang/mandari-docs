"use client";

import { useEffect, useState } from "react";

// Registra il service worker e, su iPhone, mostra un breve suggerimento
// su come installare l'app (iOS non ha il pulsante automatico di Chrome/Android).
export default function AvvioPWA() {
  const [mostraIOS, setMostraIOS] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    const giaInstallata =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    const giaChiuso = localStorage.getItem("mandari-hint-ios") === "1";

    if (iOS && !giaInstallata && !giaChiuso) setMostraIOS(true);
  }, []);

  if (!mostraIOS) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 rounded-2xl bg-white/95 p-4 text-sm text-slate-700 shadow-lg ring-1 ring-black/5 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">Installa Mandari</p>
          <p className="mt-1 text-slate-600">
            Tocca il tasto Condividi{" "}
            <span aria-hidden className="font-semibold">
              ⎋
            </span>{" "}
            in basso e poi <span className="font-semibold">“Aggiungi a Home”</span>{" "}
            per averla come app.
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.setItem("mandari-hint-ios", "1");
            setMostraIOS(false);
          }}
          className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}
