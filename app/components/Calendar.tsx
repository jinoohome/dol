import React from 'react';

interface CalendarProps {
  eventDate: string;
  eventTime: string;
  venue: string;
}

export default function Calendar({ eventDate, eventTime, venue }: CalendarProps) {
  const date = new Date(eventDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const eventDay = date.getDate();
  const eventDayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  
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
    <div className="bg-white rounded-2xl p-6 animate-fadeInUp animate-delay-300">
      {/* 달력 헤더 */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {year}년 {monthName}
        </h3>
        <p className="text-sm text-gray-600">우진이의 특별한 날</p>
      </div>
      
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-2 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-1 mb-6">
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
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            {eventDay}일 {eventDayOfWeek}요일
          </div>
        </div>
        
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center text-gray-700">
            <span className="text-lg mr-2">🕐</span>
            <span className="font-medium">{eventTime}</span>
          </div>
          <div className="flex items-center justify-center text-gray-700">
            <span className="text-lg mr-2">📍</span>
            <span className="font-medium text-sm">{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
