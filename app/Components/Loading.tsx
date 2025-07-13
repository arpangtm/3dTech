"use client";

import React from "react";

export default function Loading() {
  return (
    <div className=" flex flex-col items-center justify-center z-50 bg-gradient-to-b from-gray-50/95 via-gray-100/95 to-white/95 backdrop-blur-lg pt-32">
      <div className="relative">
        {/* Animated loader container */}
        <div className="w-32 h-32 relative">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin-slow"></div>

          {/* Middle circle */}
          <div className="absolute inset-3 border-4 border-gray-400 rounded-full animate-spin-reverse"></div>

          {/* Inner circle */}
          <div className="absolute inset-6 border-4 border-gray-600 rounded-full animate-pulse"></div>

          {/* Center dot */}
          <div className="absolute inset-[42%] bg-gray-800 rounded-full animate-ping"></div>
        </div>

        {/* Loading text with animation */}
        <div className="mt-8 text-center">
          <div className="text-gray-800 text-xl font-bold tracking-widest animate-pulse">
            LOADING
          </div>
          <div className="mt-2 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
