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
        {/* 첫돌 타이틀 */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center justify-center gap-8">
            <span 
              className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700 drop-shadow-lg animate-fadeInDown"
              style={{ 
                fontFamily: "'Shilla_CultureB-Bold', 'InkLipquid', 'GowunBatang-Regular', serif",
                fontWeight: 700
              }}
            >
              첫
            </span>
            <span 
              className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700 drop-shadow-lg animate-fadeInDown animate-delay-200"
              style={{ 
                fontFamily: "'Shilla_CultureB-Bold', 'InkLipquid', 'GowunBatang-Regular', serif",
                fontWeight: 700
              }}
            >
              돌
            </span>
          </div>
        </div>
        
        <div className="floating-hearts animate-sparkle"></div>
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/20] lg:aspect-[4/5] overflow-hidden hero-image">
          {/* 이미지 컨테이너 - 부드러운 애니메이션 */}
          <div className="relative w-full h-full animate-gentleEntrance">
            <Image src={cover} alt={`${name} 커버`} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
            
            {/* 부드러운 오버레이 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent animate-fadeIn animate-delay-800"></div>
            
            {/* 반짝이는 파티클 효과 */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full animate-sparkleIn animate-delay-1000"></div>
            <div className="absolute top-20 right-16 w-2 h-2 bg-pink-400 rounded-full animate-sparkleIn animate-delay-1200"></div>
            <div className="absolute bottom-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-sparkleIn animate-delay-1400"></div>
            <div className="absolute bottom-32 right-12 w-2 h-2 bg-blue-400 rounded-full animate-sparkleIn animate-delay-1600"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-sparkleIn animate-delay-1800"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-sparkleIn animate-delay-2000"></div>
            
            {/* 부모님 이름 */}
            <div className="absolute bottom-4 left-4 animate-fadeInUp animate-delay-2200">
              <p className="text-sm font-medium text-white drop-shadow-lg">
                아빠 최진형
              </p>
            </div>
            <div className="absolute bottom-4 right-4 animate-fadeInUp animate-delay-2400">
              <p className="text-sm font-medium text-white drop-shadow-lg">
                엄마 조은정
              </p>
            </div>
          </div>
          
          {/* Venue Copy Button */}
          <div className="absolute bottom-16 right-3 z-10">
            <button
              onClick={copyVenue}
              className="group relative bg-white hover:bg-gray-50 transition-all duration-300 rounded-2xl px-4 py-2 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200 hover:border-gray-300"
              aria-label="돌잔치 장소 복사"
            >
              {/* 호버 시 나타나는 라벨 */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-700 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg">
                클릭하여 주소 복사하기
                {/* 말풍선 화살표 */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-gray-700 border-y-4 border-y-transparent"></div>
              </div>
              
              <div className="flex items-center space-x-1.5">
                {/* 위치 아이콘 */}
                <svg 
                  className="w-4 h-4 text-pink-300 group-hover:text-pink-600 transition-colors" 
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
                <span className="text-sm font-semibold text-gray-400 group-hover:text-gray-500 transition-colors">
                  복사
                </span>
                {/* 복사 아이콘 */}
               
              </div>
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
                  2025년 9월 28일 일요일 오후 12:00                </div>
                <div className="text-xs sm:text-sm">
                  전문건설회관 30층 차이30
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-4 sm:space-y-6 text-center">
          <div className="space-y-2 sm:space-y-3 animate-fadeInUp animate-delay-500">
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