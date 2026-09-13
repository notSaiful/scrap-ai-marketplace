import React from 'react';

export const TrustStrip: React.FC = () => {
  const items = [
    'AI-Graded Quality',
    'Delivery Guaranteed',
    'No Site Visits Needed',
  ];

  // Repeat sequence so track is dense and seamless
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-white py-3 sm:py-3.5 overflow-hidden relative shadow-[0_4px_20px_rgba(14,165,233,0.25)] border-y border-white/20 select-none z-20">
      {/* Edge gradient masks for smooth fade in/out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0284c7] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0284c7] to-transparent z-10" />

      {/* Infinite Scrolling Track */}
      <div className="animate-marquee flex items-center space-x-8 sm:space-x-12">
        {/* Track 1 */}
        <div className="flex items-center space-x-8 sm:space-x-12 shrink-0">
          {repeatedItems.map((item, index) => (
            <div key={`track1-${index}`} className="flex items-center space-x-8 sm:space-x-12 shrink-0">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wide uppercase">
                <span className="w-5 h-5 rounded-full bg-white text-[#0284c7] flex items-center justify-center text-xs font-black shadow-xs">
                  ✓
                </span>
                <span className="text-white drop-shadow-xs">{item}</span>
              </div>
              <span className="text-white/40 font-black text-lg select-none">·</span>
            </div>
          ))}
        </div>

        {/* Track 2 (exact clone for gapless loop) */}
        <div className="flex items-center space-x-8 sm:space-x-12 shrink-0" aria-hidden="true">
          {repeatedItems.map((item, index) => (
            <div key={`track2-${index}`} className="flex items-center space-x-8 sm:space-x-12 shrink-0">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wide uppercase">
                <span className="w-5 h-5 rounded-full bg-white text-[#0284c7] flex items-center justify-center text-xs font-black shadow-xs">
                  ✓
                </span>
                <span className="text-white drop-shadow-xs">{item}</span>
              </div>
              <span className="text-white/40 font-black text-lg select-none">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
