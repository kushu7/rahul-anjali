import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

const CONFETTI_COLORS = [
  '#ffb3c1',
  '#ffd6a5',
  '#fdffb6',
  '#caffbf',
  '#bdb2ff',
  '#ffc6ff',
  '#fff1a8',
];

function generateConfetti(count = 80) {
  const shapes = ['circle', 'star', 'sparkle', 'heart'];
  return Array.from({ length: count }).map((_, r) => ({
    id: r,
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 2.2 + Math.random() * 1.8,
    rotate: Math.random() * 360,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: 8 + Math.random() * 12,
  }));
}

export default function ScratchCard({ scratchConfig = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isPointerDown = useRef(false);
  const lastPoint = useRef(null);
  const checkCounter = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [canvasFaded, setCanvasFaded] = useState(false);
  const [confettiPieces] = useState(() => generateConfetti(80));

  const prize = scratchConfig.prize || '❤️ My Heart ❤️';

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#c4c8d4');
    grad.addColorStop(0.5, '#d7dbe6');
    grad.addColorStop(1, '#b8bcc8');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * rect.width,
        Math.random() * rect.height,
        Math.random() * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(60,60,70,0.85)';
    ctx.font = `600 ${Math.max(18, rect.width * 0.05)}px "Montserrat", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❤️ Scratch Here ❤️', rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    setupCanvas();
    const onResize = () => setupCanvas();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setupCanvas]);

  const triggerReveal = useCallback(() => {
    if (isRevealed || canvasFaded) return;
    setCanvasFaded(true);
    setTimeout(() => setIsRevealed(true), 650);
  }, [isRevealed, canvasFaded]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    checkCounter.current++;
    if (checkCounter.current % 4 !== 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height).data;

    let cleared = 0;
    const step = 32;
    let total = 0;

    for (let i = 3; i < imgData.length; i += 4 * step) {
      total++;
      if (imgData[i] < 60) cleared++;
    }

    if (cleared / total > 0.42) {
      triggerReveal();
    }
  }, [triggerReveal]);

  const drawScratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 38;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = { x, y };
    checkProgress();
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <section className="py-16 md:py-24 px-6 relative" aria-label="Scratch surprise card">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl italic text-balance mb-4 text-silk-cream">
          <span className="text-gold-leaf">✨</span> One Last Surprise Awaits...{' '}
          <span className="text-gold-leaf">✨</span>
        </h2>

        <div className="relative mx-auto" style={{ maxWidth: 420 }}>
          {isRevealed && (
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] kc-reveal-glow"
              aria-hidden="true"
            />
          )}

          <div
            ref={containerRef}
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/30 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] ${
              isRevealed ? 'kc-card-pop' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, #fff1f3 0%, #ffe4ec 40%, #f5e1ff 100%)',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 select-none">
              <p className="font-display italic text-2xl md:text-3xl text-romantic-red mb-1">
                {scratchConfig.jackpotTitle || '🏆 JACKPOT!'}
              </p>
              <p className="text-deep-ebony/80 text-sm md:text-base mb-1">
                {scratchConfig.subtitle || 'Congratulations!'}
              </p>
              <p className="text-deep-ebony/70 text-xs md:text-sm uppercase tracking-[0.25em] mb-3">
                You Won...
              </p>

              <p
                className={`font-display italic text-deep-ebony text-5xl md:text-6xl leading-none ${
                  isRevealed ? 'kc-heart-beat' : ''
                }`}
              >
                ❤️
              </p>
              <p
                className={`font-display italic ${
                  prize.trim().length <= 12 ? 'text-6xl md:text-7xl' : 'text-3xl md:text-4xl'
                } leading-tight my-2 w-full break-words text-romantic-red ${
                  isRevealed ? 'kc-heart-beat' : ''
                }`}
              >
                {prize}
              </p>
              <p
                className={`font-display italic text-deep-ebony text-5xl md:text-6xl leading-none ${
                  isRevealed ? 'kc-heart-beat' : ''
                }`}
              >
                ❤️
              </p>

              <div className="my-3 text-deep-ebony/40 tracking-[0.4em] text-xs">
                ━━━━━━━━━━
              </div>

              <p className="text-deep-ebony/75 text-sm md:text-base leading-relaxed">
                No Expiry.
                <br />
                No Returns.
                <br />
                Yours Forever. ♾️
              </p>
            </div>

            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-700 ${
                canvasFaded ? 'opacity-0' : 'opacity-100'
              } ${isRevealed ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
              onPointerDown={(e) => {
                if (isRevealed) return;
                e.target.setPointerCapture?.(e.pointerId);
                isPointerDown.current = true;
                const { x, y } = getPos(e);
                lastPoint.current = null;
                drawScratch(x, y);
              }}
              onPointerMove={(e) => {
                if (!isPointerDown.current || isRevealed) return;
                const { x, y } = getPos(e);
                drawScratch(x, y);
              }}
              onPointerUp={() => {
                isPointerDown.current = false;
                lastPoint.current = null;
              }}
              onPointerLeave={() => {
                isPointerDown.current = false;
                lastPoint.current = null;
              }}
            />

            {!canvasFaded && (
              <div className="pointer-events-none absolute inset-0 kc-scratch-shimmer" aria-hidden="true" />
            )}
          </div>

          {/* Authentic Live Site Cascading Confetti Pieces */}
          {isRevealed && (
            <div className="pointer-events-none absolute -inset-20 overflow-visible" aria-hidden="true">
              {confettiPieces.map((w) => (
                <span
                  key={w.id}
                  className="absolute top-0 kc-confetti-piece"
                  style={{
                    left: `${w.left}%`,
                    animationDelay: `${w.delay}s`,
                    animationDuration: `${w.duration}s`,
                    color: w.color,
                    fontSize: `${w.size}px`,
                    transform: `rotate(${w.rotate}deg)`,
                  }}
                >
                  {w.shape === 'star' ? '★' : w.shape === 'sparkle' ? '✦' : w.shape === 'heart' ? '♥' : '●'}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isRevealed && (
          <p className="mt-6 text-silk-cream/55 text-xs uppercase tracking-[0.3em] inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-leaf" />
            <span>Scratch to reveal</span>
          </p>
        )}
      </div>
    </section>
  );
}
