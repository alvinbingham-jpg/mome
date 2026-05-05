/**
 * APY ticket sticker — perforated edges, big % number, mood label.
 */
export function ApySticker({
  apy = 12,
  label = "BOOST MODE",
  tone = "#FFB8A6",
  width = 150,
}: {
  apy?: number;
  label?: string;
  tone?: string;
  width?: number;
}) {
  const height = (width * 80) / 150;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`apy-${label}`} x1="0" y1="0" x2="150" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={tone} />
          <stop offset="1" stopColor="#fff5ec" />
        </linearGradient>
      </defs>
      {/* ticket body */}
      <path
        d="M6 12 H 144 V 32 a4 4 0 0 0 0 16 V 68 H 6 V 48 a4 4 0 0 0 0 -16 Z"
        fill={`url(#apy-${label})`}
        stroke="#0e1116"
        strokeWidth="2.5"
      />
      {/* dashed perforation */}
      <line
        x1="75"
        y1="14"
        x2="75"
        y2="66"
        stroke="#0e1116"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />

      <text
        x="40"
        y="52"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="32"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="-1"
        textAnchor="middle"
      >
        {apy}%
      </text>

      <text
        x="112"
        y="38"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="9"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.6"
        textAnchor="middle"
      >
        {label}
      </text>
      <text
        x="112"
        y="54"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="8"
        fontWeight="700"
        fill="#0e1116"
        opacity="0.7"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        TARGET APY
      </text>
    </svg>
  );
}
