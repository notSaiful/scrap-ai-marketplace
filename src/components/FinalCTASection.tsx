import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenRFQ?: () => void;
  onExploreLots?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenRFQ,
  onExploreLots,
}) => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-white border-t border-black/[0.06]">
      {/* Background ambient light gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-4 uppercase tracking-wider bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
          <span>Get Started with WasteMarket</span>
        </div>

        {/* Exact User Requested Header */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f1115] mb-4">
          Ready to Buy Without the Guesswork?
        </h2>

        {/* Exact User Requested Subtext */}
        <p className="text-base sm:text-xl text-[#495057] font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          Get your first AI-graded quote in under a minute.
        </p>

        {/* Exact User Requested CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={onOpenRFQ}
            className="w-full sm:w-auto bg-[#0f1115] hover:bg-[#0284c7] text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-xl transition-all shadow-[0_8px_25px_rgba(15,17,21,0.25)] hover:shadow-[0_12px_30px_rgba(2,132,199,0.35)] flex items-center justify-center space-x-2.5 active:scale-98 cursor-pointer group"
          >
            <span>Get Your Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {onExploreLots && (
            <button
              onClick={onExploreLots}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm sm:text-base px-7 py-4 rounded-xl transition-all active:scale-98 cursor-pointer"
            >
              Explore Live Inventory
            </button>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Escrow Protected</span>
          </div>
          <span>•</span>
          <div>Zero commitment required</div>
          <span>•</span>
          <div>Instant AI spec match</div>
        </div>
      </div>
    </section>
  );
};
