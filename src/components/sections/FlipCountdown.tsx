import { useEffect, useRef, useState } from "react";

import { useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return [
    Math.floor(ms / 86400000),
    Math.floor(ms / 3600000) % 24,
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60,
  ];
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function FlipCountdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  const [values, setValues] = useState<number[]>(() => diff(t));
  const ok = useMotionOk();

  useEffect(() => {
    // Sync immediately on mount
    setValues(diff(t));
    const id = window.setInterval(() => {
      setValues(diff(t));
    }, 1000);
    return () => window.clearInterval(id);
  }, [t]);

  return (
    <div className="mx-auto grid max-w-lg grid-cols-4 gap-2.5 sm:gap-4 px-2" suppressHydrationWarning>
      {UNITS.map((u, i) => {
        const val = values[i] ?? 0;
        return (
          <FlipUnit
            key={u}
            label={u}
            value={val}
            animate={ok}
            highlight={
              (u === "Days" && (values[0] ?? 0) <= 7) ||
              (u === "Hours" && (values[1] ?? 0) <= 6)
            }
          />
        );
      })}
    </div>
  );
}

function FlipUnit({
  label,
  value,
  animate,
  highlight,
}: {
  label: string;
  value: number;
  animate: boolean;
  highlight: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animatingValue, setAnimatingValue] = useState<number | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setDisplayValue(value);
      return;
    }

    if (value !== displayValue) {
      if (animate) {
        setAnimatingValue(value);
        const timer = setTimeout(() => {
          setDisplayValue(value);
          setAnimatingValue(null);
        }, 400);
        return () => clearTimeout(timer);
      } else {
        setDisplayValue(value);
        setAnimatingValue(null);
      }
    }
  }, [value, displayValue, animate]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border border-gold/30 bg-card/60 px-2 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-5 shadow-lg transition-all duration-300",
        highlight && "ring-1 ring-gold/45 shadow-[0_0_15px_rgba(225,190,120,0.25)]",
      )}
    >
      <div className="relative h-10 sm:h-12 w-full overflow-hidden flex items-center justify-center">
        {animatingValue !== null ? (
          <>
            {/* Sliding out old number */}
            <div
              key={`old-${displayValue}`}
              aria-hidden
              className="font-display absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl gold-text tabular-nums"
              style={{
                animation: "flip-out-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <span>{pad(displayValue)}</span>
            </div>
            {/* Sliding in new number */}
            <div
              key={`new-${animatingValue}`}
              className="font-display absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl gold-text tabular-nums"
              style={{
                animation: "flip-in-top 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <span>{pad(animatingValue)}</span>
            </div>
          </>
        ) : (
          <div className="font-display absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl gold-text tabular-nums">
            <span>{pad(displayValue)}</span>
          </div>
        )}
      </div>
      <div className="mt-2 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] text-gold-soft/80 font-medium">
        {label}
      </div>
    </div>
  );
}
