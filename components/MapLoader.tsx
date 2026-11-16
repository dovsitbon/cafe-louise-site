"use client";

import { useState } from "react";
import { PinIcon } from "@/components/icons";

/** Plan Google Maps chargé au clic seulement : pas de script tiers ni de cookie Google tant que le visiteur ne le demande pas. */
export function MapLoader({ src, title, label, note, className = "" }: { src: string; title: string; label: string; note: string; className?: string }) {
  const [on, setOn] = useState(false);
  if (on) return <iframe title={title} src={src} className={`w-full border-0 ${className}`} referrerPolicy="no-referrer-when-downgrade" />;
  return (
    <div className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-water-soft p-6 text-center ${className}`}>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full text-night/10" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
          <path d="M-20 220 420 140M90 -20l50 340M260 -20l-30 340M-20 70l440 50" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M-20 260 420 180M170 -20l-20 340M-20 25l440 40" />
        </g>
      </svg>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-night text-cream">
        <PinIcon className="h-6 w-6" />
      </span>
      <button type="button" onClick={() => setOn(true)} className="btn-light relative !border-night">
        {label}
      </button>
      <p className="relative max-w-xs text-[0.8125rem] text-muted">{note}</p>
    </div>
  );
}
