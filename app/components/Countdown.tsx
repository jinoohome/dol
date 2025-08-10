"use client";

import { useEffect, useMemo, useState } from "react";

function diff(from: number, to: number) {
  const total = Math.max(0, to - from);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ date }: { date: string }) {
  const target = useMemo(() => new Date(date + "T00:00:00").getTime(), [date]);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = diff(now, target);
  return (
    <div className="flex items-center gap-3 text-sm text-muted">
      <span className="px-2 py-1 rounded-md bg-[#fff] border">D-{days}</span>
      <span>
        {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds
          .toString()
          .padStart(2, "0")}
      </span>
    </div>
  );
} 