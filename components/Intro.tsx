"use client";

import { useEffect, useState } from "react";
import { CUP_BODY, CUP_HANDLE, CUP_SAUCER, CUP_STEAM, TOWER } from "@/components/Doodles";

/**
 * Effet d'ouverture (1,2 s au plus, une fois par session) : fond crème, la tour Eiffel se dessine au trait doré,
 * une petite tasse fume à son pied, « CAFÉ LOUISE » puis « PARIS 15 », fondu sur le hero.
 * Styles dans globals.css (.intro-*). Masqué d'office si déjà vu ou si le visiteur préfère réduire les animations.
 */
export function Intro({ skipLabel, city }: { skipLabel: string; city: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem("louise-intro", "1");
    } catch {}
    const t = setTimeout(() => setGone(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  return (
    <div className="intro-curtain">
      <svg viewBox="0 0 150 140" className="h-36 w-auto text-gold md:h-44" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g strokeWidth="1.6">
          {TOWER.map((d, i) => (
            <path key={d} className={`intro-draw ${i > 3 ? "intro-draw-2" : ""}`} d={d} pathLength={1} />
          ))}
        </g>
        <g transform="translate(100 98)" strokeWidth="1.5">
          <path className="intro-draw intro-draw-2" d={CUP_BODY} pathLength={1} />
          <path className="intro-draw intro-draw-2" d={CUP_HANDLE} pathLength={1} />
          <path className="intro-draw intro-draw-2" d={CUP_SAUCER} pathLength={1} />
          <path className="intro-steam" d={CUP_STEAM} pathLength={1} />
        </g>
      </svg>
      <p className="intro-word display mt-6 text-[1.75rem] tracking-[0.24em] text-night md:text-[2.125rem]" aria-hidden="true">
        CAFÉ LOUISE
      </p>
      <p className="intro-word intro-word-2 mt-2 text-[0.75rem] font-medium tracking-[0.5em] text-gold-deep" aria-hidden="true">
        {city}
      </p>
      <button type="button" onClick={() => setGone(true)} className="absolute end-5 bottom-5 min-h-11 px-3 text-sm text-muted underline underline-offset-4">
        {skipLabel}
      </button>
    </div>
  );
}
