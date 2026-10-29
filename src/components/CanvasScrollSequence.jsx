import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function CanvasScrollSequence({
  frames = [],
  title = "For the one who makes my world beautiful.",
  bgColor = "#060606",
  hasGoldRing = true
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const touchStartY = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalFrames = frames.length;

  // 1. Preload all frames into memory
  useEffect(() => {
    if (!totalFrames) return;
    let canceled = false;
    let count = 0;
    const imgs = new Array(totalFrames);

    frames.forEach((src, idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!canceled) {
          count += 1;
          setLoadedCount(count);
          if (count === totalFrames) {
            setIsLoaded(true);
          }
        }
      };
      img.onerror = () => {
        if (!canceled) {
          count += 1;
          setLoadedCount(count);
          if (count === totalFrames) {
            setIsLoaded(true);
          }
        }
      };
      img.src = src;
      imgs[idx] = img;
    });

    imagesRef.current = imgs;

    return () => {
      canceled = true;
    };
  }, [totalFrames, frames]);

  // 2. Resize canvas internal buffer to match container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth || 460;
    const h = parent.clientHeight || 580;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  // 3. Draw specified frame onto canvas with aspect-ratio centering
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imgs = imagesRef.current;
    if (!imgs || imgs.length === 0) return;

    const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(frameIdx)));
    let img = imgs[clamped];

    // Fallback to nearest loaded frame if current isn't ready
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const left = clamped - offset;
        const right = clamped + offset;
        if (left >= 0 && imgs[left] && imgs[left].complete && imgs[left].naturalWidth > 0) {
          img = imgs[left];
          break;
        }
        if (right < totalFrames && imgs[right] && imgs[right].complete && imgs[right].naturalWidth > 0) {
          img = imgs[right];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const kw = canvas.width;
    const kh = canvas.height;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, kw, kh);

    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;

    const scale = Math.min(kw / nw, kh / nh);
    const dw = nw * scale;
    const dh = nh * scale;
    const dx = (kw - dw) / 2;
    const dy = (kh - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, [totalFrames, bgColor]);

  // 4. Smooth continuous scroll tracking
  useEffect(() => {
    if (!totalFrames) return;

    function renderImmediate(target) {
      currentFrameRef.current = target;
      drawFrame(target);
    }

    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const secH = section.offsetHeight || vh;

      // Continuous viewport travel mapping with zero dead zones:
      // Starts as section top enters viewport (rect.top = vh),
      // Finishes as section bottom leaves viewport (rect.top = -secH)
      const totalTravel = vh + secH;
      const currentTravel = vh - rect.top;
      const progress = Math.min(1, Math.max(0, currentTravel / totalTravel));

      const target = progress * (totalFrames - 1);
      targetFrameRef.current = target;

      // Draw immediately on scroll for instant 60fps/120fps responsiveness
      renderImmediate(target);
    }

    function onResize() {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    }

    resizeCanvas();
    drawFrame(0);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames, drawFrame, resizeCanvas]);

  // Redraw when images load
  useEffect(() => {
    if (isLoaded || loadedCount > 0) {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    }
  }, [isLoaded, loadedCount, resizeCanvas, drawFrame]);

  // Touch and drag scrub support
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current == null) return;
    const dy = touchStartY.current - e.touches[0].clientY;
    const step = (dy / (window.innerHeight * 0.35)) * (totalFrames - 1);
    const newTarget = Math.max(0, Math.min(totalFrames - 1, targetFrameRef.current + step));
    targetFrameRef.current = newTarget;
    currentFrameRef.current = newTarget;
    drawFrame(newTarget);
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  const progressPercent = totalFrames > 0 ? Math.round((loadedCount / totalFrames) * 100) : 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start py-12 md:py-16"
      style={{ background: bgColor }}
      aria-label="Scroll animation"
    >
      <div className="sticky top-12 md:top-16 w-full flex flex-col items-center justify-center px-4 md:px-6 z-10">
        <h2 className="font-display italic text-2xl md:text-4xl text-balance text-center text-silk-cream mb-6 md:mb-8 max-w-3xl whitespace-pre-line">
          {title}
        </h2>

        <div
          className="relative w-full max-w-[520px] flex items-center justify-center cursor-ns-resize"
          style={{
            height: 'min(640px, 72vh)',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            className={`w-full h-full block rounded-3xl ${
              hasGoldRing
                ? 'shadow-[0_0_40px_rgba(212,175,55,0.35),0_0_90px_rgba(212,175,55,0.15)] ring-1 ring-gold-leaf/40'
                : 'shadow-[0_0_40px_rgba(212,175,55,0.35),0_0_90px_rgba(212,175,55,0.15)] ring-1 ring-gold-leaf/40'
            }`}
            style={{
              background: bgColor,
            }}
          />

          {!isLoaded && progressPercent < 100 && (
            <div className="absolute inset-0 grid place-items-center pointer-events-none rounded-3xl bg-[#060606]/60 backdrop-blur-[2px]">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold-leaf/90 font-medium">
                Loading {progressPercent}%
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
