// src/components/charts/TradingViewTile.tsx
import React from "react";
import { useEffect, useRef } from "react";

interface Props {
  defaultSymbol?: string;
  interval?: string;
  theme?: "dark" | "light";
  chartType?: "advanced" | "lite";
}

export default function TradingViewTile({
  defaultSymbol = "BINANCE:BTCUSDT",
  interval = "60",
  theme = "dark",
  chartType = "advanced",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).TradingView && containerRef.current) {
        new (window as any).TradingView.widget({
          container_id: containerRef.current.id,
          autosize: true,
          symbol: defaultSymbol,
          interval,
          timezone: "Etc/UTC",
          theme,
          style: chartType === "advanced" ? 1 : 0,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          withdateranges: true,
          allow_symbol_change: true,
          studies: [
            "ULTRA PRO+ Master Combined Edition",
            "ULTRA PRO+ Indicator Brain – Advanced",
            "📊 Market Regime Scanner – Binary Outputs"
          ],
          details: true,
          hotlist: false,
          calendar: false,
          locale: "en",
        });
      }
    };

    containerRef.current?.appendChild(script);
    return () => {
      containerRef.current?.innerHTML && (containerRef.current.innerHTML = "");
    };
  }, [defaultSymbol, interval, theme, chartType]);

  return (
    <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] bg-zinc-900 rounded overflow-hidden border border-zinc-800 shadow-md">
      <div id={`tv-chart-${defaultSymbol}`} ref={containerRef} className="w-full h-full" />
    </div>
  );
}
