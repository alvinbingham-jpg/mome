/**
 * Spiky star sticker — orange "we got you" loud accent.
 */
export function StarSticker({
  width = 130,
  fill = "#FF6F4D",
}: {
  width?: number;
  fill?: string;
}) {
  const height = width;
  // 12-point spiky star path centered at 65,65
  const cx = 65;
  const cy = 65;
  const points: string[] = [];
  const spikes = 12;
  const outer = 60;
  const inner = 44;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * 2 * i) / (spikes * 2) - Math.PI / 2;
    points.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <polygon
        points={points.join(" ")}
        fill={fill}
        stroke="#0e1116"
        strokeWidth="2.5"
      />
      <text
        x={cx}
        y={cy - 8}
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        WE
      </text>
      <text
        x={cx}
        y={cy + 5}
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        GOT
      </text>
      <text
        x={cx}
        y={cy + 18}
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        YOUR
      </text>
      <text
        x={cx}
        y={cy + 31}
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="900"
        fill="#0e1116"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        BACK
      </text>
    </svg>
  );
}
