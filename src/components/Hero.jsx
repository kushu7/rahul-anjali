import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { CandleDiya } from './NightSky';

export default function Hero({ config }) {
  const { recipientName, senderName, hero } = config;

  return (
    <section className="kc-theme min-h-screen grid place-items-center px-6 relative overflow-hidden">
      <div className="absolute right-4 bottom-6 pointer-events-none" aria-hidden="true">
        <CandleDiya />
      </div>

      <div className="text-center max-w-2xl kc-animate-fade-up relative z-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold-leaf mb-6">
          {hero?.topTagline || 'READY FOR A LITTLE SURPRISE?'}
        </p>

        {hero?.profilePhoto ? (
          <div className="relative mx-auto mb-8 w-40 h-40 md:w-52 md:h-52">
            <div className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.45),transparent_70%)] blur-md" />
            <div className="absolute inset-0 rounded-full p-[3px] bg-gold-leaf shadow-romantic">
              <div className="w-full h-full rounded-full overflow-hidden bg-deep-ebony">
                <img
                  src={hero.profilePhoto}
                  alt={recipientName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Heart style={{ left: '60%' }} className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 fill-romantic-red text-romantic-red drop-shadow-lg animate-pulse" />
          </div>
        ) : (
          <Heart className="w-12 h-12 mx-auto mb-6 fill-romantic-red text-romantic-red animate-pulse" />
        )}

        <h1 className="font-display text-5xl md:text-7xl italic leading-tight text-balance">
          Hello <span className="text-gold-leaf">{recipientName}</span> ❤
        </h1>

        <p className="mt-6 text-silk-cream/85 text-lg">
          {senderName} {hero?.subtitle || 'made something for you.'}
        </p>

        <button
          type="button"
          aria-label="Scroll down to your letter"
          onClick={() =>
            document.getElementById('kc-letter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className="mx-auto mt-12 flex cursor-pointer flex-col items-center gap-3"
        >
          <p className="font-display italic text-2xl text-silk-cream/90">
            {hero?.scrollPrompt || 'Scroll Down To See ❤️'}
          </p>
          <ChevronDown className="w-7 h-7 text-gold-leaf kc-chevron-bob" />
        </button>
      </div>
    </section>
  );
}
