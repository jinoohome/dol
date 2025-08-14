"use client";

import React, { useState, useEffect } from 'react';

interface CalendarProps {
  eventDate: string;
  eventTime: string;
  venue: string;
}

export default function Calendar({ eventDate }: CalendarProps) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateDaysLeft = () => {
      // 한국 시간대로 오늘 날짜 계산
      const today = new Date();
      const koreaToday = new Date(today.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
      const todayString = koreaToday.toISOString().split('T')[0];
      
      // 이벤트 날짜 (2025-09-28)
      const eventDateString = eventDate;
      
      // 날짜만 비교 (시간 제외)
      const todayDate = new Date(todayString);
      const targetDate = new Date(eventDateString);
      
      // 밀리초 차이를 일수로 변환
      const timeDiff = targetDate.getTime() - todayDate.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      setDaysLeft(days);
    };

    calculateDaysLeft();
  }, [eventDate]);

  const getDayText = () => {
    if (daysLeft === null) return '계산 중...';
    if (daysLeft > 0) return `${daysLeft}일`;
    if (daysLeft === 0) return '오늘';
    return '지났습니다';
  };

  const date = new Date(eventDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const eventDay = date.getDate();

  
  // 해당 월의 첫 번째 날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay(); // 0 = 일요일
  const daysInMonth = lastDay.getDate();
  
  // 달력 그리드를 위한 빈 셀들
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const monthName = date.toLocaleDateString('ko-KR', { month: 'long' });
  
  return (
    <div className="bg-white rounded-2xl animate-fadeInUp animate-delay-300 w-80">
      {/* 달력 헤더 */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {year}년 {monthName}
        </h3>
        <p className="text-xs text-gray-600">우진이의 특별한 날</p>
      </div>
      
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-1 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* 빈 셀들 */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}
        
        {/* 날짜들 */}
        {days.map((day) => {
          const isEventDay = day === eventDay;
          const dayOfWeek = (firstDayOfWeek + day - 1) % 7;
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center text-sm relative ${
                isEventDay
                  ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold rounded-full transform scale-110 animate-pulse'
                  : isWeekend
                  ? 'text-gray-400'
                  : 'text-gray-700 hover:bg-gray-50'
              } transition-all duration-200`}
            >
              {day}
              {isEventDay && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* 이벤트 정보 */}
      <div>
        {/* 움직이는 D-Day 텍스트 */}
        <div className="relative overflow-hidden bg-gradient-to-r from-pink-400 to-purple-500 rounded-full py-2 px-4 w-full">
          <div className="animate-marquee whitespace-nowrap text-center">
            <span className="text-white text-base sm:text-lg" style={{ fontFamily: "Paperlogy-6SemiBold, sans-serif" }}>
              🎉 우진이의 생일파티가 {isClient ? getDayText() : '계산 중...'} 남았습니다! 🎂
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
