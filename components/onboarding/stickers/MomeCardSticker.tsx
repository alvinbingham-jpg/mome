/**
 * Mome card sticker — black debit-card mockup with chip + wordmark.
 *
 * Rendered as a flat SVG so it scales crisply at any size. Includes a
 * subtle aurora glint along the top-right and a USDC stripe on the right
 * edge to ground the brand.
 */
export function MomeCardSticker({ width = 170 }: { width?: number }) {
  const height = (width * 108) / 170;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 170 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="card-bg" x1="0" y1="0" x2="170" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0e1116" />
          <stop offset="1" stopColor="#1a1f26" />
        </linearGradient>
        <linearGradient id="card-glint" x1="120" y1="0" x2="170" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#88E3A2" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#B8A6F2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFB8A6" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="chip" x1="0" y1="0" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E6C88B" />
          <stop offset="1" stopColor="#A98A4F" />
        </linearGradient>
      </defs>
      <rect width="170" height="108" rx="14" fill="url(#card-bg)" />
      <rect width="170" height="108" rx="14" fill="url(#card-glint)" opacity="0.6" />

      {/* Chip */}
      <rect x="14" y="22" width="22" height="18" rx="4" fill="url(#chip)" />
      <line x1="14" y1="31" x2="36" y2="31" stroke="#0e1116" strokeOpacity="0.35" strokeWidth="0.8" />
      <line x1="25" y1="22" x2="25" y2="40" stroke="#0e1116" strokeOpacity="0.35" strokeWidth="0.8" />

      {/* USDC stripe */}
      <rect x="148" y="14" width="6" height="80" rx="3" fill="#88E3A2" opacity="0.85" />

      {/* Wordmark */}
      <text
        x="14"
        y="74"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="700"
        fill="#F6FFF8"
        letterSpacing="0.4"
      >
        mo
        <tspan fill="#88E3A2">●</tspan>
        me
      </text>
      <text
        x="14"
        y="89"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        fill="#F6FFF8"
        opacity="0.55"
        letterSpacing="0.3"
      >
        USDC · UNIFIED
      </text>

      {/* Visa-ish wordmark */}
      <text
        x="124"
        y="93"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="800"
        fill="#F6FFF8"
        opacity="0.85"
        letterSpacing="0.3"
      >
        VISA
      </text>
    </svg>
  );
}
