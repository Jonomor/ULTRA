import { useEffect, useRef } from "react";
import TradingViewDeck from "../../components/charts/TradingViewDeck";


<TradingViewDeck />


interface Props {
  symbol: string;
  interval?: string;
  theme?: "light" | "dark";
  chartType?: "advanced" | "lite";
}

export default function TradingViewChart({
  symbol,
  interval = "60",
  theme = "dark",
  chartType = "advanced",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${chartType}-chart.js`;

    script.innerHTML = JSON.stringify({
      symbol,
      interval,
      theme,
      timezone: "America/New_York",
      autosize: true,
      locale: "en",
      style: chartType === "advanced" ? "1" : undefined,
      hide_side_toolbar: chartType === "lite",
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, [symbol, interval, theme, chartType]);

  return (
    <div className="h-[500px] w-full rounded-xl border" ref={containerRef} />
  );
}
