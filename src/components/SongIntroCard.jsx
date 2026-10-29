import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function SongIntroCard({ children, onNext }) {
  return (
    <div className="kc-theme kc-night-gift fixed inset-0 z-[90] overflow-y-auto bg-background text-silk-cream flex flex-col justify-center items-center py-10 px-4">
      {/* Background ambient night sky & moon */}
      <div className="kc-sky-fixed pointer-events-none" aria-hidden="true">
        <img
          src="/assets/moonlit-sky-nomoon-D3MNJr_9.jpg"
          width={1440}
          height={1200}
          alt=""
          className="kc-sky-fixed-img"
        />
        <div className="kc-sky-fixed-veil" />
        <img
          src="/assets/moon-BlawUC1r.png"
          width={816}
          height={816}
          alt=""
          className="kc-moon kc-moon-fixed"
        />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Golden Heart Outline */}
        <Heart className="mx-auto mb-4 h-8 w-8 text-gold-leaf fill-gold-leaf animate-pulse" />

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl italic text-silk-cream mb-4">
          Before We Begin… ❤️
        </h2>

        {/* Subtext */}
        <p className="mx-auto text-silk-cream/80 text-base sm:text-lg whitespace-pre-line leading-relaxed max-w-xs mb-3">
          I've picked a song that reminds{'\n'}me of us.{'\n'}Just you, me & this song. ❤️
        </p>

        <p className="mx-auto text-xs uppercase tracking-[0.3em] text-silk-cream/75 font-semibold mb-6">
          PLAY THE SONG
        </p>

        {/* The YouTube Video Embed Container is rendered here */}
        <div className="w-full flex justify-center mb-8">
          {children}
        </div>

        {/* Gold Pill Button */}
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-leaf text-[#031225] hover:bg-gold-leaf/90 px-10 py-4 font-bold text-base shadow-[0_10px_30px_rgba(242,200,108,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Next</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

