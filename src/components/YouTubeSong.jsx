import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';

export default function YouTubeSong({ youtubeUrl = 'https://youtu.be/0wlulIyVh0g' }) {
  // Extract 11-char YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return null;
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
      return null;
    } catch {
      return null;
    }
  };

  const videoId = getYouTubeId(youtubeUrl) || '0wlulIyVh0g';

  return (
    <section aria-label="Our song" className="relative px-6 py-16 md:py-24 z-10">
      <div className="mx-auto max-w-3xl text-center">
        <Heart className="mx-auto mb-5 h-7 w-7 text-gold-leaf fill-gold-leaf animate-pulse" />
        <h2 className="font-display text-3xl md:text-5xl italic text-silk-cream">
          This Song Reminds Me of Us ❤️
        </h2>
        <p className="mx-auto mt-3 text-xs uppercase tracking-[0.3em] text-silk-cream/75 font-semibold">
          PLAY THE SONG
        </p>

        {/* Video Player Card */}
        <div className="relative mt-8 aspect-video overflow-hidden rounded-lg border border-gold-leaf/40 bg-deep-ebony shadow-romantic ring-1 ring-romantic-red/30">
          <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(
              videoId
            )}?autoplay=0&controls=1&playsinline=1&rel=0`}
            title="Our Song"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Scroll Down Prompt */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="font-display italic text-2xl text-silk-cream/90">
            Scroll Down
          </p>
          <ChevronDown className="w-7 h-7 text-gold-leaf kc-chevron-bob" />
        </div>
      </div>
    </section>
  );
}

