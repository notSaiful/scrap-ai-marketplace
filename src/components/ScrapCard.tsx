import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrapItem } from '../types/scrap';
import { ScrapRagResult } from '../types/rag';
import { ShieldCheck, Sparkles, Scale, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const inrRate = Math.max(1, Math.round((item.pricePerTon * 83) / 1000));
  const moqKg = 10;
  const stockKg = item.availableStock * 1000;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(item)}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      whileTap={{ scale: 0.99 }}
      className={`spotlight-card group bg-white rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer ${
        ragResult && ragResult.rank === 1
          ? 'border-[#0ea5e9] ring-2 ring-[#0ea5e9]/20 shadow-[0_12px_32px_rgba(14,165,233,0.15)]'
          : 'border-black/[0.08] hover:border-[#0ea5e9]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Product Image & Badges */}
      <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
        <img
          src={item.primaryImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* AI Purity / RAG Match Badge Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {ragResult ? (
            <span className="bg-[#0ea5e9] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-white" />
              <span>{ragResult.matchPercentage}% Spec Match</span>
            </span>
          ) : (
            <span className="bg-white/95 backdrop-blur-md text-[#0f1115] font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1 border border-black/[0.06]">
              <Sparkles className="w-3 h-3 text-[#0ea5e9]" />
              {item.aiSpecs.purityScore}% Pure
            </span>
          )}

          {ragResult ? (
            <span className="bg-black/70 backdrop-blur-md text-white font-medium text-[10px] px-2 py-0.5 rounded-full">
              {ragResult.matchBadge}
            </span>
          ) : item.isHotDeal ? (
            <span className="bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full tracking-wide">
              Fast Dispatch
            </span>
          ) : null}
        </div>

        {/* ISRI Code Tag Top Right */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full shadow-2xs">
            {item.grade}
          </span>
        </div>

        {/* View Specs Floating Pill on Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-white/95 backdrop-blur-md text-[#0f1115] text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 active:scale-95">
            <Eye className="w-3 h-3 text-[#0ea5e9]" /> View Specs
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Row 1: Title & Price */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-bold text-sm text-[#0f1115] leading-snug line-clamp-1 group-hover:text-[#0ea5e9] transition-colors">
              {item.title}
            </h3>
            <span className="text-base font-extrabold text-[#0f1115] font-mono shrink-0">
              ₹{inrRate.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Row 2: Category & Unit */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-normal mb-2">
            <span className="truncate">{item.categoryName} • {item.origin.split(',')[0]}</span>
            <span className="shrink-0 text-[11px] font-semibold text-slate-700 font-mono">/ kg</span>
          </div>

          {/* AI Specification Badge */}
          <div className="flex items-center space-x-1.5 text-[10px] font-medium text-slate-600 bg-sky-50/80 border border-sky-100 rounded-md px-2 py-0.5 w-fit mb-2">
            <Sparkles className="w-3 h-3 text-[#0ea5e9] shrink-0" />
            <span className="truncate">{item.aiSpecs.verificationBadge}</span>
          </div>

          {/* Optional AI Match Reason Pill */}
          {ragResult && ragResult.keyMatchReasons[0] && (
            <div className="mb-2.5 bg-sky-50 border border-sky-100 rounded-xl px-2.5 py-1 flex items-center gap-1.5 text-[11px] text-[#0284c7] font-medium truncate">
              <CheckCircle2 className="w-3 h-3 text-[#0ea5e9] shrink-0" />
              <span className="truncate">{ragResult.keyMatchReasons[0]}</span>
            </div>
          )}

          {/* Row 3: MOQ and Stock tags */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-600 mb-2 font-mono">
            <span className="bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-0.5 font-medium">
              MOQ: {moqKg.toLocaleString('en-IN')} kg
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/70 rounded-lg px-2 py-0.5 font-medium">
              Stock: {stockKg.toLocaleString('en-IN')} kg
            </span>
          </div>
        </div>

        {/* Supplier & Action Button Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 truncate max-w-[55%]">
            <span className="text-sm">{item.supplier.flag}</span>
            <span className="text-slate-800 truncate font-semibold text-xs">
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
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(14,165,233,0.3)] transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            <span>Order</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
