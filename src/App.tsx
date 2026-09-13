import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { NewHeroSection } from './components/NewHeroSection';
import { StickySearchBar } from './components/StickySearchBar';
import { ImageMatchModal } from './components/ImageMatchModal';
import { TrustStrip } from './components/TrustStrip';
import { HowItWorks } from './components/HowItWorks';
import { WhoItsFor } from './components/WhoItsFor';
import { WhatWeSource } from './components/WhatWeSource';
import { AboutMission } from './components/AboutMission';
import { WhyTrustSection } from './components/WhyTrustSection';
import { FinalCTA } from './components/FinalCTA';
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
import { MarketlyFooter } from './components/MarketlyFooter';
import { AIAdvisorPage } from './components/AIAdvisorPage';
import { ContactUsPage } from './components/ContactUsPage';
import { QuotesPage, BuyerQuoteEnquiry } from './components/QuotesPage';
import { evaluateScrapsWithRag } from './services/ragEngine';
import { ScrapRagResult } from './types/rag';

const INITIAL_BUYER_QUOTES: BuyerQuoteEnquiry[] = [
  {
    id: 'quote-seed-1',
    orderNumber: 'WM-2026-9281',
    requestTitle: 'Requested: 5 tons Steel Scrap, Grade A · May 14, 2026',
    materialName: 'Steel Scrap, Grade A (Heavy Melting Scrap HMS 1)',
    grade: 'Grade A (ISRI 200/201)',
    quantityTons: 5,
    requestDate: 'May 14, 2026',
    targetPricePerTon: 420,
    totalEstimatedAmount: 2100,
    destinationPort: 'Nhava Sheva (JNPT), Mumbai',
    incoterm: 'CIF JNPT',
    supplierName: 'Tata Steel Industrial Yards',
    supplierOrigin: 'Jamshedpur, India',
    status: 'delivered',
    statusSteps: {
      sourcing: { date: 'May 14, 2026 · 10:15 AM', details: 'Yard lot allocated; spark test & optical spectrometer verification completed (Fe > 98.4%).', done: true },
      confirmed: { date: 'May 15, 2026 · 02:30 PM', details: 'Escrow funded via Razorpay Route; formal digital purchase order #WM-PO-8812 locked.', done: true },
      inTransit: { date: 'May 17, 2026 · 11:00 AM', details: '20ft high-cube container loaded, weighbridge gross 5,020 kg verified, electronic tamper seal applied.', done: true },
      delivered: { date: 'May 20, 2026 · 04:45 PM', details: 'Delivered to JNPT CFS yard. Buyer visual inspection & weigh-in verified; Escrow payment released.', done: true },
    },
    orderConfirmation: {
      orderId: 'WM-ORD-9281',
      confirmedAt: 'May 15, 2026',
      escrowStatus: 'Disbursed to Yard',
      escrowNodeId: 'rzp_escrow_settled_9281',
      assayReportId: 'XRF-TATA-2026-081',
      assayPurity: 'Fe 98.6% (ISRI Grade A Verified)',
      weighbridgeSlipNumber: 'WB-JNPT-2026-5591',
      carrier: 'Container Corporation of India (CONCOR)',
      containerNumber: 'TGHU-918234-1',
      eta: 'Delivered on May 20, 2026',
    },
    buyerNotes: 'Requires delivery before smelting batch cycle on May 22. Standard moisture deduction < 0.5%.',
  },
  {
    id: 'quote-seed-2',
    orderNumber: 'WM-2026-7492',
    requestTitle: 'Requested: 22 tons Copper Millberry Scrap, Grade 1 (Berry) · May 18, 2026',
    materialName: 'Bare Bright Copper Wire (Millberry)',
    grade: 'Grade 1 Berry (ISRI)',
    quantityTons: 22,
    requestDate: 'May 18, 2026',
    targetPricePerTon: 8950,
    totalEstimatedAmount: 196900,
    destinationPort: 'Mundra Port, Gujarat',
    incoterm: 'CIF Mundra',
    supplierName: 'Hindalco Authorized Recycler Network',
    supplierOrigin: 'Dahej, Gujarat',
    status: 'in_transit',
    statusSteps: {
      sourcing: { date: 'May 18, 2026 · 09:30 AM', details: 'Electrolytic copper bundle selected; Olympus Vanta XRF certified Cu 99.92%.', done: true },
      confirmed: { date: 'May 19, 2026 · 03:20 PM', details: 'Multi-party escrow account credited. LC backed by SBI Commercial Bank.', done: true },
      inTransit: { date: 'May 21, 2026 · 08:00 AM', details: 'Dispatched via Gujarat Maritime Logistics, GPS tracking ID #GML-8821 active. Vessel en-route.', done: true },
      delivered: { date: 'Expected May 24, 2026', details: 'Pending dockside radiation sweep and customs release at Mundra Terminal 2.', done: false },
    },
    orderConfirmation: {
      orderId: 'WM-ORD-7492',
      confirmedAt: 'May 19, 2026',
      escrowStatus: 'Milestone Locked',
      escrowNodeId: 'rzp_escrow_hold_7492',
      assayReportId: 'XRF-SPECTRO-9912',
      assayPurity: 'Cu 99.92% (Pure Bright)',
      weighbridgeSlipNumber: 'WB-DHJ-88190',
      carrier: 'Maersk Regional Feeder Logistics',
      containerNumber: 'MSKU-449102-8',
      eta: 'May 24, 2026 (On schedule)',
    },
    buyerNotes: 'No burnt wire or enameled windings accepted. Strict copper bare bright millberry standard.',
  },
  {
    id: 'quote-seed-3',
    orderNumber: 'WM-2026-6105',
    requestTitle: 'Requested: 15 tons Shredded Steel HMS 1, Grade ISRI 200 · Jun 02, 2026',
    materialName: 'Heavy Melting Steel Scrap (HMS 1/2)',
    grade: 'Grade ISRI 200 (1/4 inch min)',
    quantityTons: 15,
    requestDate: 'Jun 02, 2026',
    targetPricePerTon: 395,
    totalEstimatedAmount: 5925,
    destinationPort: 'Chennai Port (CITPL)',
    incoterm: 'FOB Yard',
    supplierName: 'Jindal Ferrous Yard Hub',
    supplierOrigin: 'Bellary, Karnataka',
    status: 'confirmed',
    statusSteps: {
      sourcing: { date: 'Jun 02, 2026 · 11:45 AM', details: '15 tons prepared at rail siding; density verified at 65 lbs/cu ft.', done: true },
      confirmed: { date: 'Jun 03, 2026 · 01:10 PM', details: 'Buyer accepted proforma invoice. Razorpay Escrow balance earmarked.', done: true },
      inTransit: { date: 'Estimated Jun 06, 2026', details: 'Awaiting rake wagon placement at Bellary Freight Terminal.', done: false },
      delivered: { date: 'Estimated Jun 09, 2026', details: 'Final discharge at Chennai Port gate 4.', done: false },
    },
    orderConfirmation: {
      orderId: 'WM-ORD-6105',
      confirmedAt: 'Jun 03, 2026',
      escrowStatus: 'Razorpay Escrow Funded',
      escrowNodeId: 'rzp_escrow_active_6105',
      assayReportId: 'XRF-JINDAL-0034',
      assayPurity: 'Fe 97.8% (ISRI 200)',
      carrier: 'Indian Railways Freight (CONCOR rake)',
      eta: 'Jun 09, 2026',
    },
    buyerNotes: 'Free of hollow cylinders and unpunctured gas canisters.',
  },
  {
    id: 'quote-seed-4',
    orderNumber: 'WM-2026-5082',
    requestTitle: 'Requested: 8 tons Aluminum 6063 Extrusions, Grade Clean · Jun 10, 2026',
    materialName: 'Aluminum 6063 Extrusions (T5/T6)',
    grade: 'Clean / Unpainted (ISRI Tata)',
    quantityTons: 8,
    requestDate: 'Jun 10, 2026',
    targetPricePerTon: 2280,
    totalEstimatedAmount: 18240,
    destinationPort: 'Nhava Sheva (JNPT), Mumbai',
    incoterm: 'CIF JNPT',
    supplierName: 'Century Metal Logistics',
    supplierOrigin: 'Pune, Maharashtra',
    status: 'sourcing',
    statusSteps: {
      sourcing: { date: 'Jun 10, 2026 · 04:15 PM', details: 'RFQ disseminated to 4 certified scrap recyclers in Pune Industrial Zone.', done: true },
      confirmed: { date: 'Pending yard confirmation', details: 'Yard inspection & price lock within 12 business hours.', done: false },
      inTransit: { date: 'Pending dispatch', details: 'Direct flatbed transport with electronic tarpaulin seals.', done: false },
      delivered: { date: 'Estimated Jun 14, 2026', details: 'Destination weigh-in & chemical assay verification.', done: false },
    },
    orderConfirmation: {
      orderId: 'WM-ORD-5082',
      confirmedAt: 'In Progress (Sourcing)',
      escrowStatus: 'Razorpay Escrow Funded',
      escrowNodeId: 'rzp_escrow_prep_5082',
      assayReportId: 'XRF-PENDING-5082',
      assayPurity: 'Al > 98.5% Expected',
      carrier: 'WasteMarket Priority Freight',
      eta: 'Jun 14, 2026',
    },
    buyerNotes: 'Must be free of thermal breaks, iron screws, or heavy grease coating.',
  },
];

function MarketplaceContent() {
  const [currentPage, setCurrentPage] = useState<'marketplace' | 'categories' | 'advisor' | 'contact' | 'quotes'>('marketplace');
  const [buyerQuotes, setBuyerQuotes] = useState<BuyerQuoteEnquiry[]>(INITIAL_BUYER_QUOTES);
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
    if (scrapType === 'copper') setSearchQuery('copper millberry');
    else if (scrapType === 'steel') setSearchQuery('HMS 1 steel');
    else if (scrapType === 'pcb') setSearchQuery('telecom PCB');
    else if (scrapType === 'pet') setSearchQuery('PET flakes');
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
          assayPurity: submittedData.item?.purity || '99.2% Target',
          carrier: 'WasteMarket Freight Line',
          eta: 'Estimated 3-5 Business Days',
        },
        buyerNotes: submittedData.notes || 'Immediate dispatch required. Assayed purity guaranteed.',
      };

      setBuyerQuotes((prev) => [newQuote, ...prev]);
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
            {/* 1. Hero */}
            <NewHeroSection
              onOpenRFQ={() => handleOpenRFQ()}
              onSearchSubmit={handleSearchSubmit}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* 2. Trust Strip */}
            <TrustStrip />

            {/* 3. How It Works */}
            <HowItWorks onOpenRFQ={() => handleOpenRFQ()} />

            {/* 4. Who It's For */}
            <WhoItsFor />

            {/* 5. What We Source */}
            <WhatWeSource
              onSelectCategory={(cat) => handleOpenCategoriesPage(cat)}
              onAskUs={handleOpenContactUs}
            />

            {/* Live Verified Scrap Inventory Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-[#E2E2E0]/60">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0D9488] mb-2 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                    <span>Live Yard Lots</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#0F2A47] tracking-tight">
                    High-Demand Scrap Listings
                  </h3>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleOpenCategoriesPage('all')}
                    className="bg-[#0F2A47] hover:bg-[#0D9488] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-[8px] inline-flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>View All {SCRAP_ITEMS.length} Lots</span>
                    <ArrowRight className="w-4 h-4" />
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

            {/* 6. About / Mission */}
            <AboutMission onOpenRFQ={() => handleOpenRFQ()} />

            {/* 7. Why Businesses Trust wastemarket */}
            <WhyTrustSection />

            {/* 8. FAQ */}
            <MarketlyFAQ onOpenContactUs={handleOpenContactUs} />

            {/* 9. Final CTA */}
            <FinalCTA onOpenRFQ={() => handleOpenRFQ()} />
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
