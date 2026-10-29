import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sparkles } from 'lucide-react';

const CHOCOLATE_IMAGES = [
  '/chocolates/kc-choc-1.png',
  '/chocolates/kc-choc-2.png',
  '/chocolates/kc-choc-3.png',
  '/chocolates/kc-choc-4.png',
  '/chocolates/kc-choc-5.png',
  '/chocolates/kc-choc-6.png',
  '/chocolates/kc-choc-7.png',
  '/chocolates/kc-choc-8.png',
];

export default function SweetSurprise({ sweetSurprise = {} }) {
  // Steps: 'idle' -> 'sparks' -> 'raining' -> 'settled' -> 'fading' -> 'message'
  const [step, setStep] = useState('idle');
  const [hasStartedFalling, setHasStartedFalling] = useState(false);
  const [chocolates, setChocolates] = useState([]);
  const timeoutsRef = useRef([]);
  const idCounterRef = useRef(0);
  const stepRef = useRef('idle');

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const chocolateList =
    sweetSurprise.chocolates && sweetSurprise.chocolates.length > 0
      ? sweetSurprise.chocolates
      : CHOCOLATE_IMAGES;

  // Preload chocolate assets
  useEffect(() => {
    chocolateList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [chocolateList]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  function setTimer(fn, delay) {
    const timerId = window.setTimeout(fn, delay);
    timeoutsRef.current.push(timerId);
    return timerId;
  }

  function handleButtonClick() {
    if (step !== 'idle') return;
    setStep('sparks');
    setTimer(triggerChocolateShower, 520);
  }

  function triggerChocolateShower() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const colStep = Math.max(76, Math.min(112, width / 12));
    const rowStep = Math.max(56, Math.min(78, height / 14));
    const cols = Math.ceil(width / colStep) + 2;
    const rows = Math.ceil(height / rowStep) + 3;

    const items = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const size = 96 + Math.random() * 64;
        const colOffset = r % 2 === 0 ? 0 : colStep * 0.45;
        const targetX = c * colStep - colStep + colOffset + (Math.random() - 0.5) * 22;
        const targetY = height - (r + 1) * rowStep - Math.random() * 18;
        const delay = prefersReducedMotion ? 0 : Math.max(0, r * 25 + Math.random() * 300 + c * 6);
        const duration = prefersReducedMotion ? 900 : 5000 + Math.random() * 2000;

        items.push({
          id: idCounterRef.current++,
          src: chocolateList[(r + c + Math.floor(Math.random() * chocolateList.length)) % chocolateList.length],
          x: targetX,
          startX: targetX + (Math.random() - 0.5) * 180,
          startY: -height * 0.55 - size - Math.random() * height * 0.45,
          targetY: targetY,
          rot: Math.random() * 360,
          targetRot: Math.random() * 360 - 180,
          size: size,
          duration: duration,
          delay: delay,
        });
      }
    }

    setChocolates(items.sort(() => Math.random() - 0.5));
    setHasStartedFalling(false);
    setStep('raining');

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setHasStartedFalling(true);
      });
    });

    const maxWait = items.reduce((max, item) => Math.max(max, item.duration + item.delay), 0);

    setTimer(() => {
      setStep('settled');
      setTimer(() => {
        setStep('fading');
        setTimer(() => {
          setChocolates([]);
          setHasStartedFalling(false);
          setStep('message');
        }, 550);
      }, 200);
    }, maxWait + 100);
  }

  const isButtonVisible = step === 'idle' || step === 'sparks';
  const isSparking = step === 'sparks';
  const isChocActive = step === 'raining' || step === 'settled' || step === 'fading';
  const isFading = step === 'fading';
  const isMessageVisible = step === 'message';

  return (
    <section className="py-20 md:py-28 px-6 relative" aria-label="Sweet surprise">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl italic text-balance text-silk-cream">
          {sweetSurprise.headline || "🍯 You're the sweetest part of my life."}
        </h2>
        <p className="mt-5 text-silk-cream/80 text-lg">
          {sweetSurprise.subheadline || 'And I wanted to make your day just a little sweeter.'}
        </p>

        <div className="mt-10 min-h-[80px] relative inline-block">
          {/* Button and Sparkles */}
          {isButtonVisible && (
            <>
              {isSparking && (
                <div className="pointer-events-none absolute inset-0 -m-8" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-1/2 text-gold-leaf"
                      style={{ transform: `rotate(${(i * 360) / 14}deg)` }}
                    >
                      <span
                        className="block"
                        style={{ animation: 'kc-sparkle-out 600ms ease-out forwards' }}
                      >
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleButtonClick}
                disabled={step !== 'idle'}
                style={{
                  opacity: isSparking ? 0 : 1,
                  transform: isSparking ? 'scale(0.85)' : undefined,
                  transition: 'opacity 500ms ease-out, transform 500ms ease-out',
                  pointerEvents: isSparking ? 'none' : 'auto',
                }}
                className={`relative px-8 py-4 rounded-full font-display italic text-lg md:text-xl text-[#010f24] bg-gold-leaf hover:bg-gold-leaf/95 shadow-[0_10px_40px_-10px_rgba(242,200,108,0.7)] border border-gold-leaf/40 cursor-pointer ${
                  step === 'idle' ? 'kc-choc-heartbeat' : ''
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#010f24]" />
                  <span>{sweetSurprise.buttonText || 'Tap here for a surprise'}</span>
                </span>
              </button>
            </>
          )}

          {/* Sweet Revealing Message */}
          {isMessageVisible && (
            <p
              className="font-display italic text-2xl md:text-4xl text-silk-cream text-balance"
              style={{
                opacity: 0,
                transform: 'translateY(12px)',
                animation: 'kc-message-fade-in 900ms ease-out 120ms forwards',
              }}
            >
              {sweetSurprise.revealedMessage || 'Because you deserve all the sweetness in the world. ❤️'}
            </p>
          )}
        </div>
      </div>

      {/* Raining Chocolates Waterfall and Stacking Cascade */}
      {isChocActive && (
        <div
          className={`fixed inset-0 z-[80] pointer-events-none overflow-hidden transition-opacity duration-500 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          {chocolates.map((item) => (
            <img
              key={item.id}
              src={item.src}
              alt=""
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${item.size}px`,
                height: 'auto',
                transform: hasStartedFalling
                  ? `translate3d(${item.x}px, ${item.targetY}px, 0) rotate(${item.targetRot}deg)`
                  : `translate3d(${item.startX}px, ${item.startY}px, 0) rotate(${item.rot}deg)`,
                transition: prefersReducedMotion
                  ? 'transform 900ms ease-out'
                  : `transform ${item.duration}ms cubic-bezier(0.12, 0.78, 0.16, 1) ${item.delay}ms`,
                willChange: 'transform',
                filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))',
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
