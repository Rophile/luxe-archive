import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5DC]">
      {/* Spinner Animasi */}
      <div className="w-12 h-12 border-4 border-[#A569BD] border-t-transparent rounded-full animate-spin mb-4"></div>
      
      {/* Teks Animasi */}
      <p className="text-[#4A3B4F] font-serif italic animate-pulse">
        Fetching Luxury Item...
      </p>
    </div>
  );
}