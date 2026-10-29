import React, { useRef, useEffect } from 'react';

export default function IntroVideo({ onFinish, src = '/videos/karwa-intro-v3.mp4' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playing video
    video.play().catch(() => {
      // Fallback if browser requires interaction
      const trigger = () => {
        video.play().catch(() => {});
        window.removeEventListener('pointerdown', trigger);
      };
      window.addEventListener('pointerdown', trigger, { once: true });
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-deep-ebony overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        playsInline
        autoPlay
        onEnded={onFinish}
        onError={onFinish}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Skip Button */}
      <button
        onClick={onFinish}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-black/60 text-white/90 text-xs uppercase tracking-widest font-semibold backdrop-blur-md border border-white/20 hover:bg-black/80 transition-all cursor-pointer"
      >
        Skip →
      </button>
    </div>
  );
}

