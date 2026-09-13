import React, { useState } from 'react';
import { Search, Camera, X } from 'lucide-react';

interface StickySearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenImageSearch: () => void;
  isVisible: boolean;
  onGoHome: () => void;
  onSearchSubmit?: (query: string) => void;
}

export const StickySearchBar: React.FC<StickySearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenImageSearch,
  isVisible,
  onGoHome,
  onSearchSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim() || 'Copper millberry 99.99%';
    if (!searchQuery.trim()) {
      setSearchQuery(q);
    }
    if (onSearchSubmit) {
      onSearchSubmit(q);
    } else {
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full flex justify-center fixed top-3 sm:top-5 left-0 right-0 z-50 px-4 pointer-events-none">
      <div
        className={`w-full max-w-4xl bg-white/95 backdrop-blur-2xl border transition-all duration-300 rounded-full px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] pointer-events-auto ${
          isFocused
            ? 'border-[#38bdf8] ring-4 ring-[#38bdf8]/15 shadow-[0_16px_45px_rgba(14,165,233,0.2)]'
            : 'border-black/[0.08]'
        } ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : '-translate-y-20 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Left: Brand / Home / Back to Top Button */}
        <button
          onClick={onGoHome}
          className="flex items-center space-x-2 pl-1 sm:pl-2 pr-2 py-1 rounded-full hover:bg-black/[0.04] transition-all group cursor-pointer shrink-0"
          title="wastemarket.in • Scroll to top"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            W
          </div>
          <span className="text-xs font-bold text-[#0f1115] hidden sm:inline tracking-tight">
            wastemarket<span className="bg-gradient-to-r from-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent">.in</span>
          </span>
        </button>

        {/* Center: Search Input */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center min-w-0 px-1 sm:px-3">
          <Search className="w-4 h-4 text-[#919eab] mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search scrap lot, grade, or price (e.g. 'Copper', 'HMS steel')..."
            className="w-full text-xs sm:text-sm font-medium text-[#0f1115] placeholder-[#919eab] focus:outline-none bg-transparent truncate"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#919eab] hover:text-[#0f1115] transition-colors shrink-0 ml-1"
              title="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Right: Actions (Image Match + Search CTA) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <button
            type="button"
            onClick={onOpenImageSearch}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#495057] hover:text-[#0f1115] hover:bg-black/[0.05] rounded-full transition-all active:scale-[0.98]"
            title="Search using AI image recognition"
          >
            <Camera className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span className="hidden md:inline">Image Match</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white shadow-[0_3px_12px_rgba(14,165,233,0.3)] flex items-center space-x-1.5 px-3.5 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all active:scale-[0.98]"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
