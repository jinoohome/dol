"use client";

import Image from "next/image";
import Countdown from "@/app/components/Countdown";
import Toast from "@/app/components/Toast";
import { useState } from "react";

export default function Hero({
  name,
  cover,
  eventDate,
  showDday,
  venue,
}: {
  name: string;
  cover: string;
  eventDate: string;
  showDday?: boolean;
  venue?: string;
}) {
  const [showToast, setShowToast] = useState(false);
  const [showVenueToast, setShowVenueToast] = useState(false);

  async function copyVenue() {
    const venueAddress = venue || "서울 동작구 보라매로5길 15 전문건설회관 30층";
    try {
      await navigator.clipboard.writeText(venueAddress);
      setShowVenueToast(true);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = venueAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowVenueToast(true);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowToast(true);
    }
  }

  return (
    <>
      <Toast 
        message="초대장 링크가 복사되었습니다! 🎉" 
        show={showToast} 
        onHide={() => setShowToast(false)} 
      />
      <Toast 
        message="돌잔치 장소가 복사되었습니다! 📍" 
        show={showVenueToast} 
        onHide={() => setShowVenueToast(false)} 
      />
      
      <section className="relative">
        <div className="floating-hearts animate-sparkle"></div>
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/20] lg:aspect-[4/5] overflow-hidden hero-image animate-scaleIn">
          <Image src={cover} alt={`${name} 커버`} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          
          {/* Venue Copy Button */}
          <div className="absolute top-4 right-4 z-10 flex flex-col items-end space-y-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-md animate-fadeInDown animate-delay-300">
              <p className="text-xs text-gray-700 font-medium">장소 복사</p>
            </div>
            <button
              onClick={copyVenue}
              className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 group"
              aria-label="돌잔치 장소 복사"
            >
              <svg 
                className="w-5 h-5 text-brand group-hover:text-point transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </button>
          </div>
          
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-20 md:pb-28 pointer-events-none">
            <div className="text-center space-y-2 animate-fadeInUp animate-delay-1000">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl text-black animate-bounce" 
                style={{ 
                  fontFamily: "InkLipquid, serif"
                }}
              >
                {name}이의
              </h2>
              <h1 
                className="text-xl sm:text-2xl md:text-3xl text-black animate-pulse animate-delay-200" 
                style={{ 
                  fontFamily: "InkLipquid, serif"
                }}
              >
                1st Birthday Party
              </h1>
              
              {/* Event Info */}
              <div className="mt-4 space-y-1 text-black/80 animate-fadeInUp animate-delay-1200">
                <div className="text-sm sm:text-base font-medium">
                  {new Date(eventDate).toLocaleDateString('ko-KR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'short'
                  })} 12:00
                </div>
                <div className="text-xs sm:text-sm">
                  전문건설회관 30층 차이30
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-8 space-y-4 text-center">
          <div className="space-y-2 animate-fadeInUp animate-delay-500">
            <p className="text-sm text-muted font-medium tracking-wide animate-shimmer">첫돌에 초대합니다</p>
            <h1 className="text-4xl font-bold gradient-text animate-heartBeat" style={{ fontFamily: "InkLipquid, serif" }}>
              {name}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-brand via-point to-sub rounded-full mx-auto animate-pulse"></div>
          </div>
          
          {/* Hero 섹션 하단에 공유 버튼 추가 */}
          <div className="animate-fadeInUp animate-delay-700">
            <button
              onClick={copyLink}
              className="btn btn-primary hover-lift animate-pulse animate-delay-300 px-8 py-3 text-base font-semibold"
            >
              📤 초대장 공유하기
            </button>
          </div>
          
          {showDday ? (
            <div className="mt-6 flex justify-center animate-slideInUp animate-delay-700">
              <div className="card px-6 py-4 shadow-soft hover-lift animate-float">
                <Countdown date={eventDate} />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
} 