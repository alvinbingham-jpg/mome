/**
 * "NO CHAINS NO GAS NO STRESS" handwritten-feel rectangle sticker.
 */
export function NoChainsSticker({ width = 170 }: { width?: number }) {
  const height = (width * 56) / 170;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 170 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <rect
        x="3"
        y="3"
        width="164"
        height="50"
        rx="6"
        fill="#F6FFF8"
        stroke="#0e1116"
        strokeWidth="2.5"
      />
      <text
        x="85"
        y="22"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.6"
        textAnchor="middle"
      >
        NO CHAINS · NO GAS
      </text>
      <text
        x="85"
        y="42"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="14"
        fontWeight="900"
        fill="#16433D"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        JUST YIELD ✶
      </text>
    </svg>
  );
}
