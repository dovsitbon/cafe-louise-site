import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { altOf } from "@/lib/text";
import { has, img } from "@/lib/media";
import { Cup, Tower } from "@/components/Doodles";

const TINTS = ["bg-rose-soft text-gold-deep", "bg-water-soft text-night", "bg-cream-deep text-gold-deep"];

/**
 * Photo de public/media, recadrée dans son cadre. Si le fichier n'existe pas encore (photo à prendre sur place,
 * voir assets/A-PHOTOGRAPHIER.md), un dessin au trait sur un fond pastel tient la place : aucune fausse photo.
 */
export function Pic({ src, d, sizes, className = "", priority = false, position = "center", alt, label, tint = 0 }: { src: string; d: Dict; sizes: string; className?: string; priority?: boolean; position?: string; alt?: string; label?: string; tint?: number }) {
  if (!src || !has(src))
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${TINTS[tint % TINTS.length]} ${className}`} data-photo-slot={src || "vide"} aria-hidden="true">
        {tint % 2 ? <Cup className="h-12 w-12 opacity-70" /> : <Tower className="h-16 w-auto opacity-60" />}
        {label && <span className="font-[family-name:var(--font-display)] text-[0.9375rem] italic opacity-85">{label}</span>}
      </div>
    );
  const i = img(src);
  return (
    <div className={`zoom ${className}`}>
      <Image src={i.src} alt={alt ?? altOf(d, i.src)} width={i.width} height={i.height} sizes={sizes} quality={80} priority={priority} fetchPriority={priority ? "high" : undefined} className="h-full w-full object-cover" style={{ objectPosition: position }} />
    </div>
  );
}
