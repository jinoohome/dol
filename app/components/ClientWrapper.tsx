"use client";

import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 최소 로딩 시간 보장 (UX 향상)
    const minLoadTime = 5000; // 5초로 연장
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsReady(true), 500); // 전환 시간도 조금 연장
      }, remainingTime);
    };

    // DOM이 완전히 로드되었는지 확인
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div 
        className={`transition-opacity duration-500 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          visibility: isReady ? 'visible' : 'hidden',
          position: isReady ? 'static' : 'absolute'
        }}
      >
        {children}
      </div>
    </>
  );
} 