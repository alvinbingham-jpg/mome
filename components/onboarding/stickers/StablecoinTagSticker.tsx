/**
 * STABLECOIN keychain tag — pink oval with a clip ring up top.
 */
export function StablecoinTagSticker({ width = 130 }: { width?: number }) {
  const height = (width * 88) / 130;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 130 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="kc-bg" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB6C9" />
          <stop offset="1" stopColor="#F77FA0" />
        </linearGradient>
      </defs>
      {/* clip ring */}
      <circle cx="65" cy="9" r="7" fill="none" stroke="#0e1116" strokeWidth="2.5" />
      <circle cx="65" cy="9" r="2.5" fill="#0e1116" />

      {/* string */}
      <line x1="65" y1="16" x2="65" y2="22" stroke="#0e1116" strokeWidth="1.5" />

      {/* oval body */}
      <ellipse cx="65" cy="55" rx="58" ry="28" fill="url(#kc-bg)" stroke="#0e1116" strokeWidth="3" />

      {/* inner border */}
      <ellipse cx="65" cy="55" rx="52" ry="22" fill="none" stroke="#0e1116" strokeWidth="1" />

      <text
        x="65"
        y="60"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="14"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.6"
        textAnchor="middle"
      >
        STABLECOIN
      </text>
    </svg>
  );
}
