import type { Dict } from "@/lib/i18n";
import { HEART, TOWER } from "@/components/Doodles";

/**
 * Plan à pied dessiné, de la tour Eiffel au café : la Seine, le Champ-de-Mars, le boulevard de Grenelle et son métro
 * aérien, les stations Bir-Hakeim et Dupleix. Positions calculées d'après les coordonnées réelles (1 unité ≈ 4 m),
 * simplifiées : pour l'itinéraire exact, le bouton ouvre Google Maps.
 */
export function WalkMap({ d, className = "" }: { d: Dict; className?: string }) {
  const w = d.walk;
  return (
    <figure className={`relative overflow-hidden rounded-[4px] bg-paper ${className}`}>
      <svg viewBox="0 -10 300 320" className="h-full w-full" role="img" aria-label={w.title}>
        {/* Seine */}
        <path d="M-20 150 140 -25" stroke="var(--color-water)" strokeWidth="22" fill="none" />
        <text transform="translate(22 92) rotate(-47.5)" fontSize="9" fill="var(--color-night)" fontStyle="italic" fontFamily="var(--font-display)" opacity="0.75">
          {w.seine}
        </text>
        {/* Champ-de-Mars */}
        <path d="M183 50 279 195 221 233 125 88Z" fill="var(--color-water-soft)" />
        <text transform="translate(186 120) rotate(56.3)" fontSize="10" fill="var(--color-night)" fontStyle="italic" fontFamily="var(--font-display)" opacity="0.8">
          {w.champ}
        </text>
        {/* Boulevard de Grenelle et métro aérien (ligne 6) */}
        <path d="M30 150 117 262 240 294" stroke="var(--color-line)" strokeWidth="9" fill="none" strokeLinejoin="round" />
        <path d="M30 150 117 262 240 294" stroke="var(--color-gold)" strokeWidth="1.4" strokeDasharray="1.5 4" fill="none" strokeLinejoin="round" />
        <text transform="translate(152 287) rotate(14.6)" fontSize="7.5" fill="var(--color-muted)" fontFamily="var(--font-body)">
          {w.boulevard}
        </text>
        {/* Stations */}
        {[
          { x: 44, y: 169, name: "Bir-Hakeim", dx: 9 },
          { x: 120, y: 266, name: "Dupleix", dx: 9 },
        ].map((s) => (
          <g key={s.name}>
            <circle cx={s.x} cy={s.y} r="6" fill="var(--color-night)" />
            <text x={s.x} y={s.y + 2.6} fontSize="7" fontWeight="600" fill="var(--color-cream)" textAnchor="middle" fontFamily="var(--font-body)">
              M
            </text>
            <text x={s.x + s.dx} y={s.y + 3} fontSize="8" fill="var(--color-night)" fontFamily="var(--font-body)">
              {s.name}
            </text>
          </g>
        ))}
        {/* Trajet à pied */}
        <path d="M99 238C108 190 120 130 136 70" stroke="var(--color-heart)" strokeWidth="2" strokeDasharray="0.5 5" strokeLinecap="round" fill="none" />
        <g transform="translate(70 150)">
          <rect x="-4" y="-11" width="70" height="17" rx="8.5" fill="var(--color-paper)" stroke="var(--color-line)" />
          <text x="31" y="1" fontSize="8" fill="var(--color-night)" textAnchor="middle" fontFamily="var(--font-body)" fontWeight="500">
            {w.duration}
          </text>
        </g>
        {/* Tour Eiffel */}
        <g transform="translate(120 12) scale(0.36)" fill="none" stroke="var(--color-gold-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {TOWER.map((p) => (
            <path key={p} d={p} />
          ))}
        </g>
        <text x="160" y="40" fontSize="9.5" fill="var(--color-night)" fontFamily="var(--font-display)">
          {w.tower}
        </text>
        {/* Café Louise : le cœur de l'enseigne */}
        <circle cx="99" cy="245" r="11" fill="var(--color-paper)" stroke="var(--color-heart)" strokeWidth="1.2" />
        <g transform="translate(91.5 237.5) scale(0.25)">
          <path d={HEART} fill="none" stroke="var(--color-heart)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="84" y="249" fontSize="10" fill="var(--color-night)" fontFamily="var(--font-display)" textAnchor="end" fontWeight="600">
          {w.cafe}
        </text>
      </svg>
      <figcaption className="sr-only">{w.title}</figcaption>
    </figure>
  );
}
