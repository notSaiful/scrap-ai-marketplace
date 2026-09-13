import React from 'react';
import { ScrapItem } from '../types/scrap';
import { ScrapRagResult } from '../types/rag';
import { ShieldCheck, Sparkles, Scale, Eye, CheckCircle2 } from 'lucide-react';

interface ScrapCardProps {
  item: ScrapItem;
  ragResult?: ScrapRagResult;
  onSelect: (item: ScrapItem) => void;
  onQuickRFQ: (item: ScrapItem) => void;
}

export const ScrapCard: React.FC<ScrapCardProps> = ({
  item,
  ragResult,
  onSelect,
  onQuickRFQ,
}) => {
  return (
    <div 
      onClick={() => onSelect(item)}
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
        ragResult && ragResult.rank === 1
          ? 'border-[#38bdf8] ring-2 ring-[#38bdf8]/25 shadow-[0_12px_30px_rgba(14,165,233,0.18)] hover:shadow-[0_22px_45px_-8px_rgba(14,165,233,0.28)] -translate-y-0.5'
          : 'border-[#dee2e6]/80 hover:border-[#38bdf8] shadow-xs hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1'
      }`}
    >
      {/* Product Image & Badges */}
      <div className="relative w-full h-52 bg-[#f8f9fa] overflow-hidden">
        <img
          src={item.primaryImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* AI Purity / RAG Match Badge Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {ragResult ? (
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-[0_2px_8px_rgba(14,165,233,0.4)] flex items-center gap-1.5 border border-white/30">
              <Sparkles className="w-3 h-3 text-white" />
              <span>{ragResult.matchPercentage}% AI Match</span>
            </span>
          ) : (
            <span className="bg-white/95 backdrop-blur-md text-[#0f1115] font-semibold text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1.5 border border-black/[0.06]">
              <Sparkles className="w-3 h-3 text-[#0ea5e9]" />
              {item.aiSpecs.purityScore}% Purity
            </span>
          )}

          {ragResult ? (
            <span className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-semibold text-[10px] px-2 py-0.5 rounded-full shadow-2xs">
              {ragResult.matchBadge}
            </span>
          ) : item.isHotDeal ? (
            <span className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-medium text-[10px] px-2 py-0.5 rounded-full shadow-2xs tracking-wide">
              Fast Dispatch
            </span>
          ) : null}
        </div>

        {/* ISRI Code Tag Top Right */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full shadow-2xs">
            {item.grade}
          </span>
        </div>

        {/* Quick View Indicator Overlay on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white/95 backdrop-blur-md text-[#0f1115] text-xs font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1 active:scale-95">
            <Eye className="w-3.5 h-3.5 text-[#0ea5e9]" /> View Specs
          </span>
        </div>
      </div>

      {/* Card Content Details (Marketly Style) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Row 1: Title & Price */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-bold text-sm text-[#0f1115] leading-snug line-clamp-1 group-hover:text-[#0ea5e9] transition-colors">
              {item.title}
            </h3>
            <span className="text-base font-bold text-[#0f1115] shrink-0">
              ${item.pricePerTon.toLocaleString()}
            </span>
          </div>

          {/* Row 2: Category & Unit */}
          <div className="flex items-center justify-between text-xs text-[#919eab] font-normal mb-2.5">
            <span className="truncate">{item.categoryName} • {item.origin.split(',')[0]}</span>
            <span className="shrink-0 text-[11px] font-medium text-[#495057]">/ MT</span>
          </div>

          {/* Optional AI Match Reason Pill */}
          {ragResult && ragResult.keyMatchReasons[0] && (
            <div className="mb-2.5 bg-gradient-to-r from-sky-50 to-blue-50/70 border border-sky-200/70 rounded-lg px-2 py-1 flex items-center gap-1.5 text-[11px] text-[#0284c7] font-medium truncate">
              <CheckCircle2 className="w-3 h-3 text-[#0ea5e9] shrink-0" />
              <span className="truncate">{ragResult.keyMatchReasons[0]}</span>
            </div>
          )}

          {/* Row 3: MOQ and Stock tags */}
          <div className="flex items-center space-x-2 text-[11px] text-[#495057] mb-3">
            <span className="bg-[#f8f9fa] border border-black/[0.05] rounded-md px-2 py-0.5 font-medium">
              Min: {item.moq} {item.moqUnit}
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-md px-2 py-0.5 font-medium">
              Stock: {item.availableStock} MT
            </span>
          </div>
        </div>

        {/* Supplier & Action Button Footer */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 truncate max-w-[60%]">
            <span className="text-sm">{item.supplier.flag}</span>
            <span className="text-[#0f1115] truncate font-medium text-xs">
              {item.supplier.name}
            </span>
            {item.supplier.isVerified && (
              <span title="Verified Yard">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0" />
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickRFQ(item);
            }}
            className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-[0_2px_10px_rgba(14,165,233,0.3)] transition-all active:scale-[0.98] whitespace-nowrap"
          >
            Get RFQ
          </button>
        </div>
      </div>
    </div>
  );
};
