"use client";

import Image from "next/image";
import { useState } from "react";

export default function Video({ url, thumbnail }: { url: string; thumbnail: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="section container">
      <div className="relative w-full max-w-[680px] aspect-video overflow-hidden rounded-2xl card shadow-soft mx-auto">
        {!playing ? (
          <button
            aria-label="영상 재생"
            className="absolute inset-0 grid place-items-center"
            onClick={() => setPlaying(true)}
          >
            <Image src={thumbnail} alt="영상 썸네일" fill sizes="(max-width: 680px) 100vw, 680px" style={{ objectFit: "cover" }} />
            <span className="relative z-10 btn btn-primary rounded-full px-5 py-2">재생</span>
          </button>
        ) : (
          <video controls className="absolute inset-0 w-full h-full" poster={thumbnail}>
            <source src={url} />
          </video>
        )}
      </div>
    </section>
  );
} 