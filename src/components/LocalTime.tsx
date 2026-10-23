"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Colombo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// Live clock in Colombo time. Renders a placeholder on the server to avoid hydration mismatch.
export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {time ?? "--:--:--"} <span className="opacity-50">GMT+5:30</span>
    </span>
  );
}
