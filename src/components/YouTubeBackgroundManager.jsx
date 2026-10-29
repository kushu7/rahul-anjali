import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function YouTubeBackgroundManager({
  youtubeUrl = 'https://youtu.be/0wlulIyVh0g',
  step,
  onPlayerReady
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract 11-char YouTube ID
  const getYouTubeId = (url) => {
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
  };

  const videoId = getYouTubeId(youtubeUrl);

  // Load YouTube Iframe API once
  useEffect(() => {
    let checkInterval = null;

    function initPlayer() {
      if (!window.YT || !window.YT.Player || !containerRef.current) return;

      if (playerRef.current) return;

      const player = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            setIsLoaded(true);
            onPlayerReady?.({
              play: () => player.playVideo(),
              pause: () => player.pauseVideo(),
              toggle: () => {
                const state = player.getPlayerState();
                if (state === 1) {
                  player.pauseVideo();
                } else {
                  player.playVideo();
                }
              },
            });
          },
          onStateChange: (event) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2 || event.data === 0) setIsPlaying(false);
          },
        },
      });

      playerRef.current = player;
    }

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => initPlayer();
    } else {
      initPlayer();
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [videoId, onPlayerReady]);

  const toggleMusic = useCallback(() => {
    const player = playerRef.current;
    if (!player || !player.getPlayerState) return;
    const state = player.getPlayerState();
    if (state === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, []);

  // Is visible on screen 1 ("song"), or hidden offscreen to continue playing background audio
  const isOffscreen = step !== 'song';

  return (
    <>
      {/* YouTube Player Box: Centered during Step 'song', moved offscreen during Step 'done' & 'video' */}
      <div
        className={
          isOffscreen
            ? 'fixed -left-[10000px] top-0 w-96 pointer-events-none'
            : 'relative aspect-video overflow-hidden rounded-2xl border border-gold-leaf/40 bg-deep-ebony shadow-romantic ring-1 ring-romantic-red/30 max-w-md mx-auto mb-10'
        }
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* Floating Button on the Gift Page (Step: 'done') */}
      {step === 'done' && (
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="h-auto whitespace-normal fixed top-5 right-5 z-50 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-romantic-red/90 backdrop-blur shadow-romantic hover:scale-105 transition text-silk-cream cursor-pointer"
        >
          <span className="w-8 h-8 rounded-full bg-silk-cream/15 grid place-items-center">
            {isPlaying ? (
              <Volume2 className="w-4 h-4 fill-gold-leaf text-gold-leaf" />
            ) : (
              <VolumeX className="w-4 h-4 fill-gold-leaf text-gold-leaf" />
            )}
          </span>
          <span className="text-[11px] uppercase tracking-widest font-bold max-w-[140px] truncate hidden sm:inline">
            Our song
          </span>
          <Music className="w-4 h-4 text-gold-leaf sm:hidden" />
        </button>
      )}
    </>
  );
}

