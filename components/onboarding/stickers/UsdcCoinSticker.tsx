/**
 * USDC coin sticker — circular badge mimicking a stamped coin.
 */
export function UsdcCoinSticker({ width = 96 }: { width?: number }) {
  const height = width;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <circle cx="48" cy="48" r="44" fill="#2775CA" stroke="#0e1116" strokeWidth="3" />
      <circle cx="48" cy="48" r="38" fill="none" stroke="#F6FFF8" strokeOpacity="0.5" strokeWidth="1" />
      <text
        x="48"
        y="44"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="20"
        fontWeight="900"
        fill="#F6FFF8"
        letterSpacing="-0.5"
        textAnchor="middle"
      >
        USDC
      </text>
      <text
        x="48"
        y="62"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="9"
        fontWeight="700"
        fill="#F6FFF8"
        opacity="0.85"
        letterSpacing="0.6"
        textAnchor="middle"
      >
        $1.00
      </text>
    </svg>
  );
}
