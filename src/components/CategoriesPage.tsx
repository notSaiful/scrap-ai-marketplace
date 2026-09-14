import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  RefreshCw, 
  Filter, 
  ArrowLeft, 
  Search, 
  X, 
  ShieldCheck, 
  Camera, 
  MapPin, 
  Layers
} from 'lucide-react';
import { ScrapItem } from '../types/scrap';
import { ScrapRagResult } from '../types/rag';
import { CATEGORIES } from '../data/scrapData';
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
  onOpenImageMatch?: () => void;
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
  onOpenImageMatch,
}) => {
  // Local Category Filter States
  const [categorySearch, setCategorySearch] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedQuantityRange, setSelectedQuantityRange] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentCategoryInfo = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  const handleResetFilters = () => {
    setMaxPrice(800);
    setSelectedLocation('all');
    setSelectedQuantityRange('all');
    setCategorySearch('');
    setSearchQuery('');
  };

  const locations = [
    { id: 'all', name: 'All Delivery Locations' },
    { id: 'bengaluru', name: 'Bengaluru / Karnataka' },
    { id: 'mumbai', name: 'Mumbai / Maharashtra' },
    { id: 'delhi', name: 'Delhi NCR / Haryana' },
    { id: 'chennai', name: 'Chennai / Tamil Nadu' },
    { id: 'hyderabad', name: 'Hyderabad / Telangana' },
    { id: 'kolkata', name: 'Kolkata / West Bengal' },
  ];

  // Client-side multi-factor filtering based on Alibaba filters
  const displayedItems = useMemo(() => {
    return filteredScraps.filter(item => {
      // 1. Search within category
      if (categorySearch.trim()) {
        const query = categorySearch.toLowerCase().trim();
        const content = `${item.title} ${item.subtitle} ${item.categoryName} ${item.origin}`.toLowerCase();
        if (!content.includes(query)) return false;
      }

      // 2. Price slider (converted to INR per kg estimate)
      const inrRatePerTon = item.pricePerTon > 1000 ? Math.round(item.pricePerTon * 83) : Math.round(item.pricePerTon * 85);
      const inrPricePerKg = Math.round(inrRatePerTon / 1000);
      if (inrPricePerKg > maxPrice) return false;

      // 3. Delivery location
      if (selectedLocation !== 'all') {
        const locLower = item.origin.toLowerCase();
        if (selectedLocation === 'bengaluru' && !locLower.includes('bengaluru') && !locLower.includes('karnataka') && !locLower.includes('south')) return false;
        if (selectedLocation === 'mumbai' && !locLower.includes('mumbai') && !locLower.includes('maharashtra') && !locLower.includes('nhava') && !locLower.includes('west')) return false;
        if (selectedLocation === 'delhi' && !locLower.includes('delhi') && !locLower.includes('haryana') && !locLower.includes('north')) return false;
        if (selectedLocation === 'chennai' && !locLower.includes('chennai') && !locLower.includes('tamil') && !locLower.includes('ennore')) return false;
        if (selectedLocation === 'hyderabad' && !locLower.includes('hyderabad') && !locLower.includes('telangana')) return false;
        if (selectedLocation === 'kolkata' && !locLower.includes('kolkata') && !locLower.includes('bengal') && !locLower.includes('east') && !locLower.includes('jamshedpur')) return false;
      }

      // 4. Quantity Range (MOQ in kg)
      const moqKg = item.moq >= 10 ? item.moq * 50 : 500;
      if (selectedQuantityRange !== 'all') {
        if (selectedQuantityRange === '<500' && moqKg >= 500) return false;
        if (selectedQuantityRange === '500-2000' && (moqKg < 500 || moqKg > 2000)) return false;
        if (selectedQuantityRange === '2000+' && moqKg < 2000) return false;
      }

      return true;
    });
  }, [filteredScraps, categorySearch, maxPrice, selectedLocation, selectedQuantityRange]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 sm:pt-28 pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-6 text-slate-500">
          <div className="flex items-center space-x-2">
            <button
              onClick={onGoHome}
              className="flex items-center space-x-1.5 font-bold text-[#0f1115] hover:text-[#0ea5e9] bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <button
              onClick={() => { setActiveCategory('all'); handleResetFilters(); }}
              className="hover:underline hover:text-slate-900 font-medium cursor-pointer"
            >
              All Categories
            </button>
            {activeCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="font-semibold text-slate-900">{currentCategoryInfo.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Category Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                Bulk Wholesale Supply
              </span>
              <span className="text-xs text-slate-400">
                {displayedItems.length} Available Lots
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1115] mt-1">
              {activeCategory === 'all' ? 'Industrial Bulk Materials & Scrap Supply' : currentCategoryInfo.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Dense wholesale inventory sourced directly from verified industrial suppliers and processors. Transparent per-kg pricing with escrow delivery protection.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            {onOpenImageMatch && (
              <button
                onClick={onOpenImageMatch}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Camera className="w-4 h-4 text-[#0ea5e9]" />
                <span>Photo Match</span>
              </button>
            )}
            <button
              onClick={() => onOpenRFQ()}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Request Quote</span>
            </button>
          </div>
        </div>

        {/* Mobile Filter Drawer Toggle Button */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full bg-white border border-slate-200 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 shadow-2xs"
          >
            <Filter className="w-4 h-4 text-[#0ea5e9]" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Products (Price, Location, Quantity)'}</span>
          </button>
        </div>

        {/* ======================================================================= */}
        {/* MAIN ALIBABA 2-COLUMN LAYOUT (Left Filters Sidebar + Right Grid)        */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT SIDEBAR FILTERS (Sticky on desktop, collapsable on mobile)       */}
          {/* ===================================================================== */}
          <aside className={`lg:col-span-3 lg:sticky lg:top-24 space-y-4 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-6">
              
              {/* Filter Header with Reset */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#0ea5e9]" />
                  <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
                </div>
                {(maxPrice < 100000 || selectedLocation !== 'all' || selectedQuantityRange !== 'all' || categorySearch) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#0ea5e9] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Material Categories Quick Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">
                  Material Categories
                </label>
                <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-sky-50 text-[#0ea5e9] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Materials</span>
                    <span className="text-[10px] text-slate-400">Total</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        activeCategory === cat.id
                          ? 'bg-sky-50 text-[#0ea5e9] font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Price Range (Slider) */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Price Range (Max)
                  </label>
                  <span className="text-xs font-bold text-[#0ea5e9]">
                    ₹{maxPrice.toLocaleString('en-IN')}/kg
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={800}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹10/kg</span>
                  <span>₹400/kg</span>
                  <span>₹800/kg</span>
                </div>
              </div>

              {/* 2. Delivery Location */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0ea5e9]" />
                  <span>Delivery Location</span>
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-[#0ea5e9] cursor-pointer"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              {/* 3. Quantity / MOQ Range */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">
                  Quantity Range (MOQ)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All MOQs' },
                    { id: '<500', label: '< 500 kg' },
                    { id: '500-2000', label: '500–2,000 kg' },
                    { id: '2000+', label: '2,000+ kg' },
                  ].map(qty => (
                    <button
                      key={qty.id}
                      type="button"
                      onClick={() => setSelectedQuantityRange(qty.id)}
                      className={`text-xs py-1.5 px-2 rounded-lg border font-medium transition-all text-center cursor-pointer ${
                        selectedQuantityRange === qty.id
                          ? 'bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-2xs font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {qty.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Alibaba Trust Card */}
            <div className="bg-sky-50/60 rounded-2xl border border-sky-100 p-4 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
                <span>Trade Assurance</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Protected transactions with escrow release only after destination weighbridge verification.
              </p>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: TOP BAR + DENSE ALIBABA GRID CARDS                      */}
          {/* ===================================================================== */}
          <main className="lg:col-span-9 space-y-5">
            
            {/* Top Bar: Search-within-category field + Sort Dropdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Search-Within-Category Field */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search within this category (e.g. 'Copper', 'Steel', 'Plastic')..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0ea5e9] focus:bg-white transition-all"
                />
                {categorySearch && (
                  <button
                    onClick={() => setCategorySearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                <span className="text-xs text-slate-400 hidden md:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-[#0ea5e9] cursor-pointer"
                >
                  <option value="featured">Most Requested</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* AI RAG Recommendation Panel (if active search query exists) */}
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

            {/* =================================================================== */}
            {/* DENSE ALIBABA GRID CARDS (3–4 columns desktop, 1 column mobile)     */}
            {/* White cards, 8px radius, subtle border, hover lift & shadow         */}
            {/* =================================================================== */}
            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-4.5">
                {displayedItems.map((item) => {
                  const inrRatePerTon = item.pricePerTon > 1000 ? Math.round(item.pricePerTon * 83) : Math.round(item.pricePerTon * 85);
                  const baseRatePerKg = Math.round(inrRatePerTon / 1000);
                  const minPrice = Math.max(1, Math.round(baseRatePerKg * 0.95));
                  const maxPrice = Math.max(1, Math.round(baseRatePerKg * 1.05));
                  const moqKg = item.moq >= 10 ? item.moq * 50 : 500;
                  const stockKg = item.availableStock * 1000;

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectScrapItem(item)}
                      className="group bg-white rounded-[8px] border border-slate-200/90 hover:border-[#0ea5e9]/50 shadow-xs hover:shadow-[0_12px_28px_rgba(14,165,233,0.12)] hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* Thumbnail Image Container (16:10 ratio) */}
                        <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                          <img
                            src={item.primaryImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />

                          {/* Origin location badge */}
                          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded">
                            {item.origin.split(',')[0]}
                          </div>
                        </div>

                        {/* Card Body Details */}
                        <div className="p-3.5 space-y-2">
                          {/* Material Name */}
                          <h3 className="font-bold text-sm text-[#0f1115] leading-snug line-clamp-1 group-hover:text-[#0ea5e9] transition-colors">
                            {item.title}
                          </h3>

                          {/* Indicative Price Range */}
                          <div>
                            <div className="text-[15px] font-bold text-[#0f1115]">
                              ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                              <span className="text-[11px] font-normal text-slate-500"> / kg</span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              (indicative price)
                            </div>
                          </div>

                          {/* MOQ Line */}
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-600">
                            <span className="font-semibold text-slate-700">
                              MOQ: {moqKg.toLocaleString('en-IN')} kg
                            </span>
                            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                              Stock: {stockKg.toLocaleString('en-IN')} kg
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer: Request Quote Button */}
                      <div className="p-3.5 pt-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenRFQ(item);
                          }}
                          className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold py-2 px-3 rounded-[6px] transition-all shadow-2xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Request Quote</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-12 h-12 bg-sky-50 text-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No materials match your filter criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try clearing the price slider or adjusting your delivery location filter.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
