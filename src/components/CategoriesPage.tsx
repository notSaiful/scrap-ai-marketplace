import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  SlidersHorizontal, 
  RefreshCw, 
  Filter, 
  ArrowLeft, 
  Search, 
  X,
  ShieldCheck,
  Camera,
  ImageIcon
} from 'lucide-react';
import { ScrapItem } from '../types/scrap';
import { ScrapRagResult } from '../types/rag';
import { CATEGORIES } from '../data/scrapData';
import { ScrapCard } from './ScrapCard';
import { CategorySidebar } from './CategorySidebar';
import { AIRagRecommendationPanel } from './AIRagRecommendationPanel';

interface CategoriesPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  statusFilter: 'all' | 'recent' | 'trending' | 'featured';
  setStatusFilter: (filter: 'all' | 'recent' | 'trending' | 'featured') => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'purity';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'purity') => void;
  filteredScraps: ScrapItem[];
  ragBrief: any;
  ragResultsMap: Map<string, ScrapRagResult>;
  onSelectScrapItem: (item: ScrapItem) => void;
  onOpenRFQ: (item?: ScrapItem, qty?: number) => void;
  onGoHome: () => void;
  onOpenAdvisorModal?: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  filteredScraps,
  ragBrief,
  ragResultsMap,
  onSelectScrapItem,
  onOpenRFQ,
  onGoHome,
  onOpenAdvisorModal,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showImageSearchModal, setShowImageSearchModal] = useState(false);

  const currentCategoryInfo = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  const sampleVisualImages = [
    { name: 'Copper Wire Bales', type: 'copper', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Heavy Steel Scrap', type: 'steel', img: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80' },
    { name: 'Telecom PCB Boards', type: 'pcb', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
    { name: 'PET Plastic Flakes', type: 'pet', img: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleVisualMatchSelect = (scrapType: string) => {
    if (scrapType === 'copper') setSearchQuery('copper millberry');
    else if (scrapType === 'steel') setSearchQuery('HMS 1 steel');
    else if (scrapType === 'pcb') setSearchQuery('telecom PCB');
    else if (scrapType === 'pet') setSearchQuery('PET flakes');
    setShowImageSearchModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-3 text-xs mb-6 text-[#86868b]">
          <div className="flex items-center space-x-2">
            <button
              onClick={onGoHome}
              className="flex items-center space-x-1.5 font-bold text-[#0f1115] hover:text-[#0284c7] bg-white border border-black/[0.08] px-3.5 py-1.5 rounded-full shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveCategory('all')}
              className="hover:text-[#0f1115] font-medium cursor-pointer"
            >
              Categories
            </button>
            {activeCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="font-semibold text-[#0f1115]">{currentCategoryInfo.name}</span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-semibold text-[#0284c7] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Escrow Protected Trade</span>
          </div>
        </div>

        {/* AI Search Bar Section (Replacing the removed card) */}
        <div className="mb-8 sm:mb-10 text-center">
          <div 
            className={`relative bg-white rounded-2xl sm:rounded-full border transition-all duration-300 max-w-3xl mx-auto text-left ${
              isSearchFocused 
                ? 'border-[#38bdf8] ring-4 ring-[#38bdf8]/20 shadow-[0_24px_50px_-10px_rgba(14,165,233,0.25)]' 
                : 'border-black/[0.08] hover:border-black/[0.18] shadow-[0_12px_35px_rgba(0,0,0,0.06)]'
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
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search scrap lot, grade, or price (e.g. 'Copper under $7800', 'HMS steel')..."
                  className="w-full text-[#0f1115] placeholder-[#919eab] focus:outline-none text-xs sm:text-sm font-medium bg-transparent"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="p-1 text-[#919eab] hover:text-[#0f1115] transition-colors cursor-pointer"
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

        {/* Visual Image Match Modal */}
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
                  className="text-slate-400 hover:text-black p-1.5 rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer"
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
                      onClick={() => handleVisualMatchSelect(sample.type)}
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
                  className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column Catalog Grid (Category Filter Sidebar + Listings) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Filter Sidebar (3 cols) */}
          <div className="lg:col-span-3 sticky top-24 space-y-4">
            <CategorySidebar
              selectedCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId)}
            />
          </div>

          {/* Right Column: Listings & Controls (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Status Filters, Sort, and Count */}
            <div className="bg-white rounded-2xl border border-black/[0.08] p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              {/* Status Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {(['all', 'trending', 'featured', 'recent'] as const).map((filterVal) => (
                  <button
                    key={filterVal}
                    onClick={() => setStatusFilter(filterVal)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize transition-all cursor-pointer ${
                      statusFilter === filterVal
                        ? 'bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white shadow-2xs'
                        : 'text-[#495057] hover:text-[#0f1115] hover:bg-[#f1f3f5]'
                    }`}
                  >
                    {filterVal === 'all' ? 'All Lots' : filterVal === 'recent' ? 'Fresh Assay' : filterVal}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#86868b] flex items-center gap-1 font-medium">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Sort:</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold bg-[#f8f9fa] border border-black/[0.08] text-[#0f1115] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#38bdf8] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="purity">Highest AI Purity</option>
                </select>
              </div>
            </div>

            {/* AI RAG Recommendation Engine Banner (Active when search exists) */}
            {ragBrief && (
              <AIRagRecommendationPanel
                brief={ragBrief}
                onSelectScrap={(item) => onSelectScrapItem(item)}
                onOpenRFQ={(item) => onOpenRFQ(item)}
                onApplyRefinement={(newQuery) => setSearchQuery(newQuery)}
                onOpenAdvisorModal={() => onOpenAdvisorModal ? onOpenAdvisorModal() : undefined}
                onClearSearch={() => setSearchQuery('')}
              />
            )}

            {/* Scrap Items Card Grid */}
            {filteredScraps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredScraps.map((item) => (
                  <ScrapCard
                    key={item.id}
                    item={item}
                    ragResult={ragResultsMap.get(item.id)}
                    onSelect={(selected) => onSelectScrapItem(selected)}
                    onQuickRFQ={(target) => onOpenRFQ(target)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-black/[0.06] shadow-2xs">
                <div className="w-14 h-14 bg-sky-50 text-[#0284c7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0f1115]">No scrap lots match your criteria</h3>
                <p className="text-xs text-[#495057] mt-1 max-w-sm mx-auto">
                  Try clearing search filters or choosing a different category like Non-Ferrous Metals or Heavy Steel.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setStatusFilter('all');
                  }}
                  className="mt-5 bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white text-xs font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
