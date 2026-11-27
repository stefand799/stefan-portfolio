// A small line-drawn bowl of soup: steam rises, ingredients bob on the surface.
// Colors follow the theme; motion is disabled for prefers-reduced-motion.
export function SoupBowl({ size = 52 }: { size?: number }) {
  return (
    <svg
      className="soup-bowl shrink-0"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* steam */}
      <g stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round">
        <path className="soup-steam" d="M22 24 q-3 -4 0 -8 q3 -4 0 -8" />
        <path className="soup-steam" d="M32 22 q-3 -4 0 -8 q3 -4 0 -8" />
        <path className="soup-steam" d="M42 24 q-3 -4 0 -8 q3 -4 0 -8" />
      </g>

      {/* ingredients */}
      <circle className="soup-bit" cx="22" cy="37" r="2.5" fill="var(--color-prompt)" />
      <circle className="soup-bit" cx="33" cy="38" r="2" fill="var(--color-fg)" />
      <rect className="soup-bit" x="40" y="35" width="5" height="4" rx="1" fill="var(--color-prompt)" />

      {/* bowl */}
      <g stroke="var(--color-fg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 30 H56 A24 22 0 0 1 8 30 Z" />
        <path d="M25 53 H39" />
      </g>
    </svg>
  );
}
