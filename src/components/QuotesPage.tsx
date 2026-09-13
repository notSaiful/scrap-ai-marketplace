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
  requestTitle: string; // e.g. "Requested: 5 tons Steel Scrap, Grade A · Bengaluru · Sep 13"
  materialName: string; // e.g. "Steel Scrap"
  grade: 'Grade A' | 'Grade B' | 'Grade C' | string;
  quantityTons: number;
  deliveryLocation: string; // e.g. "Bengaluru, Karnataka"
  requestDate: string; // e.g. "Sep 13, 2026"
  referencePhoto?: string;
  productImage?: string;

  // Stage & Status:
  // "quote_received" | "sourcing" | "offer_ready" | "confirmed" | "in_transit" | "delivered"
  status: 'quote_received' | 'sourcing' | 'offer_ready' | 'confirmed' | 'in_transit' | 'delivered';

  // Offer Details (Stage 2)
  offer?: {
    pricePerTon: number; // e.g. 42000
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
  onAddQuoteMessage?: (quoteId: string, messageText: string) => void;
  onOpenContactUs?: () => void;
}

export const QuotesPage: React.FC<QuotesPageProps> = ({
  quotes,
  onGoHome,
  onOpenNewRFQ,
  onUpdateQuoteStatus,
  onAddQuoteMessage,
}) => {
  // If activeQuoteId is set, view single evolving quote thread (/quotes/[id]), otherwise list view
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(quotes.length > 0 ? quotes[0].id : null);
  const [requestDetailsExpanded, setRequestDetailsExpanded] = useState(false);
  const [questionPanelOpen, setQuestionPanelOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Active Quote object
  const activeQuote = quotes.find((q) => q.id === activeQuoteId) || null;

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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0f1115] text-white">
            Confirmed
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0f1115] text-white">
            <Truck className="w-3.5 h-3.5 mr-1 text-sky-400" />
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

      // Automated Team Reply simulation
      setTimeout(() => {
        if (activeQuote) {
          if (!activeQuote.messages) activeQuote.messages = [];
          activeQuote.messages.push({
            id: `reply-${Date.now()}`,
            sender: 'team',
            text: 'Thank you for your question. Our metallurgical verification desk is reviewing the yard assay details and will confirm within 15 minutes.',
            timestamp: 'Just now',
          });
          setNewQuestionText('');
        }
      }, 900);
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
                My Quotes
              </h1>
            </div>

            <button
              onClick={() => onOpenNewRFQ()}
              className="bg-[#0f1115] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 shadow-2xs cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>New Quote</span>
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
                You haven't requested a quote yet.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Browse materials to get started.
              </p>
              <button
                onClick={onGoHome}
                className="bg-[#0f1115] hover:bg-[#0284c7] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
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
                        {q.materialName} — {q.quantityTons} tons
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

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-24 sm:pt-28 pb-32 text-slate-900 selection:bg-sky-500/15 selection:text-[#0284c7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">

        {/* ======================================================================= */}
        {/* 1. PAGE HEADER (Persistent Across All Stages)                           */}
        {/* ======================================================================= */}
        <div className="sticky top-20 z-20 bg-[#F7F8FA]/90 backdrop-blur-md py-3 border-b border-black/[0.05] flex items-center justify-between gap-4">
          
          {/* Breadcrumb: "My Quotes / Steel Scrap Quote #WM-1042" */}
          <div className="flex items-center space-x-2 text-[13px] text-slate-500 min-w-0">
            <button
              onClick={() => setActiveQuoteId(null)}
              className="hover:underline hover:text-slate-900 font-medium cursor-pointer shrink-0"
            >
              My Quotes
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate">
              {activeQuote.materialName} Quote #{activeQuote.orderNumber}
            </span>
          </div>

          {/* Persistent Actions & Live Status Pill */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Share with colleague icon button */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-black hover:bg-slate-50 transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Share with a colleague"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Live Status Pill pinned near top */}
            {getStatusPill(activeQuote.status)}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. STAGE 1 — REQUEST (Collapses to Summary Card)                       */}
        {/* ======================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all">
          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Quote Request Summary
              </div>
              {/* Collapsed format: "Requested: 5 tons Steel Scrap, Grade A · Bengaluru · Sep 13" */}
              <div className="text-sm sm:text-base font-bold text-[#0f1115]">
                Requested: {activeQuote.quantityTons} tons {activeQuote.materialName}, {activeQuote.grade} · {activeQuote.deliveryLocation} · {activeQuote.requestDate}
              </div>
              {/* Small link: "Edit request" (only available before sourcing begins) */}
              {activeQuote.status === 'quote_received' && (
                <button
                  onClick={() => onOpenNewRFQ(activeQuote.materialName)}
                  className="text-xs text-[#0ea5e9] hover:underline mt-1 font-medium cursor-pointer"
                >
                  Edit request
                </button>
              )}
            </div>

            {/* Collapse / Expand details button */}
            <button
              onClick={() => setRequestDetailsExpanded(!requestDetailsExpanded)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title={requestDetailsExpanded ? 'Collapse' : 'Expand full request details'}
            >
              {requestDetailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Request Details */}
          {requestDetailsExpanded && (
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-slate-400 block mb-0.5">Material:</span>
                <strong className="text-slate-800 font-semibold">{activeQuote.materialName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Quantity:</span>
                <strong className="text-slate-800 font-semibold">{activeQuote.quantityTons} Metric Tons</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Preferred Grade:</span>
                <strong className="text-slate-800 font-semibold">{activeQuote.grade}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Delivery Destination:</span>
                <strong className="text-slate-800 font-semibold">{activeQuote.deliveryLocation}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Sourcing in progress banner if stage 1 and not yet offer ready */}
        {activeQuote.status === 'sourcing' && (
          <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-white rounded-2xl p-6 border border-sky-200 flex items-start gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Sourcing & Spectrographic Inspection in Progress
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We are scanning yard batch spectrometer assays and calculating exact logistics rates for {activeQuote.deliveryLocation}. Your formal graded offer will be ready shortly.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 3. STAGE 2 — OFFER (Appears Once Sourced)                               */}
        {/* ======================================================================= */}
        {isStageOfferOrHigher && (
          <div
            className={`bg-white rounded-3xl border transition-all overflow-hidden ${
              activeQuote.status === 'offer_ready'
                ? 'border-[#0ea5e9]/50 ring-4 ring-sky-100 shadow-[0_12px_40px_rgba(14,165,233,0.12)]'
                : 'border-slate-200/90 shadow-2xs opacity-90'
            }`}
          >
            {/* Header: "Your Quote Is Ready" */}
            <div className="p-6 sm:p-7 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f1115]">
                  Your Quote Is Ready
                </h2>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start">
                  AI Inspected & Yard Allocated
                </span>
              </div>
              {/* Subheader: "Reviewed and graded by our AI — verified by our team." */}
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Reviewed and graded by our AI — verified by our team.
              </p>
            </div>

            {/* Real Batch Photo / 3D Scan Viewer at the Top of Offer Card (Large) */}
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
              <img
                src={
                  activeQuote.offer?.batchPhoto ||
                  activeQuote.productImage ||
                  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
                }
                alt={activeQuote.materialName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                Verified Lot #WM-L902
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full border border-white/20">
                3D LiDAR Surface & Spectrogram Verified
              </div>
            </div>

            {/* Section Labels: Material Details · AI Grade Report · Price · Delivery Window */}
            <div className="p-6 sm:p-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Material Details */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold uppercase">Material Details</div>
                  <div className="font-bold text-slate-900 text-sm">{activeQuote.materialName}</div>
                  <div className="text-slate-500 mt-0.5">{activeQuote.grade} · {activeQuote.quantityTons} Tons</div>
                </div>

                {/* 2. AI Grade Report */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold uppercase">AI Grade Report</div>
                  <div className="font-bold text-emerald-700 text-sm">
                    {activeQuote.offer?.aiGradeReport.purityScore || 98.6}% Purity
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {activeQuote.offer?.aiGradeReport.densityRating || 'High Density Charge'}
                  </div>
                </div>

                {/* 3. Price (Navy 24px medium weight) */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold uppercase">Price</div>
                  <div className="text-[24px] font-medium text-[#0f1115] leading-none">
                    ₹{(activeQuote.offer?.pricePerTon || 41500).toLocaleString('en-IN')}
                    <span className="text-xs text-slate-500 font-normal"> / ton</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-1">
                    Total: ₹{(activeQuote.offer?.totalAmount || 41500 * activeQuote.quantityTons).toLocaleString('en-IN')}
                  </div>
                </div>

                {/* 4. Delivery Window in gray 14px beneath */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold uppercase">Delivery Window</div>
                  <div className="text-[14px] text-slate-600 font-medium">
                    {activeQuote.offer?.deliveryWindow || '3–5 Business Days'}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    To {activeQuote.deliveryLocation}
                  </div>
                </div>
              </div>

              {/* Guarantee line in Teal with shield icon directly above Confirm Order */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-[#0ea5e9] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                  <span>
                    Backed by our Delivery Guarantee — if it doesn't match this grade, we make it right.
                  </span>
                </div>

                {/* Confirm Order CTA (solid Navy button) + Ask a Question link */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuestionPanelOpen(true)}
                    className="text-xs text-slate-600 hover:text-[#0f1115] underline cursor-pointer"
                  >
                    Ask a Question
                  </button>

                  {activeQuote.status === 'offer_ready' ? (
                    <button
                      onClick={handleConfirmOrder}
                      className="w-full sm:w-auto bg-[#0f1115] hover:bg-[#0284c7] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
                    >
                      Confirm Order
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Order Confirmed</span>
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 4. STAGE 3 — ORDER STATUS (Appears Once Confirmed)                      */}
        {/* ======================================================================= */}
        {isStageConfirmedOrHigher && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              {/* Header: "Track Your Order" */}
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f1115]">
                Track Your Order
              </h2>
              {/* Reassurance line */}
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                We'll notify you at every step — no need to check in.
              </p>
            </div>

            {/* Vertical timeline: Quote Received → Sourcing → Offer Confirmed → In Transit → Delivered */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {[
                {
                  id: 'quote_received',
                  label: 'Quote Received',
                  time: activeQuote.requestDate,
                  desc: 'Specification verified and entered into matching index.',
                },
                {
                  id: 'sourcing',
                  label: 'Sourcing & Grading Completed',
                  time: 'Sep 13, 10:15 AM',
                  desc: '3D LiDAR density mesh and XRF assay report generated.',
                },
                {
                  id: 'offer_confirmed',
                  label: 'Offer Confirmed',
                  time: 'Sep 13, 02:40 PM',
                  desc: 'Proforma locked. Escrow funds secured via Razorpay.',
                },
                {
                  id: 'in_transit',
                  label: 'In Transit',
                  time: activeQuote.status === 'in_transit' || activeQuote.status === 'delivered' ? 'Dispatched' : 'Pending dispatch',
                  desc: 'Electronic weighbridge slip verified and container sealed.',
                },
                {
                  id: 'delivered',
                  label: 'Delivered',
                  time: activeQuote.status === 'delivered' ? 'Completed' : 'Estimated 2 days',
                  desc: 'Destination CFS gate scan and digital weigh-in verified.',
                },
              ].map((stage, idx) => {
                const isCurrent = (activeQuote.status === 'confirmed' && stage.id === 'offer_confirmed') || activeQuote.status === stage.id;
                const isDone = (activeQuote.status === 'confirmed' && (stage.id === 'quote_received' || stage.id === 'sourcing')) || (activeQuote.status === 'in_transit' && stage.id !== 'delivered') || activeQuote.status === 'delivered';

                return (
                  <div key={stage.id} className="relative group">
                    {/* Dot on timeline: Filled Teal for done, hollow Navy outline for current, gray for upcoming */}
                    <div
                      className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 transition-all ${
                        isDone
                          ? 'bg-[#0ea5e9] border-[#0ea5e9]'
                          : isCurrent
                          ? 'bg-white border-[#0f1115] ring-4 ring-slate-100'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {isDone && <Check className="w-2.5 h-2.5 text-white mx-auto mt-0.5" />}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${isCurrent ? 'text-[#0f1115]' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                          {stage.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-semibold text-[#0ea5e9] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {stage.time}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {stage.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 5. ASK A QUESTION (Lightweight thread, persistent from Stage 2 onward)   */}
        {/* ======================================================================= */}
        {isStageOfferOrHigher && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
            <button
              onClick={() => setQuestionPanelOpen(!questionPanelOpen)}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f1115]">
                    Questions About This Order
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ask about grading, delivery timing, or anything else…
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>{(activeQuote.messages || []).length} messages</span>
                {questionPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {questionPanelOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4">
                {/* Message bubbles */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {(activeQuote.messages || [
                    {
                      id: 'default-welcome',
                      sender: 'team',
                      text: `Hello! Our metallurgical desk is actively managing order #${activeQuote.orderNumber}. Feel free to drop any questions about spectrography or freight.`,
                      timestamp: 'Today, 10:20 AM',
                    },
                  ]).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'team' && (
                        <div className="w-7 h-7 rounded-full bg-[#0f1115] text-white flex items-center justify-center text-[10px] font-bold mr-2 shrink-0 self-end mb-1">
                          WM
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          msg.sender === 'buyer'
                            ? 'bg-slate-100 text-slate-900 rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        <div>{msg.text}</div>
                        <div className="text-[10px] text-slate-400 mt-1 text-right font-mono">
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendQuestion} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ask about grading, delivery timing, or anything else…"
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newQuestionText.trim()}
                    className="bg-[#0f1115] hover:bg-[#0284c7] disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-2xs"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* 6. SHARE THIS QUOTE MODAL                                               */}
        {/* ======================================================================= */}
        {shareModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Share with a colleague</h3>
                    <p className="text-[11px] text-slate-500">
                      Anyone with this link can view (not edit) this quote.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Private Quote Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/quotes/${activeQuote.id}`}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600 outline-none truncate"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="bg-[#0f1115] hover:bg-[#0284c7] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
