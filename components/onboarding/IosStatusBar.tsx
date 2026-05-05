"use client";

import { useEffect, useState } from "react";

/**
 * Mock iOS status bar — 9:41, signal, wifi, battery.
 *
 * Renders a pixel-accurate echo of the iOS Pro / Dynamic Island bar:
 * - Centred Dynamic Island pill
 * - Time on the left
 * - Signal bars + Wi-Fi + battery on the right
 *
 * Time defaults to 9:41 (Apple keynote standard) so the design feels
 * staged. After mount the time updates to the real device time so the
 * preview feels alive.
 */
export function IosStatusBar({
  tone = "dark",
  showIsland = true,
}: {
  tone?: "dark" | "light";
  showIsland?: boolean;
}) {
  const fg = tone === "dark" ? "#0e1116" : "#F6FFF8";
  const [time, setTime] = useState("9:41");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours() % 12 || 12;
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[44px] w-full select-none">
      {showIsland && (
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-[7px] h-[26px] w-[100px] rounded-full bg-[#0e1116]"
        />
      )}
      <div
        className="relative flex items-center justify-between h-full px-6 text-[15px] font-semibold tabular tracking-tight"
        style={{ color: fg }}
      >
        <span>{time}</span>
        <span className="flex items-center gap-1.5">
          {/* signal bars */}
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <rect x="0" y="7" width="3" height="4" rx="0.6" fill={fg} />
            <rect x="5" y="5" width="3" height="6" rx="0.6" fill={fg} />
            <rect x="10" y="3" width="3" height="8" rx="0.6" fill={fg} />
            <rect x="15" y="0" width="3" height="11" rx="0.6" fill={fg} />
          </svg>
          {/* wifi */}
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path
              d="M8 11 L 6 9 a 2.83 2.83 0 0 1 4 0 Z"
              fill={fg}
            />
            <path
              d="M8 6.4 a 5.6 5.6 0 0 0 -3.95 1.65 l -1.4 -1.4 a 7.6 7.6 0 0 1 10.7 0 l -1.4 1.4 A 5.6 5.6 0 0 0 8 6.4 Z"
              fill={fg}
            />
            <path
              d="M8 1.4 a 10.6 10.6 0 0 0 -7.5 3.1 L 2 6 a 8.5 8.5 0 0 1 12 0 l 1.5 -1.5 A 10.6 10.6 0 0 0 8 1.4 Z"
              fill={fg}
            />
          </svg>
          {/* battery */}
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="22"
              height="12"
              rx="3"
              stroke={fg}
              strokeOpacity="0.45"
            />
            <rect x="2.5" y="2.5" width="17" height="8" rx="1.5" fill={fg} />
            <rect x="23.5" y="4" width="2" height="5" rx="0.6" fill={fg} fillOpacity="0.45" />
          </svg>
        </span>
      </div>
    </div>
  );
}
