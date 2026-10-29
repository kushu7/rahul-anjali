import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, ArrowRight, Volume2, VolumeX, Music } from 'lucide-react';
import { config } from './config';
import scrollFrames from './scroll-frames.json';
import Preloader from './components/Preloader';
import IntroVideo from './components/IntroVideo';
import NightSky from './components/NightSky';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import CanvasScrollSequence from './components/CanvasScrollSequence';
import PolaroidGallery from './components/PolaroidGallery';
import SweetSurprise from './components/SweetSurprise';
import BollywoodSection from './components/BollywoodSection';
import ScratchCard from './components/ScratchCard';
import GrandEnding from './components/GrandEnding';

// Extract 11-char YouTube ID
function getYouTubeId(url) {
  if (!url) return '0wlulIyVh0g';
  try {
    const parsed = new URL(url.trim());
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('/')[0];
    }
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com'].includes(parsed.hostname)) {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v');
      const parts = parsed.pathname.split('/');
      if (['embed', 'shorts', 'live'].includes(parts[1])) return parts[2];
    }
    return '0wlulIyVh0g';
  } catch {
    return '0wlulIyVh0g';
  }
}

export default function App() {
  // Steps: 'preloader' -> 'song' -> 'video' -> 'done'
  const [step, setStep] = useState('preloader');
  const [isPlaying, setIsPlaying] = useState(false);
  const ytIframeRef = useRef(null);

  const videoId = getYouTubeId(config.youtube_url);

  // Preload local canvas frames eagerly into memory
  useEffect(() => {
    if (scrollFrames.sequence1) {
      scrollFrames.sequence1.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
    if (scrollFrames.sequence2) {
      scrollFrames.sequence2.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, []);

  // Send command to persistent YouTube iframe
  const sendYtCommand = useCallback((func) => {
    if (ytIframeRef.current && ytIframeRef.current.contentWindow) {
      ytIframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: func, args: '' }),
        '*'
      );
    }
  }, []);

  const handleNextFromSong = () => {
    // Start playing YouTube video as background music
    sendYtCommand('playVideo');
    setIsPlaying(true);
    setStep('video');
  };

  const toggleMusic = () => {
    if (isPlaying) {
      sendYtCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendYtCommand('playVideo');
      setIsPlaying(true);
    }
  };

  // Listen to iframe state changes if available
  useEffect(() => {
    const onMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'onStateChange') {
          if (data.info === 1) setIsPlaying(true);
          else if (data.info === 2 || data.info === 0) setIsPlaying(false);
        }
      } catch {}
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="kc-theme kc-night-gift relative min-h-screen bg-background text-silk-cream overflow-x-clip">
      {/* 1. Preloader Screen */}
      {step === 'preloader' && (
        <Preloader onFinish={() => setStep('song')} />
      )}

      {/* 2. "Before We Begin… ❤️" Step with Persistent YouTube Player */}
      <div
        aria-hidden={step !== 'song'}
        className={
          step === 'song'
            ? 'kc-theme kc-night-gift fixed inset-0 z-[90] overflow-y-auto bg-background text-silk-cream'
            : 'fixed -left-[10000px] top-0 w-96 pointer-events-none'
        }
      >
        {step === 'song' && (
          <div className="kc-sky-fixed pointer-events-none" aria-hidden="true">
            <img
              src="https://dilse.gifts/assets/moonlit-sky-nomoon-D3MNJr_9.jpg"
              width={1440}
              height={1200}
              alt=""
              className="kc-sky-fixed-img"
            />
            <div className="kc-sky-fixed-veil" />
            <img
              src="https://dilse.gifts/assets/moon-BlawUC1r.png"
              width={816}
              height={816}
              alt=""
              className="kc-moon kc-moon-fixed"
            />
          </div>
        )}

        <div className="relative min-h-svh flex flex-col items-center justify-center py-8 px-4 z-10">
          <section aria-label="Our song" className="relative w-full max-w-xl mx-auto text-center flex flex-col items-center">
            {/* Gold Heart Icon */}
            <Heart className="mx-auto mb-4 h-7 w-7 text-gold-leaf fill-gold-leaf animate-pulse" />

            {/* Heading */}
            <h2 className="font-display text-4xl md:text-5xl italic text-silk-cream mb-4">
              Before We Begin… ❤️
            </h2>

            {/* Romantic Song Intro Text */}
            <p className="mx-auto text-silk-cream/80 text-base md:text-lg whitespace-pre-line leading-relaxed max-w-xs mb-3">
              I've picked a song that reminds{'\n'}me of us.{'\n'}Just you, me & this song. ❤️
            </p>

            <p className="mx-auto text-xs uppercase tracking-[0.3em] text-silk-cream/75 font-semibold mb-6">
              PLAY THE SONG
            </p>

            {/* YouTube Player Card - Always in DOM so it continues playing audio */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-gold-leaf/40 bg-deep-ebony shadow-romantic ring-1 ring-romantic-red/30 w-full max-w-md mx-auto mb-8">
              <iframe
                ref={ytIframeRef}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                  videoId
                )}?enablejsapi=1&autoplay=0&rel=0&playsinline=1`}
                title="Our song"
                className="w-full h-full border-0 block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Gold Next Button */}
            {step === 'song' && (
              <button
                type="button"
                onClick={handleNextFromSong}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-leaf text-[#031225] hover:bg-gold-leaf/90 px-10 py-4 font-bold text-base shadow-[0_10px_30px_rgba(242,200,108,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </section>
        </div>
      </div>

      {/* 3. Cinematic Intro Video (muted so YouTube song audio plays in background) */}
      {step === 'video' && (
        <IntroVideo
          src="/videos/karwa-intro-v3.mp4"
          onFinish={() => setStep('done')}
        />
      )}

      {/* 4. Full Gift Surprise Experience */}
      {step === 'done' && (
        <>
          {/* Floating YouTube Music Controller Button */}
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="h-auto whitespace-normal fixed top-5 right-5 z-50 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-romantic-red/90 backdrop-blur shadow-romantic hover:scale-105 transition text-silk-cream cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-silk-cream/15 grid place-items-center">
              {isPlaying ? (
                <Volume2 className="w-4 h-4 fill-gold-leaf text-gold-leaf animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 fill-gold-leaf text-gold-leaf" />
              )}
            </span>
            <span className="text-[11px] uppercase tracking-widest font-bold max-w-[140px] truncate hidden sm:inline">
              Our song
            </span>
            <Music className="w-4 h-4 text-gold-leaf sm:hidden" />
          </button>

          {/* Ambient Night Sky with Moon, Stars & Floating Hearts */}
          <NightSky showMoon={true} count={18} />

          {/* Hero Section */}
          <Hero config={config} />

          {/* Interactive Wax-Sealed 3D Royal Love Letter */}
          <LoveLetter
            id="kc-letter"
            message={config.love_letter_message}
            heading={config.love_letter_heading}
          />

          {/* Canvas Scroll Animation 1 ("For the one who makes my world beautiful.") */}
          {scrollFrames.sequence1 && scrollFrames.sequence1.length > 0 && (
            <CanvasScrollSequence
              frames={scrollFrames.sequence1}
              title="For the one who makes my world beautiful."
              hasGoldRing={true}
            />
          )}

          {/* Polaroid Memory Gallery ("The Reason I Smile") */}
          <PolaroidGallery memoryPhotos={config.memoryPhotos} />

          {/* Canvas Scroll Animation 2 ("Hold My Hand. Never Let Go.") */}
          {scrollFrames.sequence2 && scrollFrames.sequence2.length > 0 && (
            <CanvasScrollSequence
              frames={scrollFrames.sequence2}
              title="Hold My Hand. Never Let Go."
              hasGoldRing={false}
            />
          )}

          {/* Sweet Rain Falling Physics Surprise */}
          <SweetSurprise sweetSurprise={config.sweetSurprise} />

          {/* Bollywood Romance Quotes & Video Moments */}
          <BollywoodSection bollywoodMoments={config.bollywoodMoments} />

          {/* Interactive Scratch Card with Confetti Particles */}
          <ScratchCard scratchConfig={config.scratchCard} />

          {/* Grand Ending ("TO MY FOREVER PERSON") */}
          <GrandEnding
            message={config.message}
            senderName={config.sender_name}
          />
        </>
      )}
    </div>
  );
}
