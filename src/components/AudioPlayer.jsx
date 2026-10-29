import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ audioUrl, audioTitle = 'A little something for you' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    let once = false;
    const attemptPlay = () => {
      audio.play().catch(() => {
        if (once) return;
        once = true;
        const trigger = () => {
          audio.play().catch(() => {});
          window.removeEventListener('pointerdown', trigger);
          window.removeEventListener('keydown', trigger);
          window.removeEventListener('touchstart', trigger);
        };
        window.addEventListener('pointerdown', trigger, { once: true });
        window.addEventListener('keydown', trigger, { once: true });
        window.addEventListener('touchstart', trigger, { once: true });
      });
    };

    if (audio.paused) {
      attemptPlay();
    }

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const handleToggle = () => {
    if (!hasInteracted) {
      setShowPrompt(false);
      setTimeout(() => setHasInteracted(true), 700);
    }

    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="h-auto whitespace-normal fixed top-5 right-5 z-50 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-romantic-red/90 backdrop-blur shadow-romantic hover:scale-105 transition text-silk-cream"
      >
        <span className="w-8 h-8 rounded-full bg-silk-cream/15 grid place-items-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 fill-gold-leaf text-gold-leaf" />
          ) : (
            <VolumeX className="w-4 h-4 fill-gold-leaf text-gold-leaf" />
          )}
        </span>
        <span className="text-[11px] uppercase tracking-widest font-bold max-w-[140px] truncate hidden sm:inline">
          {audioTitle}
        </span>
        <Music className="w-4 h-4 text-gold-leaf sm:hidden" />
      </button>

      {/* "Play the song" prompt tooltip */}
      {!hasInteracted && (
        <div
          aria-hidden={true}
          className={`fixed top-20 right-5 z-40 flex items-center gap-2 transition-opacity duration-700 pointer-events-none ${
            showPrompt ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Music className="w-4 h-4 text-gold-leaf" />
          <span className="font-display italic text-gold-leaf text-lg sm:text-xl whitespace-nowrap drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Play the song
          </span>
        </div>
      )}
    </>
  );
}
