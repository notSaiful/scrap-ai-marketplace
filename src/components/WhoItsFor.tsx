import React from 'react';
import { Factory, TrendingUp, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WhoItsForProps {
  onOpenRFQ?: () => void;
  onExploreCatalog?: () => void;
}

export const WhoItsFor: React.FC<WhoItsForProps> = ({ onOpenRFQ, onExploreCatalog }) => {
  const targetSegments = [
    {
      title: 'Manufacturers & Smelters',
      subtitle: 'Foundries, Induction Furnaces & Extrusion Mills',
      description:
        'Secure high-tonnage furnace-ready charges with certified spectrographic assays, consistent chemistry, and zero tramp contamination.',
      icon: Factory,
      highlight: 'Direct Melt-Ready Charge',
      benefits: ['XRF-certified metallurgical purity', 'Reliable monthly contracted volume', 'Weighbridge & assay backed guarantee'],
    },
    {
      title: 'Scrap & Commodity Traders',
      subtitle: 'Importers, Exporters & Regional Stockists',
      description:
        'Lock transparent benchmark pricing and institutional container lots with full logistics milestones from load port to destination CFS gate.',
      icon: TrendingUp,
      highlight: 'Global Arbitrage & CIF Logistics',
      benefits: ['Transparent per-ton benchmark rates', 'Multi-seal GPS container tracking', 'Razorpay & LC Escrow protection'],
    },
    {
      title: 'Recyclers & Processors',
      subtitle: 'Granulators, Shredders & Pelletizers',
      description:
        'Source segregated raw bales and sorted industrial regrinds with verifiable moisture limits, density ratings, and low prohibitive limits.',
      icon: Cpu,
      highlight: 'Clean Segregated Feedstock',
      benefits: ['Zero sorting guesswork', 'Strict ISRI grading compliance', 'Rapid RFQ turnaround within 4 hours'],
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-[#F7F8FA] border-y border-black/[0.06] overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-3 uppercase tracking-wider bg-sky-100/70 border border-sky-200/80 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>Who It's For</span>
          </div>

          {/* Exact User Requested Copy */}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115] mb-3">
            Built for Businesses That Buy in Bulk
          </h2>
          <p className="text-sm sm:text-base text-[#495057] font-normal leading-relaxed max-w-2xl mx-auto">
            Manufacturers, traders, and processors who need reliable scrap supply — without the site visits, the haggling, or the guesswork.
          </p>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {targetSegments.map((seg, idx) => {
            const Icon = seg.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-black/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-sky-300/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center text-[#0284c7] group-hover:scale-105 group-hover:bg-[#0284c7] group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-6 h-6 transition-colors" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#0284c7] bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                      {seg.highlight}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f1115] tracking-tight mb-1">
                    {seg.title}
                  </h3>
                  <div className="text-xs text-[#0284c7] font-medium mb-3">
                    {seg.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#495057] leading-relaxed mb-6 font-normal">
                    {seg.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {seg.benefits.map((b, bi) => (
                      <li key={bi} className="flex items-center text-xs text-slate-600 gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <button
                  onClick={onOpenRFQ}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0284c7] hover:text-white text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all group/btn cursor-pointer"
                >
                  <span>Request Allocation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
