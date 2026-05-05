/**
 * QUIET MODE green square sticker — bold playful "look here" badge.
 */
export function QuietModeSticker({ width = 130 }: { width?: number }) {
  const height = width;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <rect
        x="6"
        y="6"
        width="118"
        height="118"
        rx="8"
        fill="#C7F560"
        stroke="#0e1116"
        strokeWidth="3"
      />
      {/* black diagonal hatch banner */}
      <g>
        <rect x="6" y="22" width="118" height="20" fill="#0e1116" />
        <text
          x="65"
          y="36"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="13"
          fontWeight="900"
          fill="#C7F560"
          letterSpacing="2"
          textAnchor="middle"
        >
          QUIET MODE
        </text>
      </g>

      <text
        x="65"
        y="76"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="36"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="-1"
        textAnchor="middle"
      >
        ON
      </text>

      <text
        x="65"
        y="100"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="9"
        fontWeight="700"
        fill="#0e1116"
        letterSpacing="0.8"
        textAnchor="middle"
      >
        CHAINS HIDDEN
      </text>
      <text
        x="65"
        y="113"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="9"
        fontWeight="700"
        fill="#0e1116"
        letterSpacing="0.8"
        textAnchor="middle"
      >
        YIELD VISIBLE
      </text>
    </svg>
  );
}
