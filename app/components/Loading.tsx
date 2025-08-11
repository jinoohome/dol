"use client";

import { useEffect, useState } from "react";

const loadingMessages = [
  "특별한 순간을 준비하고 있어요",
  "우진이의 첫 돌잔치 초대장을 만들고 있어요",
  "사랑스러운 추억들을 모으고 있어요",
  "축복의 순간을 기다려주세요",
  "거의 완성되었어요! 조금만 더..."
];

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 250);

    // 메시지 변경
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-pink-50 to-blue-50 loading-overlay">
      <div className="text-center space-y-8 animate-fadeInUp">
        {/* 메인 로고/타이틀 */}
        <div className="space-y-4">
          <div className="relative">
            <h1 
              className="text-4xl md:text-5xl font-bold gradient-text animate-heartBeat"
              style={{ fontFamily: "InkLipquid, serif" }}
            >
              우진이의
            </h1>
            <h2 
              className="text-2xl md:text-3xl text-muted animate-pulse animate-delay-200"
              style={{ fontFamily: "InkLipquid, serif" }}
            >
              1st Birthday Party
            </h2>
          </div>
        </div>

        {/* 로딩 스피너 */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-brand/20 rounded-full animate-spin loading-ring"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-brand rounded-full animate-spin loading-ring-active"></div>
            <div className="absolute inset-3 w-14 h-14 bg-gradient-to-r from-brand to-point rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-80 mx-auto space-y-3">
          <div className="flex justify-between text-sm text-muted">
            <span className="font-medium">준비 중...</span>
            <span className="font-bold text-brand">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-200/80 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-brand via-point to-sub rounded-full transition-all duration-500 ease-out loading-progress relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* 로딩 메시지 */}
        <div className="space-y-4 animate-fadeInUp animate-delay-500 min-h-[60px]">
          <p 
            key={messageIndex}
            className="text-muted animate-fadeInUp text-lg font-medium"
          >
            {loadingMessages[messageIndex]}
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-brand rounded-full animate-bounce loading-dot"></div>
            <div className="w-3 h-3 bg-point rounded-full animate-bounce loading-dot animate-delay-200"></div>
            <div className="w-3 h-3 bg-sub rounded-full animate-bounce loading-dot animate-delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 