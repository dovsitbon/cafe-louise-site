// Le logo du Café Louise, redessiné d'après l'enseigne : « Café Louise » en écriture anglaise dorée, « PARIS »,
// et le cœur framboise d'un seul trait. Tracés générés par « npm run logo » (components/logo-data.json).
import data from "@/components/logo-data.json";

type Props = { className?: string; light?: boolean; title?: string };

export function Logo({ className = "h-11 w-auto md:h-12", light = false, title }: Props) {
  const script = light ? "var(--color-cream)" : "var(--color-gold-deep)";
  const paris = light ? "var(--color-rose)" : "var(--color-gold-deep)";
  const heart = light ? "var(--color-rose)" : "var(--color-heart)";
  return (
    <svg viewBox={`0 0 ${data.w} ${data.h}`} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={data.script} fill={script} />
      <path d={data.paris} fill={paris} />
      <g transform={`translate(${data.heartAt.x} ${data.heartAt.y}) scale(${data.heartAt.s})`}>
        <path d={data.heart} fill="none" stroke={heart} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
