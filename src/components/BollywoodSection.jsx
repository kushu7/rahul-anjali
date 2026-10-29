import React from 'react';
import { Sparkles } from 'lucide-react';

const DEFAULT_VIDEOS = [
  { url: '/videos/oso.mp4' },
  { url: '/videos/aashiqui.mp4' },
  { url: '/videos/kabir.mp4' },
  { url: '/videos/srk.mp4' },
  { url: '/videos/veer.mp4' },
];

export default function BollywoodSection({ bollywoodMoments = {} }) {
  const videos = bollywoodMoments.videos || DEFAULT_VIDEOS;
  const quote =
    bollywoodMoments.quote ||
    `Kehte hain...\n"Kisi cheez ko shiddat se chaho,\ntoh poori kaynaat use tumse milane ki koshish mein lag jaati hai." `;

  return (
    <section className="py-20 md:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Sparkles className="w-7 h-7 mx-auto mb-4 text-gold-leaf" />
          <h2 className="font-display text-3xl md:text-5xl italic text-balance whitespace-pre-line text-silk-cream">
            {quote}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:gap-6 max-w-md mx-auto">
          {videos.map((item, idx) => (
            <div key={idx}>
              {idx === 1 && (
                <div className="text-center mb-5">
                  <p className="font-display italic text-3xl md:text-5xl text-silk-cream whitespace-pre-line">
                    Aur jab woh mil jaaye...{'\n'}toh har ek pal khoobsurat ban jaata hai.
                  </p>
                </div>
              )}
              {idx === 2 && (
                <div className="text-center mb-5">
                  <p className="font-display italic text-3xl md:text-5xl text-silk-cream whitespace-pre-line">
                    Just like when I found you.
                  </p>
                </div>
              )}
              {idx === 3 && (
                <div className="text-center mb-5">
                  <p className="font-display italic text-3xl md:text-5xl text-silk-cream whitespace-pre-line">
                    In a world full of noise... you are my sukoon.
                  </p>
                </div>
              )}
              {idx === 4 && (
                <div className="text-center mb-5">
                  <p className="font-display italic text-3xl md:text-5xl text-silk-cream whitespace-pre-line">
                    You are the home my heart was always searching for.❤️
                  </p>
                </div>
              )}

              <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-[250ms] ease-out hover:scale-[1.02] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controlsList="nodownload"
                  disablePictureInPicture
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
