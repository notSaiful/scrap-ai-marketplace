import React, { useState } from 'react';
import { Search, Camera, X, ImageIcon, ChevronDown } from 'lucide-react';

interface AISearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectPrompt?: (prompt: string) => void;
  onImageSearchTrigger: (scrapType: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onImageSearchTrigger,
  onSearchSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full h-screen min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Hero Video (Looping, Autoplay, Muted, PlaysInline) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-scrap.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      >
        <source src="/trash.mp4" type="video/mp4" />
        {/* Fallback image */}
        <img
          src="/hero-scrap.jpg"
          alt="Industrial Scrap Yard"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />
      </video>

      {/* Overlaid Hero Content (Headline + Search Bar) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3 sm:mb-4">
          Bulk Scrap, Graded and Guaranteed.
        </h1>
        <p className="text-base sm:text-lg text-white/80 font-normal mb-6 sm:mb-8 max-w-xl mx-auto drop-shadow-sm">
          AI-verified quality. One fair price. Delivered on time — every time.
        </p>

        <div 
          className={`relative bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-full border transition-all duration-300 max-w-3xl mx-auto text-left ${
            isFocused 
              ? 'border-[#38bdf8] ring-4 ring-[#38bdf8]/20 shadow-[0_28px_60px_-10px_rgba(14,165,233,0.25)]' 
              : 'border-white/90 hover:border-white shadow-[0_24px_50px_-10px_rgba(0,0,0,0.25)]'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center p-1.5 sm:p-2">
            
            {/* Input Element */}
            <div className="flex items-center flex-1 w-full px-4 py-2">
              <Search className="w-5 h-5 text-[#919eab] mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const q = searchQuery.trim() || 'Copper millberry 99.99%';
                    if (!searchQuery.trim()) {
                      setSearchQuery(q);
                    }
                    if (onSearchSubmit) {
                      onSearchSubmit(q);
                    } else {
                      const el = document.getElementById('categories');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                placeholder="Search scrap lot, grade, or price (e.g. 'Copper under $7800', 'HMS steel')..."
                className="w-full text-[#0f1115] placeholder-[#919eab] focus:outline-none text-sm sm:text-base font-medium bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="p-1 text-[#919eab] hover:text-[#0f1115] transition-colors"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Divider and Actions */}
            <div className="flex items-center justify-between w-full sm:w-auto px-2 sm:px-0 space-x-2 border-t sm:border-t-0 border-black/[0.06] pt-2 sm:pt-0">
              
              {/* Image Search Button */}
              <button
                type="button"
                onClick={() => onImageSearchTrigger('open-modal')}
                className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-[#495057] hover:text-[#0f1115] hover:bg-black/[0.05] rounded-full transition-all active:scale-[0.98] cursor-pointer"
                title="Search scraps using AI image recognition"
              >
                <Camera className="w-4 h-4 text-[#0ea5e9]" />
                <span className="hidden md:inline">Image Match</span>
              </button>

              {/* Primary Search Button */}
              <button
                type="button"
                onClick={() => {
                  const q = searchQuery.trim() || 'Copper millberry 99.99%';
                  if (!searchQuery.trim()) {
                    setSearchQuery(q);
                  }
                  if (onSearchSubmit) {
                    onSearchSubmit(q);
                  } else {
                    const el = document.getElementById('categories');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white shadow-[0_4px_16px_rgba(14,165,233,0.35)] flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-6 sm:px-7 py-2.5 text-xs font-semibold rounded-full transition-all active:scale-[0.98] cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Anchor Indicator */}
      <a
        href="#categories"
        className="absolute bottom-6 sm:bottom-8 z-10 text-white/85 hover:text-white transition-all duration-300 animate-bounce p-2.5 rounded-full hover:bg-black/20 cursor-pointer"
        aria-label="Scroll to catalog"
      >
        <ChevronDown className="w-6 h-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
      </a>
    </div>
  );
};
