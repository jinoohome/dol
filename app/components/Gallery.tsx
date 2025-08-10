"use client";

import Image from "next/image";

export default function Gallery({ images }: { images: string[] }) {
  if (!images?.length) return null;
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 snap-x snap-mandatory px-4">
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="relative shrink-0 w-[280px] h-[360px] snap-start overflow-hidden rounded-2xl card shadow-soft transition-transform duration-300 hover:scale-105"
          >
            <Image 
              src={src} 
              alt={`갤러리 ${idx + 1}`} 
              fill 
              sizes="280px" 
              style={{ objectFit: "cover" }} 
              className="transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 