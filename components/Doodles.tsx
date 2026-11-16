// Petits dessins au trait (tour Eiffel, tasse, croissant, macaron, gâteau, store de terrasse),
// fins et dorés comme l'enseigne. Mêmes tracés que scripts/draw.mjs pour la tour.
type P = { className?: string };
const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

/** Tour Eiffel au trait, boîte 100 × 140. */
export const TOWER = ["M14 136C30 104 42 70 46.5 26", "M86 136C70 104 58 70 53.5 26", "M46.5 26 50 4l3.5 22", "M44 26h12", "M31 136c4-20 34-20 38 0", "M26 98h48", "M38 62h24"];

export const Tower = ({ className = "h-10 w-auto" }: P) => (
  <svg viewBox="0 0 100 140" className={className} {...line} strokeWidth={2.4}>
    {TOWER.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

/** Petite tasse fumante, boîte 40 × 40 (utilisée au pied de la tour dans l'ouverture). */
export const CUP_BODY = "M8 20h20v3.5c0 5.5-4.5 9.5-10 9.5S8 29 8 23.5V20Z";
export const CUP_HANDLE = "M28 22h2.2a3.4 3.4 0 0 1 0 6.8H27";
export const CUP_SAUCER = "M4 36c4 1.6 9 2.4 14 2.4S28 37.6 32 36";
export const CUP_STEAM = "M15 15c-2-2.3 2-3.6 0-6.4M21 15c-2-2.3 2-3.6 0-6.4";

export const Cup = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <path d={CUP_BODY} />
    <path d={CUP_HANDLE} />
    <path d={CUP_SAUCER} />
    <path d={CUP_STEAM} />
  </svg>
);

export const Croissant = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <path d="M5 26c2-9 9-15 15-15s13 6 15 15c-3 1.5-6 1-8-1-2 3-5 4-7 4s-5-1-7-4c-2 2-5 2.5-8 1Z" />
    <path d="M13 25.5 15 15M20 29V12M27 25.5 25 15" />
  </svg>
);

export const Macaron = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <path d="M7 18c0-5 6-8 13-8s13 3 13 8H7Z" />
    <path d="M6.5 22h27" />
    <path d="M7 26h26c0 5-6 7-13 7S7 31 7 26Z" />
    <path d="M7 18.5c-1 1-1 2.5 0 3.5M33 18.5c1 1 1 2.5 0 3.5" />
  </svg>
);

export const Cake = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <path d="M8 20h24v13H8z" />
    <path d="M8 25c2.5 2 5.5 2 8 0s5.5-2 8 0 5.5 2 8 0" />
    <path d="M20 20v-5" />
    <path d="M20 11.5c-1.2-1.4 1.2-2.6 0-4.5 2.2 1.3 2.4 3.6 0 4.5Z" />
    <path d="M5 33h30" />
  </svg>
);

/** Store de terrasse festonné et petite table bistrot. */
export const Terrace = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <path d="M4 8h32l-2 7H6L4 8Z" />
    <path d="M6 15c0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0" />
    <path d="M14 26h12M20 26v9M16 35h8" />
  </svg>
);

export const Clock = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <circle cx="20" cy="21" r="13" />
    <path d="M20 13v8l5 3M15 5h10" />
  </svg>
);

export const Teapot = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line} strokeWidth={1.6}>
    <path d="M10 16h18c1 9-2 16-9 16s-10-7-9-16Z" />
    <path d="M28 19c3-1 6 0 6 3s-3 5-6 6M10 20c-4-1-6 1-6 3" />
    <path d="M15 16c0-3 2-5 4-5s4 2 4 5M19 11V9" />
  </svg>
);

/** Le cœur de l'enseigne, d'un seul trait (boîte 60 × 60). */
export const HEART = "M30 52C20 42 9 33 10 22c1-8 8-12 14-10 4 1.5 6 5 6 9 1-5 5-10 12-10 8 0 12 7 10 15-2 9-12 18-22 26-6 4.5-14 6-22 2";

export const Heart = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 60 60" className={className} {...line} strokeWidth={5}>
    <path d={HEART} />
  </svg>
);

/** Filet doré avec la tour au milieu, pour séparer deux parties. */
export const TowerRule = ({ className = "" }: P) => (
  <div className={`flex items-center gap-4 text-gold ${className}`} aria-hidden="true">
    <span className="h-px flex-1 bg-current opacity-50" />
    <Tower className="h-7 w-auto" />
    <span className="h-px flex-1 bg-current opacity-50" />
  </div>
);
