import React, { useMemo } from 'react';

export default function NightSky({ showMoon = true, count = 18 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, r) => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        size: 12 + Math.random() * 18,
        opacity: 0.35 + Math.random() * 0.4,
        key: r,
      })),
    [count]
  );

  return (
    <>
      <div className="kc-sky-fixed" aria-hidden="true">
        <img
          src="/assets/moonlit-sky-nomoon-D3MNJr_9.jpg"
          width={1440}
          height={1200}
          alt=""
          className="kc-sky-fixed-img"
        />
        <div className="kc-sky-fixed-veil" />
        {showMoon && (
          <img
            src="/assets/moon-BlawUC1r.png"
            width={816}
            height={816}
            alt=""
            className="kc-moon kc-moon-fixed"
          />
        )}
        <span className="kc-shoot kc-shoot-1" />
        <span className="kc-shoot kc-shoot-2" />
        <span className="kc-shoot kc-shoot-3" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
        {hearts.map((a) => (
          <span
            key={a.key}
            className="kc-floating-heart"
            style={{
              left: `${a.left}%`,
              bottom: '-40px',
              fontSize: `${a.size}px`,
              opacity: a.opacity,
              animationDuration: `${a.duration}s`,
              animationDelay: `${a.delay}s`,
            }}
          >
            ❤
          </span>
        ))}
      </div>
    </>
  );
}

export function CandleDiya({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="relative w-24 h-32">
        <div className="kc-candle-glow absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,180,90,0.55),rgba(255,140,40,0.18)_45%,transparent_70%)]" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1">
          <div className="kc-flame-flicker relative w-5 h-10">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_50%_70%,#fff7c2,#ffb347_45%,#ff6a00_75%,transparent_90%)]" />
            <div className="absolute inset-x-1 top-2 bottom-1 rounded-full bg-white/70 blur-[0.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
