import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Truck,
  PackageCheck,
  ShieldCheck,
  Search,
  Plus,
  Share2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  Sparkles,
  MapPin,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Info,
  Clock,
  ArrowRight,
  Settings,
  Edit3,
} from 'lucide-react';

export interface QuoteMessage {
  id: string;
  sender: 'buyer' | 'team';
  text: string;
  timestamp: string;
}

export interface BuyerQuoteEnquiry {
  id: string;
  orderNumber: string; // e.g. "WM-1042"
  requestTitle: string; // e.g. "Requested: 500 kg Steel Scrap · Bengaluru · Sep 13"
  materialName: string; // e.g. "Steel Scrap"
  grade: 'Grade A' | 'Grade B' | 'Grade C' | string;
  quantityKg?: number;
  quantityTons?: number;
  deliveryLocation: string; // e.g. "Bengaluru, Karnataka"
  requestDate: string; // e.g. "Sep 13, 2026"
  referencePhoto?: string;
  productImage?: string;

  // Stage & Status:
  // "quote_received" | "sourcing" | "offer_ready" | "confirmed" | "in_transit" | "delivered"
  status: 'quote_received' | 'sourcing' | 'offer_ready' | 'confirmed' | 'in_transit' | 'delivered';

  // Offer Details (Stage 2)
  offer?: {
    pricePerKg?: number; // e.g. 42
    pricePerTon?: number; // legacy e.g. 42000
    totalAmount: number;
    deliveryWindow: string; // e.g. "Sep 18 – Sep 21 (3-5 business days)"
    batchPhoto: string;
    aiGradeReport: {
      purityScore: number;
      spectrographicSummary: string;
      densityRating: string;
      verifiedDate: string;
    };
    supplierName: string;
    supplierOrigin: string;
  };

  // Tracking Timeline Details (Stage 3)
  timeline?: {
    quoteReceivedAt: string;
    sourcingStartedAt?: string;
    offerConfirmedAt?: string;
    inTransitAt?: string;
    deliveredAt?: string;
    trackingCarrier?: string;
    containerSlipId?: string;
  };

  // Lightweight Question Thread
  messages?: QuoteMessage[];
}

interface QuotesPageProps {
  quotes: BuyerQuoteEnquiry[];
  onGoHome: () => void;
  onOpenNewRFQ: (defaultMaterial?: string) => void;
  onUpdateQuoteStatus?: (quoteId: string, newStatus: BuyerQuoteEnquiry['status']) => void;
  onUpdateQuoteFull?: (quoteId: string, partial: Partial<BuyerQuoteEnquiry>) => void;
  onAddQuoteMessage?: (quoteId: string, messageText: string) => void;
  onOpenContactUs?: () => void;
}

export const QuotesPage: React.FC<QuotesPageProps> = ({
  quotes,
  onGoHome,
  onOpenNewRFQ,
  onUpdateQuoteStatus,
  onUpdateQuoteFull,
  onAddQuoteMessage,
}) => {
  // Always default to list view (activeQuoteId = null) so user sees all quotes in order first, clicking any opens the thread
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [requestDetailsExpanded, setRequestDetailsExpanded] = useState(false);
  const [questionPanelOpen, setQuestionPanelOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<BuyerQuoteEnquiry['status']>('quote_received');
  const [editCarrier, setEditCarrier] = useState('');
  const [editSlipId, setEditSlipId] = useState('');
  const [editOfferPricePerKg, setEditOfferPricePerKg] = useState<number>(0);
  const [editDeliveryWindow, setEditDeliveryWindow] = useState('');

  // Active Quote object
  const activeQuote = quotes.find((q) => q.id === activeQuoteId) || null;

  const handleOpenTrackingModal = () => {
    if (!activeQuote) return;
    setEditStatus(activeQuote.status);
    setEditCarrier(activeQuote.timeline?.trackingCarrier || '');
    setEditSlipId(activeQuote.timeline?.containerSlipId || '');
    setEditOfferPricePerKg(activeQuote.offer?.pricePerKg || (activeQuote.offer?.pricePerTon ? Math.round(activeQuote.offer.pricePerTon / 1000) : 45));
    setEditDeliveryWindow(activeQuote.offer?.deliveryWindow || '3–5 Business Days');
    setTrackingModalOpen(true);
  };

  const handleSaveTrackingUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuote) return;

    const nowFormatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date());

    const updatedTimeline = {
      ...(activeQuote.timeline || { quoteReceivedAt: activeQuote.requestDate }),
      trackingCarrier: editCarrier.trim() || undefined,
      containerSlipId: editSlipId.trim() || undefined,
    };

    if (editStatus === 'sourcing' && !updatedTimeline.sourcingStartedAt) {
      updatedTimeline.sourcingStartedAt = nowFormatted;
    } else if (editStatus === 'offer_ready' && !updatedTimeline.offerConfirmedAt) {
      updatedTimeline.offerConfirmedAt = nowFormatted;
    } else if (editStatus === 'confirmed' && !updatedTimeline.offerConfirmedAt) {
      updatedTimeline.offerConfirmedAt = nowFormatted;
    } else if (editStatus === 'in_transit' && !updatedTimeline.inTransitAt) {
      updatedTimeline.inTransitAt = nowFormatted;
    } else if (editStatus === 'delivered' && !updatedTimeline.deliveredAt) {
      updatedTimeline.deliveredAt = nowFormatted;
    }

    const qty = activeQuote.quantityKg || (activeQuote.quantityTons ? activeQuote.quantityTons * 1000 : 500);
    const updatedOffer = (editStatus !== 'quote_received' && editStatus !== 'sourcing')
      ? {
          pricePerKg: editOfferPricePerKg || 45,
          pricePerTon: (editOfferPricePerKg || 45) * 1000,
          totalAmount: (editOfferPricePerKg || 45) * qty,
          deliveryWindow: editDeliveryWindow || '3–5 Business Days (Guaranteed Dispatch)',
          batchPhoto: activeQuote.offer?.batchPhoto || activeQuote.productImage || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
          aiGradeReport: activeQuote.offer?.aiGradeReport || {
            purityScore: 98.5,
            spectrographicSummary: 'LiDAR laser scan + digital assay verified.',
            densityRating: 'High-Density Industrial Bulk Lot',
            verifiedDate: activeQuote.requestDate,
          },
          supplierName: activeQuote.offer?.supplierName || 'Verified Partner Yard',
          supplierOrigin: activeQuote.offer?.supplierOrigin || activeQuote.deliveryLocation,
        }
      : activeQuote.offer;

    if (onUpdateQuoteFull) {
      onUpdateQuoteFull(activeQuote.id, {
        status: editStatus,
        timeline: updatedTimeline,
        offer: updatedOffer,
      });
    } else if (onUpdateQuoteStatus) {
      onUpdateQuoteStatus(activeQuote.id, editStatus);
      activeQuote.timeline = updatedTimeline;
      if (updatedOffer) activeQuote.offer = updatedOffer;
    }

    setTrackingModalOpen(false);
  };

  // Status Badge Pill Styling (Exact User Spec)
  // Gray = Quote Received, Teal outline = Sourcing, Solid Teal = Offer Ready, Solid Navy = Confirmed/In Transit, Navy with checkmark = Delivered
  const getStatusPill = (status: BuyerQuoteEnquiry['status']) => {
    switch (status) {
      case 'quote_received':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Quote Received
          </span>
        );
      case 'sourcing':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-transparent text-[#0ea5e9] border border-[#0ea5e9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mr-1.5 animate-pulse" />
            Sourcing in Progress
          </span>
        );
      case 'offer_ready':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0ea5e9] text-white shadow-2xs">
            Offer Ready
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-2xs">
            <Check className="w-3.5 h-3.5 mr-1 text-white" />
            Confirmed
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0284c7] text-white shadow-2xs">
            <Truck className="w-3.5 h-3.5 mr-1 text-white" />
            In Transit
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0f1115] text-emerald-400 border border-emerald-500/30">
            <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Quote Received
          </span>
        );
    }
  };

  const handleSendQuestion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newQuestionText.trim() || !activeQuote) return;

    if (onAddQuoteMessage) {
      onAddQuoteMessage(activeQuote.id, newQuestionText.trim());
    } else {
      // Local fallback
      const msg: QuoteMessage = {
        id: `msg-${Date.now()}`,
        sender: 'buyer',
        text: newQuestionText.trim(),
        timestamp: 'Just now',
      };
      if (!activeQuote.messages) activeQuote.messages = [];
      activeQuote.messages.push(msg);
    }
    setNewQuestionText('');
  };

  const handleConfirmOrder = () => {
    if (!activeQuote) return;
    if (onUpdateQuoteStatus) {
      onUpdateQuoteStatus(activeQuote.id, 'confirmed');
    } else {
      activeQuote.status = 'confirmed';
      if (!activeQuote.timeline) {
        activeQuote.timeline = {
          quoteReceivedAt: activeQuote.requestDate,
          sourcingStartedAt: 'Today, 10:15 AM',
          offerConfirmedAt: 'Just now',
        };
      }
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // =========================================================================
  // 0. MY QUOTES (LIST VIEW) — ENTRY POINT
  // =========================================================================
  if (!activeQuoteId || !activeQuote) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] pt-24 sm:pt-28 pb-24 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* List Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                <button onClick={onGoHome} className="hover:underline hover:text-slate-700 cursor-pointer">
                  Marketplace
                </button>
                <span>/</span>
                <span className="text-slate-700 font-semibold">Buyer Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1115]">
                My Orders
              </h1>
            </div>

            <button
              onClick={() => onOpenNewRFQ()}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 shadow-[0_4px_14px_rgba(14,165,233,0.3)] cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>New Order</span>
            </button>
          </div>

          {/* Empty State vs Simple Vertical List */}
          {quotes.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7" />
              </div>
              {/* Exact user requested copy */}
              <h3 className="text-base font-bold text-[#0f1115]">
                You haven't placed an order yet.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Browse materials to get started.
              </p>
              <button
                onClick={onGoHome}
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-[0_4px_14px_rgba(14,165,233,0.3)] active:scale-98"
              >
                Browse Materials
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setActiveQuoteId(q.id)}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-[#0ea5e9] shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-center space-x-3.5">
                    {q.productImage ? (
                      <img
                        src={q.productImage}
                        alt={q.materialName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}

                    <div>
                      {/* Format: "[Material] — [Quantity] · [Status pill] · [Date]" */}
                      <div className="text-sm sm:text-base font-bold text-[#0f1115] group-hover:text-[#0284c7] transition-colors">
                        {q.materialName} — {(q.quantityKg || (q.quantityTons ? q.quantityTons * 1000 : 500)).toLocaleString('en-IN')} kg
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Ref: <span className="font-mono text-slate-700">{q.orderNumber}</span> · {q.deliveryLocation} · {q.requestDate}
                      </div>
                    </div>
                  </div>

                  {/* Status Pill on the Right */}
                  <div className="flex items-center justify-between sm:justify-end space-x-3 self-start sm:self-center">
                    {getStatusPill(q.status)}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#0284c7] transition-all hidden sm:block" />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    );
  }

  // =========================================================================
  // SINGLE EVOLVING "QUOTE THREAD" PAGE (/quotes/[id])
  // =========================================================================
  const isStageOfferOrHigher = activeQuote.status === 'offer_ready' || activeQuote.status === 'confirmed' || activeQuote.status === 'in_transit' || activeQuote.status === 'delivered';
  const isStageConfirmedOrHigher = activeQuote.status === 'confirmed' || activeQuote.status === 'in_transit' || activeQuote.status === 'delivered';

  const activeQtyKg = activeQuote.quantityKg || (activeQuote.quantityTons ? activeQuote.quantityTons * 1000 : 500);
  const unitPrice = activeQuote.offer?.pricePerKg || (activeQuote.offer?.pricePerTon ? Math.round(activeQuote.offer.pricePerTon / 1000) : 42);
  const subtotal = activeQuote.offer?.totalAmount || (unitPrice * activeQtyKg);
  const gstEstimated = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gstEstimated;

  const getStepIndex = (status: BuyerQuoteEnquiry['status']) => {
    switch (status) {
      case 'quote_received': return 0;
      case 'sourcing': return 1;
      case 'offer_ready': return 2;
      case 'confirmed': return 3;
      case 'in_transit': return 4;
      case 'delivered': return 5;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(activeQuote.status);

  const timelineSteps = [
    { 
      id: 'quote_received', 
      label: 'Quote Received', 
      icon: Clock, 
      time: activeQuote.timeline?.quoteReceivedAt || activeQuote.requestDate 
    },
    { 
      id: 'sourcing', 
      label: 'Sourcing', 
      icon: Search, 
      time: activeQuote.timeline?.sourcingStartedAt || (currentStepIdx >= 1 ? 'Under Sourcing Review' : 'Pending') 
    },
    { 
      id: 'offer_ready', 
      label: 'Offer Ready', 
      icon: FileText, 
      time: activeQuote.timeline?.offerConfirmedAt || (currentStepIdx >= 2 ? 'Price & Assay Verified' : 'Awaiting Supplier Offer') 
    },
    { 
      id: 'confirmed', 
      label: 'Confirmed', 
      icon: CheckCircle2, 
      time: activeQuote.timeline?.offerConfirmedAt || (currentStepIdx >= 3 ? 'Order Locked' : 'Pending Confirmation') 
    },
    { 
      id: 'in_transit', 
      label: 'In Transit', 
      icon: Truck, 
      time: activeQuote.timeline?.inTransitAt || (currentStepIdx >= 4 ? 'Dispatched' : 'Awaiting Dispatch') 
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: PackageCheck, 
      time: activeQuote.timeline?.deliveredAt || (currentStepIdx >= 5 ? 'Verified at Plant Gate' : 'Pending Delivery') 
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 sm:pt-28 pb-32 text-slate-900 selection:bg-sky-500/15 selection:text-[#0284c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ======================================================================= */}
        {/* 1. PAGE HEADER (Persistent Across All Stages)                           */}
        {/* ======================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb with Back button */}
          <div className="flex items-center space-x-2.5 text-[13px] text-slate-500 min-w-0">
            <button
              onClick={() => setActiveQuoteId(null)}
              className="flex items-center space-x-1.5 font-bold text-[#0f1115] hover:text-[#0ea5e9] bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>All Quotes</span>
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate">
              {activeQuote.materialName} Quote #{activeQuote.orderNumber}
            </span>
          </div>

          {/* Persistent Actions & Live Status Pill */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <button
              onClick={handleOpenTrackingModal}
              className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-[#0284c7] hover:bg-sky-100 transition-all active:scale-95 cursor-pointer shadow-2xs text-xs font-semibold flex items-center space-x-1.5"
              title="Update status, offer or tracking details"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Update Status & Tracking</span>
            </button>
            <button
              onClick={() => setShareModalOpen(true)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-black hover:bg-slate-100 transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Share with a colleague"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {getStatusPill(activeQuote.status)}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. HORIZONTAL STEP TRACKER (DESKTOP) / VERTICAL (MOBILE)                */}
        {/* Quote Received → Sourcing → Offer Ready → Confirmed → In Transit → Delivered */}
        {/* ======================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
          {/* Desktop Horizontal Tracker */}
          <div className="hidden md:flex items-center justify-between relative">
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 -z-0" />
            <div
              className="absolute top-5 left-8 h-0.5 bg-[#0ea5e9] transition-all duration-500 -z-0"
              style={{ width: `${(currentStepIdx / (timelineSteps.length - 1)) * 100}%` }}
            />

            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isPassed = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isPassed
                        ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white'
                        : isCurrent
                        ? 'bg-white border-[#0ea5e9] text-[#0ea5e9] ring-4 ring-sky-100 shadow-sm'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {isPassed ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2.5 whitespace-nowrap ${
                      isCurrent ? 'text-[#0ea5e9]' : isPassed ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{step.time}</span>
                </div>
              );
            })}
          </div>

          {/* Mobile Vertical Tracker */}
          <div className="md:hidden space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isPassed = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.id} className="relative">
                  <div
                    className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 transition-all ${
                      isPassed
                        ? 'bg-[#0ea5e9] border-[#0ea5e9]'
                        : isCurrent
                        ? 'bg-white border-[#0ea5e9] ring-4 ring-sky-100'
                        : 'bg-white border-slate-300'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isCurrent ? 'text-[#0ea5e9]' : isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-slate-400">{step.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* MAIN ALIBABA SPLIT LAYOUT: ORDER SUMMARY TABLE + STICKY RIGHT PANEL     */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ===================================================================== */}
          {/* LEFT: STRUCTURED ORDER SUMMARY TABLE (INVOICE LINE-ITEM STYLE)         */}
          {/* ===================================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Request Summary Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Original RFQ Specification
                </span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {activeQtyKg.toLocaleString('en-IN')} kg {activeQuote.materialName} · {activeQuote.deliveryLocation}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Date: {activeQuote.requestDate}
              </span>
            </div>

            {/* Quote Received initial banner if awaiting sourcing */}
            {activeQuote.status === 'quote_received' && (
              <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Quote Request Received & Under Metallurgical Desk Review
                    </h3>
                    <button
                      onClick={handleOpenTrackingModal}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0ea5e9] hover:text-[#0284c7] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Status</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Your request for {activeQtyKg.toLocaleString('en-IN')} kg of {activeQuote.materialName} has been logged. Our logistics and verification desk is checking accredited supplier yards near {activeQuote.deliveryLocation}.
                  </p>
                </div>
              </div>
            )}

            {/* Sourcing in progress banner if not yet offer ready */}
            {activeQuote.status === 'sourcing' && (
              <div className="bg-gradient-to-r from-sky-50 to-white rounded-2xl p-6 border border-sky-200 flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#0ea5e9] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Sourcing & Supplier Coordination in Progress
                    </h3>
                    <button
                      onClick={handleOpenTrackingModal}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0ea5e9] hover:text-[#0284c7] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Status</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We are confirming stock availability and calculating road freight logistics to {activeQuote.deliveryLocation}. Your itemized order offer will appear below once verified.
                  </p>
                </div>
              </div>
            )}

            {/* Structured Order Summary Table (Invoice Line-Item Style) */}
            {isStageOfferOrHigher && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Order Summary & Proforma Invoice
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Itemized proforma breakdown for Order #{activeQuote.orderNumber}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Supplier Allocated
                  </span>
                </div>

                {/* Structured Invoice Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">Material Item</th>
                        <th className="py-3.5 px-4 text-center">Quantity</th>
                        <th className="py-3.5 px-4 text-right">Unit Price</th>
                        <th className="py-3.5 px-5 text-right">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              <img
                                src={activeQuote.offer?.batchPhoto || activeQuote.productImage || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'}
                                alt={activeQuote.materialName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{activeQuote.materialName}</div>
                              <div className="text-xs text-slate-500 mt-0.5">Origin: {activeQuote.deliveryLocation}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-slate-800">
                          {activeQtyKg.toLocaleString('en-IN')} kg
                        </td>
                        <td className="py-4 px-4 text-right font-medium text-slate-800">
                          ₹{unitPrice.toLocaleString('en-IN')}/kg
                        </td>
                        <td className="py-4 px-5 text-right font-bold text-slate-900">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Key Order Attributes Table */}
                <div className="border-t border-slate-200 p-5 bg-slate-50/30 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">
                        Delivery Destination
                      </span>
                      <strong className="text-slate-900 text-sm">{activeQuote.deliveryLocation}</strong>
                      <span className="text-slate-500 block text-xs mt-0.5">Direct mill gate dispatch via weighbridge</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">
                        Delivery Window
                      </span>
                      <strong className="text-slate-900 text-sm">
                        {activeQuote.offer?.deliveryWindow || '3–5 Business Days'}
                      </strong>
                      <span className="text-slate-500 block text-xs mt-0.5">Guaranteed schedule with live GPS container slip</span>
                    </div>
                  </div>

                  {/* Financial Breakdown Rows */}
                  <div className="max-w-xs ml-auto space-y-2 pt-3 border-t border-slate-200 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({activeQtyKg.toLocaleString('en-IN')} kg):</span>
                      <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST (18% Reverse Charge):</span>
                      <span className="font-semibold text-slate-900">₹{gstEstimated.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Escrow Trade Protection:</span>
                      <span className="font-semibold text-emerald-600">FREE (Covered)</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Landed Cost:</span>
                      <span className="text-[#0ea5e9]">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tracking Status Card (Real User-Updated Data) */}
            {isStageConfirmedOrHigher && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-5 h-5 text-[#0ea5e9]" />
                    <h3 className="font-bold text-slate-900 text-base">Shipment & Weighbridge Status</h3>
                  </div>
                  <button
                    onClick={handleOpenTrackingModal}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-[#0ea5e9] hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update Tracking</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Carrier</span>
                    <strong className="text-slate-800 text-xs">
                      {activeQuote.timeline?.trackingCarrier || 'Awaiting dispatch booking'}
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Weighbridge Slip</span>
                    <strong className="text-slate-800 text-xs font-mono">
                      {activeQuote.timeline?.containerSlipId || 'Generated upon gate-in'}
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Order Stage</span>
                    <strong className="text-emerald-700 text-xs capitalize">
                      {activeQuote.status.replace('_', ' ')}
                    </strong>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ===================================================================== */}
          {/* RIGHT: STICKY DESKTOP PANEL                                           */}
          {/* Guarantee Badge + Confirm Order Button + Ask a Question Thread        */}
          {/* ===================================================================== */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            
            {/* Action Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Total Payable
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-[#0f1115] mt-0.5">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-slate-500 block mt-0.5">
                  For {activeQtyKg.toLocaleString('en-IN')} kg {activeQuote.materialName}
                </span>
              </div>

              {/* Confirm Order CTA */}
              {activeQuote.status === 'offer_ready' ? (
                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-all shadow-[0_8px_20px_rgba(14,165,233,0.3)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirm Order & Lock Price</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : isStageConfirmedOrHigher ? (
                <div className="w-full bg-emerald-600 text-white rounded-xl py-3.5 px-4 text-center font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(5,150,105,0.3)]">
                  <Check className="w-4 h-4 text-white" />
                  <span>Order Confirmed & Locked</span>
                </div>
              ) : activeQuote.status === 'quote_received' ? (
                <div className="w-full bg-slate-100 text-slate-600 rounded-xl py-3 px-4 text-center font-medium text-xs">
                  Reviewing Yard Inventory…
                </div>
              ) : (
                <div className="w-full bg-slate-100 text-slate-500 rounded-xl py-3 px-4 text-center font-medium text-xs">
                  Sourcing in Progress…
                </div>
              )}

              {/* Escrow Guarantee Badge */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">100% Escrow Guarantee</span>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Funds are held securely in trade escrow and released only after weighbridge verification at your plant gate.
                  </p>
                </div>
              </div>
            </div>

            {/* Persistent Question Thread Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0ea5e9]" />
                  <span className="font-bold text-slate-900 text-xs">Direct Supplier & Yard Desk</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {(activeQuote.messages || []).length} msgs
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* Messages View */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {(activeQuote.messages && activeQuote.messages.length > 0) ? (
                    activeQuote.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                            msg.sender === 'buyer'
                              ? 'bg-[#0ea5e9] text-white'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <div>{msg.text}</div>
                          <div className={`text-[9px] mt-1 text-right font-mono ${msg.sender === 'buyer' ? 'text-white/70' : 'text-slate-400'}`}>
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl text-center text-slate-400 text-xs">
                      No messages yet. Send a direct inquiry to our dispatch team below.
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendQuestion} className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ask about delivery, timing, etc…"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#0ea5e9] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newQuestionText.trim()}
                    className="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:opacity-40 text-white p-2 rounded-xl text-xs transition-all cursor-pointer shrink-0 shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>

        {/* Share Modal */}
        {shareModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Share with a colleague</h3>
                    <p className="text-[11px] text-slate-500">Private quote link</p>
                  </div>
                </div>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/quotes/${activeQuote.id}`}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600 outline-none truncate"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    {copiedLink ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real Status & Tracking Manager Modal */}
        {trackingModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Manage Quote & Tracking</h3>
                    <p className="text-xs text-slate-500">Update real-time status, pricing, and carrier dispatch</p>
                  </div>
                </div>
                <button
                  onClick={() => setTrackingModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveTrackingUpdate} className="mt-5 space-y-4 text-xs">
                {/* Status Dropdown */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                    Quote Workflow Stage
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#0ea5e9] cursor-pointer"
                  >
                    <option value="quote_received">1. Quote Received (Under Review)</option>
                    <option value="sourcing">2. Sourcing in Progress (Checking Yard Stock)</option>
                    <option value="offer_ready">3. Offer Ready (Itemized Pricing Available)</option>
                    <option value="confirmed">4. Confirmed (Buyer Locked Order)</option>
                    <option value="in_transit">5. In Transit (Truck / Container Dispatched)</option>
                    <option value="delivered">6. Delivered (Weighbridge Gate-In Verified)</option>
                  </select>
                </div>

                {/* Offer Price if Offer Ready or higher */}
                {(editStatus !== 'quote_received' && editStatus !== 'sourcing') && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#0ea5e9]" />
                      <span>Offer Pricing & Delivery Schedule</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">
                          Offered Price (₹ / kg)
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="0.5"
                          value={editOfferPricePerKg || ''}
                          onChange={(e) => setEditOfferPricePerKg(parseFloat(e.target.value) || 0)}
                          placeholder="e.g. 45"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0ea5e9]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">
                          Delivery Window
                        </label>
                        <input
                          type="text"
                          value={editDeliveryWindow}
                          onChange={(e) => setEditDeliveryWindow(e.target.value)}
                          placeholder="e.g. 3–5 Business Days"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0ea5e9]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tracking Details */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0ea5e9]" />
                    <span>Real Logistics & Carrier Dispatch</span>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      Carrier / Freight Transporter Name
                    </label>
                    <input
                      type="text"
                      value={editCarrier}
                      onChange={(e) => setEditCarrier(e.target.value)}
                      placeholder="e.g. CONCOR Rail Freight, Spot Fleet Truck #KA-01-AB-1234"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0ea5e9]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      Weighbridge Slip / E-Way Bill Number
                    </label>
                    <input
                      type="text"
                      value={editSlipId}
                      onChange={(e) => setEditSlipId(e.target.value)}
                      placeholder="e.g. WB-84920, EWB-1948201"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0ea5e9]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setTrackingModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_4px_14px_rgba(14,165,233,0.3)] active:scale-98 cursor-pointer"
                  >
                    Save & Apply Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
