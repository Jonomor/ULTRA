// src/hooks/useCountUp.ts
import { useEffect, useState } from "react";

type CountUpOptions = {
  start?: number;
  end: number;
  duration?: number; // in milliseconds
};

export function useCountUp({ start = 0, end, duration = 2000 }: CountUpOptions) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = progress * (end - start) + start;
      setValue(nextValue);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [start, end, duration]);

  return value;
}
