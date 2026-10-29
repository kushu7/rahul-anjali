import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function Preloader({ onFinish }) {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 350);
          setTimeout(() => onFinish(), 850);
          return 100;
        }
        const step = Math.floor(Math.random() * 14) + 8;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      className={`kc-night-gift fixed inset-0 z-[100] bg-deep-ebony text-silk-cream grid place-items-center transition-opacity duration-700 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6">
        <div className="relative mx-auto mb-8 w-16 h-16">
          <span className="absolute inset-0 rounded-full bg-gold-leaf/30 blur-xl animate-pulse" />
          <Heart className="relative w-16 h-16 mx-auto fill-gold-leaf text-gold-leaf animate-pulse" />
        </div>
        <p className="font-display italic text-2xl md:text-3xl text-silk-cream mb-3">
          Preparing your surprise…
        </p>
        <p className="text-silk-cream/60 text-sm tracking-wide">
          A little magic is on the way ❤
        </p>
        <div className="mt-8 mx-auto w-56">
          <div className="h-[3px] bg-silk-cream/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gold-leaf rounded-full transition-[width] duration-300 ease-out shadow-[0_0_10px_rgba(212,175,55,0.6)]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-3 text-gold-leaf text-sm tracking-[0.2em] tabular-nums">
            {percent}%
          </p>
        </div>
      </div>
    </div>
  );
}
