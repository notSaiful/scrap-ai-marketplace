import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { AISearchBar } from './components/AISearchBar';
import { StickySearchBar } from './components/StickySearchBar';
import { ImageMatchModal } from './components/ImageMatchModal';
import { TrustStrip } from './components/TrustStrip';
import { HowItWorks } from './components/HowItWorks';
import { WhoItsFor } from './components/WhoItsFor';
import { WhatWeSource } from './components/WhatWeSource';
import { CategoriesPage } from './components/CategoriesPage';
import { ScrapCard } from './components/ScrapCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { RFQModal } from './components/RFQModal';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { SCRAP_ITEMS } from './data/scrapData';
import { ScrapItem } from './types/scrap';
import { ArrowRight } from 'lucide-react';
import { MarketlyFAQ } from './components/MarketlyFAQ';
import { MarketlyMissionSection } from './components/MarketlyMissionSection';
import { MarketlyNewsletter } from './components/MarketlyNewsletter';
import { MarketlyFooter } from './components/MarketlyFooter';
import { AIAdvisorPage } from './components/AIAdvisorPage';
import { ContactUsPage } from './components/ContactUsPage';
import { QuotesPage, BuyerQuoteEnquiry } from './components/QuotesPage';
import { evaluateScrapsWithRag } from './services/ragEngine';
import { ScrapRagResult } from './types/rag';

const INITIAL_BUYER_QUOTES: BuyerQuoteEnquiry[] = [];

function MarketplaceContent() {
  const [currentPage, setCurrentPage] = useState<'marketplace' | 'categories' | 'advisor' | 'contact' | 'quotes'>('marketplace');
  const [buyerQuotes, setBuyerQuotes] = useState<BuyerQuoteEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('wm_buyer_quotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScrapItem, setSelectedScrapItem] = useState<ScrapItem | null>(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqTargetItem, setRfqTargetItem] = useState<ScrapItem | null>(null);
  const [rfqInitialQty, setRfqInitialQty] = useState<number | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'purity'>('featured');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'recent' | 'trending' | 'featured'>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageSearchModalOpen, setImageSearchModalOpen] = useState(false);

  // Detect scroll to swap Header with Sticky Search Bar
  useEffect(() => {
    const handleScroll = () => {
      const threshold = Math.min(260, window.innerHeight * 0.3);
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI RAG Recommendation Engine
  const ragBrief = useMemo(() => {
    return evaluateScrapsWithRag(searchQuery, SCRAP_ITEMS);
  }, [searchQuery]);

  // Fast O(1) map of item.id -> ScrapRagResult
  const ragResultsMap = useMemo(() => {
    const map = new Map<string, ScrapRagResult>();
    if (ragBrief) {
      ragBrief.allRanked.forEach((res) => {
        map.set(res.item.id, res);
      });
    }
    return map;
  }, [ragBrief]);

  // Filter and search logic with AI RAG multi-factor scoring integration
  const filteredScraps = useMemo(() => {
    // If RAG determined no genuine stock match exists, do not force unrelated items!
    if (ragBrief && ragBrief.hasStockMatch === false) {
      return [];
    }

    // If RAG is active, start from AI-ranked items
    const baseItems = ragBrief ? ragBrief.allRanked.map((r) => r.item) : SCRAP_ITEMS;

    return baseItems.filter((item) => {
      // Status pill filter
      if (statusFilter === 'trending' && !item.isHotDeal && item.supplier.rating < 4.8) return false;
      if (statusFilter === 'featured' && !item.isFeatured) return false;
      if (statusFilter === 'recent' && item.viewsCount > 1500) return false;

      // Category filter
      if (activeCategory !== 'all') {
        if (item.category === activeCategory) {
          // Direct match
        } else if (activeCategory === 'non-ferrous' && (item.category.includes('copper') || item.category.includes('aluminum') || item.category.includes('brass') || item.category.includes('non-ferrous'))) {
          // Non-ferrous match
        } else if (activeCategory === 'ferrous' && (item.category.includes('steel') || item.category.includes('iron') || item.category.includes('ferrous'))) {
          // Ferrous match
        } else if (activeCategory === 'battery' && item.category.includes('battery')) {
          // Battery match
        } else if ((activeCategory === 'plastic' || activeCategory === 'plastics') && (item.category.includes('plastic') || item.category.includes('polymer') || item.category === 'plastics')) {
          // Plastic match
        } else if (activeCategory === 'e-waste' && (item.category.includes('e-waste') || item.category.includes('pcb'))) {
          // E-waste match
        } else if (activeCategory === 'automotive' && (item.category.includes('auto') || item.category.includes('catalytic'))) {
          // Automotive match
        } else if (activeCategory === 'paper' && (item.category.includes('paper') || item.category.includes('occ'))) {
          // Paper match
        } else {
          return false;
        }
      }

      // Keyword fallback if RAG isn't active
      if (!ragBrief && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const priceMatch = q.match(/(?:under|below|<|\$)\s*(\d+[\d,]*)/i);
        if (priceMatch) {
          const maxP = parseFloat(priceMatch[1].replace(/,/g, ''));
          if (item.pricePerTon > maxP) return false;
        }

        const words = q.replace(/(?:under|below|<|\$)\s*(\d+[\d,]*)/gi, '').trim().split(/\s+/).filter(Boolean);
        if (words.length > 0) {
          const content = `${item.title} ${item.subtitle} ${item.grade} ${item.origin} ${item.supplier.name} ${item.description}`.toLowerCase();
          const matchesAll = words.some((w) => content.includes(w));
          if (!matchesAll) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerTon - b.pricePerTon;
      if (sortBy === 'price-desc') return b.pricePerTon - a.pricePerTon;
      if (sortBy === 'purity') return b.aiSpecs.purityScore - a.aiSpecs.purityScore;
      
      // Default: If RAG is active, rank by AI composite score
      if (ragBrief) {
        const scoreA = ragResultsMap.get(a.id)?.compositeScore ?? 0;
        const scoreB = ragResultsMap.get(b.id)?.compositeScore ?? 0;
        return scoreB - scoreA;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, sortBy, activeCategory, statusFilter, ragBrief, ragResultsMap]);

  const handleOpenCategoriesPage = (category: string = 'all') => {
    setSelectedScrapItem(null);
    setActiveCategory(category);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentPage('marketplace');
    setSelectedScrapItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    handleOpenCategoriesPage('all');
  };

  const handleOpenRFQ = (item?: ScrapItem, qty?: number) => {
    setRfqTargetItem(item || null);
    setRfqInitialQty(qty);
    setRfqModalOpen(true);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleImageSearchTrigger = (scrapType: string) => {
    if (scrapType === 'open-modal') {
      setImageSearchModalOpen(true);
      return;
    }
    if (scrapType === 'copper') setSearchQuery('copper millberry');
    else if (scrapType === 'steel') setSearchQuery('HMS 1 steel');
    else if (scrapType === 'aluminum') setSearchQuery('aluminum extrusion');
    else if (scrapType === 'plastics' || scrapType === 'pet') setSearchQuery('PET flakes');
    else if (scrapType === 'paper') setSearchQuery('OCC 11 cardboard');
    handleOpenCategoriesPage('all');
  };

  const handleOpenContactUs = () => {
    setSelectedScrapItem(null);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuotesPage = () => {
    setSelectedScrapItem(null);
    setCurrentPage('quotes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRFQSubmitSuccess = (submittedData?: any) => {
    if (submittedData) {
      const todayStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());
      const qty = submittedData.quantity || 5;
      const itemTitle = submittedData.item?.title || 'Industrial Scrap Lot';
      const itemGrade = submittedData.item?.grade || 'Grade A';
      const orderId = `WM-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

      const newQuote: BuyerQuoteEnquiry = {
        id: `quote-${Date.now()}`,
        orderNumber: `WM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        requestTitle: `Requested: ${qty} tons ${itemTitle}, Grade ${itemGrade} · ${todayStr}`,
        materialName: itemTitle,
        grade: itemGrade,
        quantityTons: qty,
        requestDate: todayStr,
        targetPricePerTon: submittedData.targetPrice || submittedData.item?.pricePerTon || 1850,
        totalEstimatedAmount: (submittedData.targetPrice || submittedData.item?.pricePerTon || 1850) * qty,
        destinationPort: submittedData.destinationPort || 'Nhava Sheva (JNPT), Mumbai',
        incoterm: submittedData.incoterm || 'CIF',
        productImage: submittedData.item?.primaryImage || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        supplierName: submittedData.item?.supplier?.name || 'Hindalco Verified Partner Yard',
        supplierOrigin: submittedData.item?.origin || 'Gujarat, India',
        status: 'sourcing',
        statusSteps: {
          sourcing: { date: 'Today (Just now)', details: 'Quote RFQ broadcasted to verified yards. Spectrographic assay scheduled.', done: true },
          confirmed: { date: 'Pending yard lock', details: 'Razorpay Escrow authorization & booking confirmation', done: false },
          inTransit: { date: 'Pending dispatch', details: 'Electronic weighbridge slip & multi-seal container dispatch', done: false },
          delivered: { date: 'Estimated 3-5 days', details: 'Destination customs clearance & payment disbursement', done: false },
        },
        orderConfirmation: {
          orderId,
          confirmedAt: 'In Progress (Sourcing)',
          escrowStatus: 'Razorpay Escrow Funded',
          escrowNodeId: `rzp_node_${Math.random().toString(36).substring(2, 9)}`,
          assayReportId: `XRF-PENDING-${Math.floor(1000 + Math.random() * 9000)}`,
          assayPurity: submittedData.item?.aiSpecs?.purityScore ? `${submittedData.item.aiSpecs.purityScore}% Verified` : '99.2% Target',
          carrier: 'WasteMarket Freight Line',
          eta: 'Estimated 3-5 Business Days',
        },
        buyerNotes: submittedData.notes || 'Immediate dispatch required. Assayed purity guaranteed.',
      };

      setBuyerQuotes((prev) => {
        const updated = [newQuote, ...prev];
        try {
          localStorage.setItem('wm_buyer_quotes', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }
    setRfqModalOpen(false);
    setCurrentPage('quotes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isMarketplaceHome = currentPage === 'marketplace' && !selectedScrapItem;
  const isCategoriesPage = currentPage === 'categories' && !selectedScrapItem;
  const shouldStickSearchBar = isScrolled && (isMarketplaceHome || isCategoriesPage);

  // High-demand scrap lots for homepage showcase
  const highDemandLots = useMemo(() => {
    const featured = SCRAP_ITEMS.filter(s => s.isFeatured || s.isHotDeal);
    return (featured.length >= 4 ? featured : SCRAP_ITEMS).slice(0, 4);
  }, []);


  return (
    <div className={`min-h-screen flex flex-col bg-white selection:bg-sky-500/15 selection:text-[#0284c7] ${currentPage === 'advisor' ? 'h-screen overflow-hidden' : ''}`}>
      {/* Clean Minimal Header with Auth */}
      <Header
        currentPage={currentPage}
        onGoHome={handleGoHome}
        onOpenCategoriesPage={() => handleOpenCategoriesPage('all')}
        onOpenAdvisorPage={() => {
          setSelectedScrapItem(null);
          setCurrentPage('advisor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuotes={handleOpenQuotesPage}
        onOpenContactUs={handleOpenContactUs}
        onOpenAuth={handleOpenAuth}
        shouldHide={shouldStickSearchBar}
      />

      {/* Sticky Search Bar: Sticks in place of header once user scrolls down */}
      <StickySearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenImageSearch={() => setImageSearchModalOpen(true)}
        isVisible={shouldStickSearchBar}
        onGoHome={() => {
          if (currentPage !== 'marketplace') {
            handleGoHome();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content Area */}
      <main className={`flex-1 ${currentPage === 'advisor' ? 'h-full overflow-hidden' : ''}`}>
        {selectedScrapItem ? (
          /* Product Showcase Page */
          <ProductDetailPage
            item={selectedScrapItem}
            onBack={() => setSelectedScrapItem(null)}
            onOpenRFQ={(item, qty) => handleOpenRFQ(item, qty)}
          />
        ) : currentPage === 'advisor' ? (
          /* Dedicated AI Metallurgical Advisor Page */
          <AIAdvisorPage
            onBackToMarketplace={handleGoHome}
            onSearchScrapOnMarketplace={(query) => {
              setSearchQuery(query);
              handleOpenCategoriesPage('all');
            }}
            onOpenRFQ={(item, qty) => handleOpenRFQ(item, qty)}
            onSelectScrapItem={(item) => setSelectedScrapItem(item)}
          />
        ) : currentPage === 'categories' ? (
          /* Dedicated Categories Directory Page with Full Listings & Filters */
          <CategoriesPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredScraps={filteredScraps}
            ragBrief={ragBrief}
            ragResultsMap={ragResultsMap}
            onSelectScrapItem={(item) => setSelectedScrapItem(item)}
            onOpenRFQ={(item, qty) => handleOpenRFQ(item, qty)}
            onGoHome={handleGoHome}
            onOpenAdvisorModal={() => {
              setSelectedScrapItem(null);
              setCurrentPage('advisor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenImageMatch={() => setImageSearchModalOpen(true)}
          />
        ) : currentPage === 'contact' ? (
          /* Dedicated Razorpay-Compliant Contact Us Page with AI Support */
          <ContactUsPage
            onGoHome={handleGoHome}
            onOpenAdvisorPage={() => {
              setSelectedScrapItem(null);
              setCurrentPage('advisor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuotes={handleOpenQuotesPage}
          />
        ) : currentPage === 'quotes' ? (
          /* Dedicated Buyer Quotes & Order Tracking Page */
          <QuotesPage
            quotes={buyerQuotes}
            onGoHome={handleGoHome}
            onOpenNewRFQ={() => handleOpenRFQ()}
            onOpenContactUs={handleOpenContactUs}
          />
        ) : (
          /* Marketplace Landing Page */
          <div>
            {/* Minimalist AI Search Bar (Hero with video trash.mp4 & headline) */}
            <AISearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onImageSearchTrigger={handleImageSearchTrigger}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Moving Trust Strip Banner directly below Hero */}
            <TrustStrip />

            {/* High-Demand Scrap Listings (Above How It Works) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-2 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] animate-pulse" />
                    <span>Live Yard Inventory</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f1115] tracking-tight">
                    High-Demand Listings
                  </h2>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleOpenCategoriesPage('all')}
                    className="group bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full inline-flex items-center space-x-2 transition-all shadow-[0_4px_14px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)] cursor-pointer active:scale-98"
                  >
                    <span>View All {SCRAP_ITEMS.length} Lots</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* 4 High-Demand Scrap Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {highDemandLots.map((scrap) => (
                  <ScrapCard
                    key={scrap.id}
                    item={scrap}
                    ragResult={ragResultsMap.get(scrap.id)}
                    onSelect={(item) => setSelectedScrapItem(item)}
                    onQuickRFQ={(item) => handleOpenRFQ(item)}
                  />
                ))}
              </div>
            </section>

            {/* How It Works (3 steps) */}
            <HowItWorks onOpenRFQ={() => handleOpenRFQ()} />

            {/* Who It's For: Built for Businesses That Buy in Bulk */}
            <WhoItsFor
              onOpenRFQ={() => handleOpenRFQ()}
              onExploreCatalog={() => handleOpenCategoriesPage('all')}
            />

            {/* What We Source: Materials We Source */}
            <WhatWeSource
              onSelectCategory={(cat) => handleOpenCategoriesPage(cat)}
              onOpenContact={handleOpenContactUs}
            />

            {/* Mission & Why Businesses Trust wastemarket Section */}
            <MarketlyMissionSection
              onOpenRFQ={() => handleOpenRFQ()}
              onExploreLots={() => handleOpenCategoriesPage('all')}
            />

            {/* FAQ Accordion Section (AK FAQ Framer Style) */}
            <MarketlyFAQ onOpenContactUs={handleOpenContactUs} />

            {/* Newsletter Subscription Card */}
            <MarketlyNewsletter />
          </div>
        )}
      </main>

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />

      {/* RFQ Modal */}
      <RFQModal
        isOpen={rfqModalOpen}
        item={rfqTargetItem}
        initialQuantity={rfqInitialQty}
        onClose={() => setRfqModalOpen(false)}
        onSubmitSuccess={handleRFQSubmitSuccess}
      />

      {/* Shared AI Image Match Modal */}
      <ImageMatchModal
        isOpen={imageSearchModalOpen}
        onClose={() => setImageSearchModalOpen(false)}
        onSelectScrapType={handleImageSearchTrigger}
      />

      {/* Marketly Multi-column Footer (Only on Marketplace and Categories, hidden on full-screen AI Advisor) */}
      {currentPage !== 'advisor' && (
        <MarketlyFooter
          onGoHome={handleGoHome}
          onSelectCategory={(cat) => handleOpenCategoriesPage(cat)}
          onOpenCategoriesPage={(cat = 'all') => handleOpenCategoriesPage(cat)}
          onOpenAdvisorPage={() => {
            setSelectedScrapItem(null);
            setCurrentPage('advisor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenQuotes={handleOpenQuotesPage}
          onOpenContactUs={handleOpenContactUs}
        />
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MarketplaceContent />
    </AuthProvider>
  );
}
