import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function LoveLetter({ message, heading = 'Dear Love ❤️', id = 'kc-letter' }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpeningFlap, setIsOpeningFlap] = useState(false);
  const [isEnvelopeFaded, setIsEnvelopeFaded] = useState(false);
  const [showLetterText, setShowLetterText] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  function handleOpen() {
    if (hasStarted) return;
    setHasStarted(true);
    setTimeout(() => setIsOpeningFlap(true), 50);
    setTimeout(() => setShowLetterText(true), 100);
    setTimeout(() => setIsEnvelopeFaded(true), 950);
    setTimeout(() => setShowHearts(true), 1000);
    setTimeout(() => setShowHearts(false), 4000);
  }

  // Parse paragraphs by double newlines
  const paragraphs = (message || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <section id={id} className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-xl mx-auto text-center relative">
        <div
          className="relative mx-auto"
          style={{
            width: 'min(380px, 92vw)',
            height: 'min(760px, 185vw)',
          }}
        >
          {/* Sparkles on seal click */}
          {hasStarted && (
            <div className="absolute inset-0 pointer-events-none z-[55]">
              {Array.from({ length: 14 }).map((_, k) => (
                <span
                  key={k}
                  className="absolute block w-1.5 h-1.5 rounded-full bg-gold-leaf kc-envelope-sparkle"
                  style={{
                    left: `${12 + Math.random() * 76}%`,
                    top: `${10 + Math.random() * 70}%`,
                    animationDelay: `${Math.random() * 0.8}s`,
                    boxShadow: '0 0 8px rgba(212,175,55,0.9)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Floating Hearts */}
          {showHearts && (
            <div className="absolute inset-0 pointer-events-none z-[60]">
              {Array.from({ length: 8 }).map((_, k) => (
                <Heart
                  key={k}
                  className="absolute w-5 h-5 fill-romantic-red text-romantic-red kc-envelope-heart"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: '20%',
                    animationDelay: `${k * 0.18}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Top Flap SVG */}
          {!isEnvelopeFaded && (
            <svg
              viewBox="0 0 380 110"
              preserveAspectRatio="none"
              className="absolute inset-x-0 mx-auto w-full pointer-events-none"
              style={{
                bottom: 'min(255px, 64vw)',
                height: 'min(110px, 28vw)',
                zIndex: 20,
                opacity: isOpeningFlap ? 0 : 1,
                transition: 'opacity 900ms ease-in-out',
              }}
              aria-hidden="true"
            >
              <path
                d="M4 108 L190 4 L376 108 Z"
                fill="#14234a"
                stroke="#d4af37"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Sliding Parchment Letter */}
          <div
            className="absolute left-1/2 w-[90%]"
            style={{
              bottom: '45px',
              height: hasStarted ? 'min(540px, 135vw)' : 'min(330px, 82vw)',
              zIndex: 25,
              transform: 'translateX(-50%) translateY(0)',
              transition: 'height 900ms ease-in-out',
              transformOrigin: 'bottom center',
              willChange: 'transform',
            }}
          >
            <div
              className="relative rounded-md px-5 py-4 md:px-6 md:py-5 h-full flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #fdf6e3 0%, #f5e9c8 100%)',
                color: '#14254a',
                boxShadow: isOpeningFlap
                  ? '0 24px 50px -12px rgba(0,0,0,0.45), 0 0 70px rgba(212,175,55,0.28), inset 0 0 0 1px rgba(122,13,26,0.08)'
                  : '0 18px 35px -10px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(122,13,26,0.08)',
                transition: 'box-shadow 900ms ease-in-out',
              }}
            >
              <div
                className="absolute inset-2 rounded-sm pointer-events-none"
                style={{ border: '1px solid rgba(212,175,55,0.45)' }}
              />

              {!showLetterText && (
                <svg
                  viewBox="0 0 200 50"
                  className="absolute left-1/2 -translate-x-1/2 top-6 w-3/4 pointer-events-none"
                  aria-hidden="true"
                  style={{ transform: 'none' }}
                >
                  <path d="M0 30 C40 20 60 40 82 28" fill="none" stroke="#c9a14a" strokeWidth="1" />
                  <path d="M118 28 C140 40 160 20 200 30" fill="none" stroke="#c9a14a" strokeWidth="1" />
                  <path
                    d="M100 46s-16-9.5-19-19c-2-6.5 2.5-12 8-12 4.6 0 7.6 3 11 7 3.4-4 6.4-7 11-7 5.5 0 10 5.5 8 12-3 9.5-19 19-19 19z"
                    fill="none"
                    stroke="#c9a14a"
                    strokeWidth="1.6"
                  />
                </svg>
              )}

              <div
                className="relative flex-1 flex flex-col justify-start transition-opacity duration-[500ms] overflow-y-auto kc-scrollbar-hide"
                style={{ opacity: showLetterText ? 1 : 0 }}
              >
                <h3
                  className="font-display italic text-2xl md:text-3xl text-center mb-3 md:mb-4"
                  style={{ color: '#1b3a7a' }}
                >
                  {heading}
                </h3>
                <div className="font-display italic text-sm md:text-base leading-snug text-center space-y-2 md:space-y-3">
                  {paragraphs.map((line, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Front Envelope with Wax Seal */}
          {!isEnvelopeFaded && (
            <button
              type="button"
              onClick={handleOpen}
              aria-label="Open the letter"
              className="h-auto whitespace-normal absolute inset-x-0 bottom-0 mx-auto block w-full cursor-pointer focus:outline-none kc-envelope-float"
              style={{
                height: 'min(260px, 65vw)',
                zIndex: 30,
                pointerEvents: isOpeningFlap ? 'none' : 'auto',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  opacity: isOpeningFlap ? 0 : 1,
                  transform: isOpeningFlap ? 'scale(0.96)' : 'scale(1)',
                  filter: isOpeningFlap ? 'blur(6px)' : 'blur(0px)',
                  transition: 'opacity 900ms ease-in-out, transform 900ms ease-in-out, filter 900ms ease-in-out',
                }}
              >
                <svg
                  viewBox="0 0 380 260"
                  preserveAspectRatio="none"
                  className="absolute inset-0 !w-full !h-full"
                  style={{
                    zIndex: 30,
                    filter: 'drop-shadow(0 22px 30px rgba(0,0,0,0.55))',
                  }}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="kcEnvBody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#1c2d52" />
                      <stop offset="1" stopColor="#0c1630" />
                    </linearGradient>
                    <linearGradient id="kcEnvSide" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#15244a" />
                      <stop offset="1" stopColor="#0b1530" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="1"
                    y="1"
                    width="378"
                    height="258"
                    rx="12"
                    fill="url(#kcEnvBody)"
                    stroke="#d4af37"
                    strokeWidth="1.6"
                  />
                  <path d="M2 10 L190 150 L2 250 Z" fill="url(#kcEnvSide)" />
                  <path d="M378 10 L190 150 L378 250 Z" fill="url(#kcEnvSide)" />
                  <path d="M6 254 L190 132 L374 254 Z" fill="#0e1a38" strokeLinejoin="round" />
                  <path
                    d="M4 6 L190 150 L376 6"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Golden Heart Wax Seal */}
                {!hasStarted && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                    style={{
                      top: '56%',
                      transform: 'none',
                      zIndex: 45,
                      filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))',
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="!w-full !h-full" aria-hidden="true">
                      <defs>
                        <radialGradient id="kcSeal" cx="35%" cy="30%" r="80%">
                          <stop offset="0" stopColor="#f8e3a0" />
                          <stop offset="0.55" stopColor="#d4af37" />
                          <stop offset="1" stopColor="#8a6a1c" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M12 21s-7.5-4.6-9.5-9.2C1 8.4 3.2 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.8 0 6 3.9 4.5 7.3C19.5 16.4 12 21 12 21z"
                        fill="url(#kcSeal)"
                        stroke="#f6dc8f"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M12 17.6s-5-3.1-6.3-6.1c-.9-2.1.4-4.4 2.6-4.4 1.4 0 2.5.9 3.7 2.4 1.2-1.5 2.3-2.4 3.7-2.4 2.2 0 3.5 2.3 2.6 4.4C17 14.5 12 17.6 12 17.6z"
                        fill="none"
                        stroke="#8a6a1c"
                        strokeWidth="0.5"
                        opacity="0.7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )}
        </div>

        {/* Tap to open label with golden accent lines */}
        <div className="mt-8 relative">
          <div className={`transition-opacity duration-500 ${hasStarted ? 'opacity-0' : 'opacity-100'}`}>
            <p className="font-display text-base md:text-lg uppercase tracking-[0.4em] text-gold-leaf">
              Tap to open 💌
            </p>
            <div className="mt-3 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-20 md:w-28 bg-gradient-to-r from-transparent to-gold-leaf/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold-leaf" />
              <span className="h-px w-20 md:w-28 bg-gradient-to-l from-transparent to-gold-leaf/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
