"use client";

import React, { useState, useEffect } from 'react';

export default function TimeCounter() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const calculateTime = () => {
      const startDate = new Date('2024-10-08T00:00:00');
      const now = new Date();
      
      const diffInMs = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
      
      // 년, 월 계산
      let years = 0;
      let months = 0;
      let remainingDays = days;
      
      // 대략적인 년/월 계산
      if (remainingDays >= 365) {
        years = Math.floor(remainingDays / 365);
        remainingDays = remainingDays % 365;
      }
      
      if (remainingDays >= 30) {
        months = Math.floor(remainingDays / 30);
        remainingDays = remainingDays % 30;
      }
      
      let result = '';
      if (years > 0) result += `${years}년 `;
      if (months > 0) result += `${months}개월 `;
      if (remainingDays > 0) result += `${remainingDays}일 `;
      result += `${hours}시간 ${minutes}분 ${seconds}초`;
      
      setTimeString(result);
    };

    // 초기 계산
    calculateTime();
    
    // 1초마다 업데이트
    const interval = setInterval(calculateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700">
      "{timeString}"
    </p>
  );
} 