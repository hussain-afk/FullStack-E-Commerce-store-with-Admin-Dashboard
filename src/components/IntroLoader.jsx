import React, { useEffect, useState } from "react";

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black text-white p-6 sm:p-12 font-sans select-none">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-white/60 uppercase">
          SHOP.CO — COLLECTION 2026
        </span>
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/40">
          LOADING...
        </span>
      </div>

      {/* Center Big Typography */}
      <div className="my-auto text-center sm:text-left">
        <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none mb-4">
          FIND CLOTHES <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
            THAT MATCHES
          </span>{" "}
          YOUR STYLE
        </h1>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">
            Preparing Catalog
          </p>
          <span className="text-4xl sm:text-6xl font-black tracking-tight">
            {progress}%
          </span>
        </div>
        <div className="w-full bg-white/10 h-[3px] rounded-full overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}