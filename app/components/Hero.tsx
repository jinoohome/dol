import Image from "next/image";
import Countdown from "@/app/components/Countdown";

export default function Hero({
  name,
  cover,
  eventDate,
  showDday,
}: {
  name: string;
  cover: string;
  eventDate: string;
  showDday?: boolean;
}) {
  return (
    <section className="relative">
      <div className="floating-hearts animate-sparkle"></div>
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/20] lg:aspect-[4/5] overflow-hidden hero-image animate-scaleIn">
        <Image src={cover} alt={`${name} 커버`} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-20 md:pb-28 pointer-events-none">
          <div className="text-center space-y-0 animate-fadeInUp animate-delay-1000">
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