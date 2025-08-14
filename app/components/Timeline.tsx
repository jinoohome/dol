"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  image?: string;
  milestone: string;
}

const timelineData: TimelineItem[] = [
  {
    date: "2024.10.08",
    title: "세상에 나온 날",
    description: "우진이가 우리 곁에 왔어요",
    milestone: "👶",
    image: "/images/woojin/woojin-06.jpg"
  },
  {
    date: "2024.11.26",
    title: "50일 후",
    description: "건강하게 50일을 맞이했어요",
    milestone: "😊",
    image: "/images/woojin/woojin-07.jpg"
  },
  {
    date: "2025.01.15",
    title: "100일 후",
    description: "건강하게 100일을 맞이했어요",
    milestone: "🍼",
    image: "/images/woojin/woojin-08.jpg"
  },
  {
    date: "2025.04.25",
    title: "200일 후",
    description: "쑥쑥 자라서 200일을 맞이했어요",
    milestone: "🚼",
    image: "/images/woojin/woojin-09.jpg"
  },
  {
    date: "2025.08.03",
    title: "300일 후",
    description: "건강하게 자라서 300일을 맞이했어요",
    milestone: "🎈",
    image: "/images/woojin/woojin-10.jpg"
  },
];

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(timelineData.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        },
        {
          threshold: 0.3, // 30%가 보이면 애니메이션 시작
          rootMargin: '-50px 0px' // 50px 여유를 두고 트리거
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div className="relative w-full max-w-none mx-auto px-1 sm:px-2 lg:px-3">
      {/* 타임라인 중앙선 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand via-point to-sub"></div>
      
      <div className="space-y-16 sm:space-y-20 lg:space-y-24">
        {timelineData.map((item, index) => (
          <div 
            key={index}
            ref={el => { itemRefs.current[index] = el; }}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            } transition-all duration-700 ease-out ${
              visibleItems[index] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* 사진과 날짜 */}
            <div className={`w-6/12 sm:w-5/12 ${index % 2 === 0 ? 'pr-3 sm:pr-8 lg:pr-12' : 'pl-3 sm:pl-8 lg:pl-12'}`}>
              <div className="space-y-3 sm:space-y-4">
                {/* 사진 */}
                <div className={`relative w-full max-w-xs sm:max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-700 delay-200 ${
                  visibleItems[index] ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}>
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={`우진이 - ${item.title}`}
                      fill
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, 450px"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center space-y-2">
                        <div className="text-4xl opacity-40">{item.milestone}</div>
                        <p className="text-sm text-gray-400">사진 준비 중</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 날짜 */}
                <div className={`${index % 2 === 0 ? 'text-center sm:text-left' : 'text-center sm:text-right'} transition-all duration-700 delay-300 ${
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-500" style={{ fontFamily: "InkLipquid, serif" }}>
                    {item.date}
                  </p>
                </div>
              </div>
            </div>

            {/* 중앙 원형 포인트 */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-brand rounded-full border-4 sm:border-5 border-white shadow-lg z-10 transition-all duration-500 delay-100 ${
              visibleItems[index] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}></div>

            {/* 제목과 설명 */}
            <div className={`w-6/12 sm:w-7/12 ${index % 2 === 0 ? 'pl-6 sm:pl-12 lg:pl-16' : 'pr-6 sm:pr-12 lg:pr-16'}`}>
              <div className="text-center space-y-4 sm:space-y-5 flex flex-col justify-center h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-2">
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-tight whitespace-nowrap transition-all duration-700 delay-400 ${
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ fontFamily: "Paperlogy-6SemiBold, sans-serif" }}>
                  {item.title}
                </h3>
                <p className={`text-base sm:text-lg lg:text-xl text-muted leading-relaxed korean-text transition-all duration-700 delay-500 ${
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 타임라인 끝 장식 */}
      <div className="flex justify-center mt-16 sm:mt-20 lg:mt-24">
        <div className="bg-gradient-to-r from-brand via-point to-sub p-4 sm:p-5 rounded-full shadow-lg animate-float">
          <div className="text-2xl sm:text-3xl">🎉</div>
        </div>
      </div>
    </div>
  );
} 