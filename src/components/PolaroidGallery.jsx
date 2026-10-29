import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PolaroidGallery({ memoryPhotos = [] }) {
  if (!memoryPhotos || memoryPhotos.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Sparkles className="w-7 h-7 mx-auto mb-4 text-gold-leaf" />
          <h2 className="font-display text-3xl md:text-5xl italic text-silk-cream">
            The Reason I Smile
          </h2>
        </div>
        <div className="space-y-10 md:space-y-16">
          {memoryPhotos.map((item, idx) => (
            <div key={idx}>
              <figure
                className={`relative ${
                  idx % 2 === 0
                    ? 'md:ml-0 md:mr-auto md:rotate-[-1deg]'
                    : 'md:ml-auto md:mr-0 md:rotate-[1deg]'
                } max-w-md mx-auto`}
              >
                <div className="bg-silk-cream p-3 pb-10 shadow-2xl rounded-sm">
                  <img
                    src={item.image_url}
                    alt={`memory ${idx + 1}`}
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                  <figcaption className="font-display italic text-deep-ebony text-center mt-4 text-xl font-medium">
                    #{String(idx + 1).padStart(2, '0')}
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
