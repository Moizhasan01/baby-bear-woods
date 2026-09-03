import { cn } from "@/lib/utils";

/* Decorative woodland SVG elements. All colors via currentColor / tokens. */

export function Leaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-10 text-sage", className)}
      style={style}
    >
      <path
        d="M52 12C30 12 14 26 12 52c26-2 40-18 40-40Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M14 50 44 20" stroke="var(--cream)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Blossom({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("h-8 w-8 text-blossom", className)} style={style}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="32"
          cy="18"
          rx="8"
          ry="13"
          fill="currentColor"
          transform={`rotate(${r} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="6" fill="var(--honey)" />
    </svg>
  );
}

export function Bee({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className={cn("h-10 w-12", className)}>
      <ellipse cx="30" cy="22" rx="14" ry="8" fill="var(--cream)" opacity="0.85" />
      <ellipse cx="50" cy="22" rx="14" ry="8" fill="var(--cream)" opacity="0.85" />
      <ellipse cx="40" cy="38" rx="20" ry="14" fill="var(--honey)" />
      <path d="M30 26v24M40 24v28M50 26v24" stroke="var(--bark)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="58" cy="34" r="3" fill="var(--bark)" />
    </svg>
  );
}

export function Acorn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <path d="M16 26h32c0 18-8 30-16 32-8-2-16-14-16-32Z" fill="var(--bark-light)" />
      <path d="M12 26c0-8 9-14 20-14s20 6 20 14c-6 3-14 4-20 4s-14-1-20-4Z" fill="var(--bark)" />
      <path d="M32 12V6" stroke="var(--bark)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Soft tree-line silhouette used as section dividers */
export function TreeLine({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-16 w-full text-forest-deep md:h-24", flip && "rotate-180", className)}
    >
      <path
        fill="currentColor"
        d="M0 120V70c30-10 50-40 70-40s30 30 55 30 35-50 60-50 35 40 60 40 30-20 50-20 30 30 55 30 40-60 65-60 30 50 55 50 40-30 65-30 35 20 55 20 30-40 55-40 40 55 65 55 35-25 60-25 30 20 55 20 40-45 65-45 30 30 55 30 40-20 60-20 30 25 55 25 40-55 65-55 30 45 55 45 40-30 60-30 35 15 55 15 30-40 55-40 40 55 60 55 35-25 55-25 35 20 60 20V120Z"
      />
    </svg>
  );
}

/** Gentle grass edge */
export function GrassEdge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-8 w-full text-sage-light md:h-12", className)}
    >
      <path
        fill="currentColor"
        d="M0 60V40c40-10 80-30 120-20s60 30 100 20 70-40 110-30 60 40 100 30 70-30 110-20 60 30 100 20 70-40 110-30 60 40 100 30 70-30 110-20 60 30 100 20 70-40 110-30 60 40 100 30 60-20 90-20V60Z"
      />
    </svg>
  );
}

/** Floating ambient leaves for hero backgrounds */
export function FloatingLeaves({ count = 7, className }: { count?: number; className?: string }) {
  const items = Array.from({ length: count });
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {items.map((_, i) => (
        <Leaf
          key={i}
          className="absolute opacity-60"
          style={{
            left: `${(i * 137) % 100}%`,
            top: `${(i * 53) % 80}%`,
            width: `${22 + ((i * 7) % 20)}px`,
            height: `${22 + ((i * 7) % 20)}px`,
            animation: `float ${6 + (i % 4) * 1.5}s ease-in-out ${i * 0.7}s infinite`,
            color: i % 3 === 0 ? "var(--honey)" : i % 3 === 1 ? "var(--sage)" : "var(--forest)",
          }}
        />
      ))}
    </div>
  );
}

/** Vine frame corner ornament */
export function VineCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cn("h-20 w-20 text-sage", className)}>
      <path
        d="M4 116C4 60 40 20 116 4"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M28 70c-10-8-6-22 6-22 0 12-2 18-6 22Z" fill="currentColor" />
      <path d="M50 44c-8-10 0-22 10-18-2 10-6 16-10 18Z" fill="currentColor" />
      <path d="M78 22c-6-10 4-20 12-14-4 8-8 12-12 14Z" fill="currentColor" />
      <circle cx="18" cy="92" r="6" fill="var(--blossom)" />
      <circle cx="18" cy="92" r="2.5" fill="var(--honey)" />
    </svg>
  );
}
