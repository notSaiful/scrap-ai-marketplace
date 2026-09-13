import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  ShieldCheck,
  Search,
  Plus,
  ExternalLink,
  Download,
  AlertCircle,
  Building2,
  MapPin,
  ChevronRight,
  Filter,
} from 'lucide-react';

export interface BuyerQuoteEnquiry {
  id: string;
  orderNumber: string;
  requestTitle: string; // e.g. "Requested: 5 tons Steel Scrap, Grade A · May 14, 2026"
  materialName: string;
  grade: string;
  quantityTons: number;
  requestDate: string;
  targetPricePerTon: number;
  totalEstimatedAmount: number;
  destinationPort: string;
  incoterm: string;
  supplierName: string;
  supplierOrigin: string;
  productImage?: string;
  status: 'sourcing' | 'confirmed' | 'in_transit' | 'delivered';
  statusSteps: {
    sourcing: { date: string; details: string; done: boolean };
    confirmed: { date: string; details: string; done: boolean };
    inTransit: { date: string; details: string; done: boolean };
    delivered: { date: string; details: string; done: boolean };
  };
  orderConfirmation: {
    orderId: string;
    confirmedAt: string;
    escrowStatus: 'Razorpay Escrow Funded' | 'Milestone Locked' | 'Disbursed to Yard';
    escrowNodeId: string;
    assayReportId: string;
    assayPurity: string;
    weighbridgeSlipNumber?: string;
    carrier?: string;
    containerNumber?: string;
    eta?: string;
  };
  buyerNotes?: string;
}

interface QuotesPageProps {
  quotes: BuyerQuoteEnquiry[];
  onGoHome: () => void;
  onOpenNewRFQ: () => void;
  onOpenContactUs?: () => void;
}

const STATUS_STEPS = [
  { key: 'sourcing', label: 'Sourcing', icon: Search, desc: 'Yard lot allocation & spectrographic check' },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2, desc: 'Razorpay Escrow locked & booking confirmed' },
  { key: 'in_transit', label: 'In Transit', icon: Truck, desc: 'Container sealed, electronic weighbridge verified' },
  { key: 'delivered', label: 'Delivered', icon: PackageCheck, desc: 'Destination clearance & escrow settled' },
] as const;

export const QuotesPage: React.FC<QuotesPageProps> = ({
  quotes,
  onGoHome,
  onOpenNewRFQ,
  onOpenContactUs,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'sourcing' | 'confirmed' | 'in_transit' | 'delivered'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredQuotes = quotes.filter((q) => {
    if (filterStatus !== 'all' && q.status !== filterStatus) return false;
    if (searchFilter.trim()) {
      const query = searchFilter.toLowerCase();
      const matchesTitle = q.requestTitle.toLowerCase().includes(query);
      const matchesMaterial = q.materialName.toLowerCase().includes(query);
      const matchesOrder = q.orderConfirmation.orderId.toLowerCase().includes(query);
      return matchesTitle || matchesMaterial || matchesOrder;
    }
    return true;
  });

  const getStepIndex = (status: 'sourcing' | 'confirmed' | 'in_transit' | 'delivered') => {
    if (status === 'sourcing') return 0;
    if (status === 'confirmed') return 1;
    if (status === 'in_transit') return 2;
    if (status === 'delivered') return 3;
    return 0;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 sm:pt-28 pb-20 selection:bg-sky-500/15 selection:text-[#0284c7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-[#86868b]">
          <div className="flex items-center space-x-2">
            <button
              onClick={onGoHome}
              className="hover:text-[#0f1115] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Marketplace</span>
            </button>
            <span>/</span>
            <span className="text-[#0f1115] font-semibold">Quotes & Orders</span>
          </div>

          <button
            onClick={onOpenNewRFQ}
            className="self-start sm:self-auto bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Request New Quote</span>
          </button>
        </div>

        {/* Page Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-1.5 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
            <span>Buyer Quote & Order Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1115] tracking-tight">
            My Quote Requests & Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your quote enquiries, order confirmations, and real-time delivery status: Sourcing → Confirmed → In Transit → Delivered.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
            {(['all', 'sourcing', 'confirmed', 'in_transit', 'delivered'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap capitalize ${
                  filterStatus === st
                    ? 'bg-[#0f1115] text-white shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {st === 'all' ? `All (${quotes.length})` : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by quote, lot or order #..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 outline-none transition-all"
            />
          </div>
        </div>

        {/* List of Quotes (All in one page for each quote enquiry) */}
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No quote requests found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              You haven't requested any quotes matching the selected filter.
            </p>
            <button
              onClick={onOpenNewRFQ}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Request a Custom Quote
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuotes.map((q) => {
              const currentStepIdx = getStepIndex(q.status);

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all overflow-hidden p-6 sm:p-7"
                >
                  {/* ========================================================= */}
                  {/* 1. QUOTE REQUEST MADE BY BUYER (Header)                    */}
                  {/* ========================================================= */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      {q.productImage ? (
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200/80 shrink-0 shadow-2xs bg-slate-100">
                          <img
                            src={q.productImage}
                            alt={q.materialName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-[#0284c7]">
                          <FileText className="w-7 h-7" />
                        </div>
                      )}

                      <div>
                        {/* Exact Requested Format Highlight */}
                        <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <span>{q.requestTitle}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                          <span>Lot: <strong className="text-slate-800 font-semibold">{q.materialName}</strong></span>
                          <span>•</span>
                          <span>Grade: <strong className="text-slate-800">{q.grade}</strong></span>
                          <span>•</span>
                          <span>Ref: <strong className="font-mono text-slate-700">{q.orderNumber}</strong></span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Supplier: <strong className="text-slate-600">{q.supplierName}</strong> ({q.supplierOrigin})
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                          q.status === 'sourcing'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : q.status === 'confirmed'
                            ? 'bg-sky-50 text-[#0284c7] border-sky-200'
                            : q.status === 'in_transit'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {q.status === 'sourcing' && 'Stage: Sourcing'}
                        {q.status === 'confirmed' && 'Stage: Confirmed'}
                        {q.status === 'in_transit' && 'Stage: In Transit'}
                        {q.status === 'delivered' && 'Stage: Delivered'}
                      </span>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* 2. DELIVERY STATUS TRACKING: Sourcing → Confirmed → In Transit → Delivered */}
                  {/* ========================================================= */}
                  <div className="py-6">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <span>Delivery Status Progress:</span>
                      <span className="text-[#0284c7] font-semibold">
                        Sourcing → Confirmed → In Transit → Delivered
                      </span>
                    </div>

                    {/* Visual Stepper */}
                    <div className="relative">
                      {/* Background Bar */}
                      <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-slate-100 -z-0">
                        <div
                          className="h-full bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] transition-all duration-500"
                          style={{
                            width: `${(currentStepIdx / (STATUS_STEPS.length - 1)) * 100}%`,
                          }}
                        />
                      </div>

                      {/* 4 Steps */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                        {STATUS_STEPS.map((step, idx) => {
                          const isDone = idx < currentStepIdx;
                          const isCurrent = idx === currentStepIdx;
                          const isPending = idx > currentStepIdx;
                          const IconComp = step.icon;

                          return (
                            <div
                              key={step.key}
                              className={`flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 p-2 sm:p-0 rounded-2xl ${
                                isCurrent ? 'bg-sky-50/70 sm:bg-transparent' : ''
                              }`}
                            >
                              {/* Step Circle */}
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-2xs shrink-0 ${
                                  isDone
                                    ? 'bg-emerald-500 text-white'
                                    : isCurrent
                                    ? 'bg-[#0ea5e9] text-white ring-4 ring-sky-100 animate-pulse'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                ) : (
                                  <IconComp className="w-5 h-5" />
                                )}
                              </div>

                              {/* Label & Details */}
                              <div className="text-left sm:text-center">
                                <div
                                  className={`text-xs font-bold leading-tight ${
                                    isDone || isCurrent ? 'text-slate-900' : 'text-slate-400'
                                  }`}
                                >
                                  {step.label}
                                  {isCurrent && (
                                    <span className="ml-1.5 inline-block text-[10px] text-[#0284c7] bg-sky-100 px-1.5 py-0.2 rounded font-semibold">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-500 leading-tight mt-0.5 max-w-[170px] mx-auto">
                                  {step.desc}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* 3. ORDER CONFIRMATION & LOT FINANCIAL DETAILS             */}
                  {/* ========================================================= */}
                  <div className="pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-6 sm:p-7 rounded-b-3xl">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                      Order Confirmation & Commercial Terms
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      {/* Order Confirmation ID */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 text-[11px] block">Order Confirmation ID</span>
                        <strong className="font-mono text-slate-900 text-xs sm:text-sm font-bold">
                          {q.orderConfirmation.orderId}
                        </strong>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Booked: {q.orderConfirmation.confirmedAt}
                        </span>
                      </div>

                      {/* Escrow Status */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 text-[11px] block">Razorpay Escrow Status</span>
                        <strong className="text-emerald-700 text-xs sm:text-sm font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{q.orderConfirmation.escrowStatus}</span>
                        </strong>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Node: {q.orderConfirmation.escrowNodeId}
                        </span>
                      </div>

                      {/* Commercial Pricing */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 text-[11px] block">Contract Valuation</span>
                        <strong className="text-slate-900 text-xs sm:text-sm font-bold">
                          ${q.targetPricePerTon.toLocaleString()} / ton
                        </strong>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Total: ${(q.totalEstimatedAmount).toLocaleString()} ({q.quantityTons} Tons)
                        </span>
                      </div>

                      {/* Port & Logistics */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 text-[11px] block">Destination Logistics</span>
                        <strong className="text-slate-900 text-xs font-semibold truncate block">
                          {q.destinationPort}
                        </strong>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Incoterm: {q.incoterm}
                          {q.orderConfirmation.eta && ` • ETA: ${q.orderConfirmation.eta}`}
                        </span>
                      </div>
                    </div>

                    {/* Additional Tracking / Assay details bar */}
                    <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-3 border-t border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-[11px] bg-sky-50 text-[#0284c7] px-2.5 py-1 rounded-lg border border-sky-100 font-medium">
                          <span>XRF Assay:</span>
                          <strong>{q.orderConfirmation.assayPurity}</strong>
                          <span className="text-slate-400 font-mono">({q.orderConfirmation.assayReportId})</span>
                        </span>

                        {q.orderConfirmation.weighbridgeSlipNumber && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500">
                            <span>Weighbridge Slip:</span>
                            <strong className="font-mono text-slate-700">{q.orderConfirmation.weighbridgeSlipNumber}</strong>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {onOpenContactUs && (
                          <button
                            onClick={onOpenContactUs}
                            className="text-[11px] text-slate-600 hover:text-[#0284c7] hover:underline font-medium cursor-pointer"
                          >
                            Contact Escrow Desk
                          </button>
                        )}
                        <span className="text-slate-300">|</span>
                        <span className="text-[11px] text-slate-400">
                          Protected by Razorpay Nodal Escrow
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
