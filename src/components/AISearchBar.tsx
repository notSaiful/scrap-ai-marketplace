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
  const [showImageSearchModal, setShowImageSearchModal] = useState(false);

  const sampleVisualImages = [
    { name: 'Copper Wire Bales', type: 'copper', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Heavy Steel Scrap', type: 'steel', img: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80' },
    { name: 'Telecom PCB Boards', type: 'pcb', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
    { name: 'PET Plastic Flakes', type: 'pet', img: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=400&q=80' },
  ];

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
                onClick={() => setShowImageSearchModal(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-[#495057] hover:text-[#0f1115] hover:bg-black/[0.05] rounded-full transition-all active:scale-[0.98]"
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
                className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white shadow-[0_4px_16px_rgba(14,165,233,0.35)] flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-6 sm:px-7 py-2.5 text-xs font-semibold rounded-full transition-all active:scale-[0.98]"
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
        className="absolute bottom-6 sm:bottom-8 z-10 text-white/85 hover:text-white transition-all duration-300 animate-bounce p-2.5 rounded-full hover:bg-black/20"
        aria-label="Scroll to catalog"
      >
        <ChevronDown className="w-6 h-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
      </a>

      {/* Visual Image Search Modal */}
      {showImageSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-black/[0.08] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1d1d1f] text-sm">AI Scrap Visual Matching</h3>
                  <p className="text-xs text-slate-500">Match scrap lots using spectrographic photo recognition</p>
                </div>
              </div>
              <button
                onClick={() => setShowImageSearchModal(false)}
                className="text-slate-400 hover:text-black p-1.5 rounded-full hover:bg-black/[0.04] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 border-2 border-dashed border-sky-200 bg-gradient-to-b from-sky-50/50 to-blue-50/20 rounded-2xl p-6 text-center">
              <ImageIcon className="w-10 h-10 text-[#0ea5e9] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#1d1d1f]">Drop scrap yard photo here or browse files</p>
              <p className="text-xs text-slate-500 mt-1">Supports metal bales, turnings, PCB boards, plastic regrind</p>
            </div>

            <div className="mt-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Or select a sample scrap lot to test AI match:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sampleVisualImages.map((sample, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setShowImageSearchModal(false);
                      onImageSearchTrigger(sample.type);
                    }}
                    className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-black/[0.06] hover:border-sky-400 bg-white hover:bg-sky-50/40 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <img src={sample.img} alt={sample.name} className="w-11 h-11 rounded-lg object-cover" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#1d1d1f]">{sample.name}</div>
                      <div className="text-[11px] text-[#0ea5e9] font-semibold">Match lot &rarr;</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowImageSearchModal(false)}
                className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
