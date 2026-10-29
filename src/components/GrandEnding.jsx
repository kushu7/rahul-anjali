import React from 'react';
import { Heart } from 'lucide-react';

export default function GrandEnding({ message, senderName }) {
  return (
    <>
      {message && (
        <section className="py-20 md:py-32 px-6 relative">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-leaf mb-6">
              TO MY FOREVER PERSON
            </p>
            <blockquote className="font-display italic text-2xl md:text-4xl leading-snug text-silk-cream text-balance whitespace-pre-line">
              "{message}"
            </blockquote>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 px-6 text-center relative">
        <div className="max-w-xl mx-auto">
          <Heart className="w-16 h-16 mx-auto mb-6 fill-romantic-red text-romantic-red animate-pulse" />
          <h2 className="font-display text-4xl md:text-6xl italic mb-4 text-silk-cream">
            Made with love by
          </h2>
          <p className="font-display text-5xl md:text-7xl text-gold-leaf italic">
            {senderName}
          </p>
        </div>
      </section>
    </>
  );
}
