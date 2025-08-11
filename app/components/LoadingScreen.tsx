"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center space-y-6">
        {/* 로딩 스피너 */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-brand/20 border-t-brand rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-point rounded-full animate-spin mx-auto animate-reverse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        {/* 로딩 텍스트 */}
        <div className="space-y-2">
          <h2 
            className="text-2xl font-bold gradient-text animate-pulse" 
            style={{ fontFamily: "InkLipquid, serif" }}
          >
            우진이의 첫돌잔치
          </h2>
          <p className="text-sm text-muted animate-bounce">초대장을 준비하고 있어요...</p>
        </div>

        {/* 하트 애니메이션 */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-point rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-sub rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 text-brand/20 animate-pulse">♡</div>
        <div className="absolute top-20 right-16 w-4 h-4 text-point/20 animate-pulse animate-delay-500">♡</div>
        <div className="absolute bottom-20 left-20 w-4 h-4 text-sub/20 animate-pulse animate-delay-1000">♡</div>
        <div className="absolute bottom-10 right-10 w-4 h-4 text-brand/20 animate-pulse animate-delay-300">♡</div>
      </div>
    </div>
  );
}
