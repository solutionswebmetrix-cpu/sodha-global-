import { useState } from 'react';

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : [];

  if (displayImages.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-ivory-200 to-earth-200" />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-ivory-50">
        <img
          src={displayImages[activeIndex]}
          alt={`Premium ${name}`}
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
                activeIndex === idx
                  ? 'ring-2 ring-copper-500 ring-offset-2 ring-offset-ivory-50'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                className="h-full w-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
