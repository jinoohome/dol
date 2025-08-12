import Image from "next/image";
import Countdown from "@/app/components/Countdown";

export default function Hero({
  name,
  cover,
  eventDate,
  eventTime,
  venue,
  showDday,
}: {
  name: string;
  cover: string;
  eventDate: string;
  eventTime?: string;
  venue?: string;
  showDday?: boolean;
}) {
  return (
    <section className="relative">
      <div className="floating-hearts animate-sparkle"></div>
      <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/20] lg:aspect-[4/5] overflow-hidden hero-image animate-scaleIn">
        <Image src={cover} alt={`${name} 커버`} fill priority sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 672px, 672px" style={{ objectFit: "cover" }} />
        
        {/* Date Badge - Top Right */}
        {eventDate && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 animate-bounceIn animate-delay-500">
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-full w-16 h-16 sm:w-18 sm:h-18 flex flex-col items-center justify-center text-sm font-bold shadow-lg border border-white/50">
              <div className="text-xs text-gray-600">{new Date(eventDate).getMonth() + 1}</div>
              <div className="text-lg leading-none">{new Date(eventDate).getDate()}</div>
            </div>
          </div>
        )}
        
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
            {(eventDate || eventTime || venue) && (
              <div className="mt-4 space-y-1 text-black/80 animate-fadeInUp animate-delay-1200">
                {eventDate && (
                  <div className="text-sm sm:text-base font-medium">
                    {new Date(eventDate).toLocaleDateString('ko-KR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      weekday: 'short'
                    })} {eventTime}
                  </div>
                )}
                {venue && (
                  <div className="text-xs sm:text-sm">
                    {venue}
                  </div>
                )}
              </div>
            )}
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
        {showDday ? (
          <div className="mt-6 flex justify-center animate-slideInUp animate-delay-700">
            <div className="card px-6 py-4 shadow-soft hover-lift animate-float">
              <Countdown date={eventDate} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
} 