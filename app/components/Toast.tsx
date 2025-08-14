"use client";

import { useEffect } from "react";

export default function Toast({ 
  message, 
  show, 
  onHide 
}: { 
  message: string;
  show: boolean;
  onHide: () => void;
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideInDown">
      <div className="bg-white/95 backdrop-blur-sm border border-brand/20 rounded-2xl px-6 py-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-brand to-point rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 