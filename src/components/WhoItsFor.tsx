import React from 'react';
import { Factory, TrendingUp, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WhoItsForProps {
  onOpenRFQ?: () => void;
  onExploreCatalog?: () => void;
}

export const WhoItsFor: React.FC<WhoItsForProps> = ({ onOpenRFQ, onExploreCatalog }) => {
  const targetSegments = [
    {
      title: 'Manufacturers',
      subtitle: 'Foundries & Production Plants',
      description:
        'Get consistent, bulk scrap delivered straight to your plant with guaranteed quality and zero surprises on arrival.',
      icon: Factory,
      highlight: 'Direct Delivery',
      benefits: [
        'Guaranteed material grade & weight',
        'Predictable, scheduled bulk supply',
        'Direct mill delivery with full paperwork',
      ],
    },
    {
      title: 'Traders',
      subtitle: 'Stockists & Regional Dealers',
      description:
        'Access reliable inventory with transparent pricing, clear material photos, and complete tracking from loading to delivery.',
      icon: TrendingUp,
      highlight: 'Transparent Pricing',
      benefits: [
        'Clear, fixed upfront prices per ton',
        'Live transit & truck dispatch tracking',
        'Safe, protected payment terms',
      ],
    },
    {
      title: 'Processors',
      subtitle: 'Shredders & Recyclers',
      description:
        'Source clean, segregated materials ready for immediate processing so your machinery runs without downtime or sorting delays.',
      icon: Cpu,
      highlight: 'Sorted Materials',
      benefits: [
        'Clean, pre-inspected bulk lots',
        'No foreign contaminants or bad loads',
        'Fast quotes and quick order turnaround',
      ],
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
            const isManufacturer = idx === 0;
            const isTrader = idx === 1;

            if (isManufacturer || isTrader) {
              const bgImg = isManufacturer ? '/manufacturing-bg.jpg' : '/traders-bg.jpg';
              const imgAlt = isManufacturer
                ? 'Scrap claw crane lifting metal scrap at yard'
                : 'Scrap yard inventory warehouse with scrap wiring and auto parts';

              return (
                <div
                  key={idx}
                  className="relative rounded-3xl p-7 sm:p-8 border border-slate-700/50 shadow-[0_12px_36px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all flex flex-col justify-between group overflow-hidden"
                >
                  {/* Background Image with Dark Industrial Gradients */}
                  <img
                    src={bgImg}
                    alt={imgAlt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  {/* Multi-layer Dark Gradient for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-900/60 pointer-events-none" />
                  <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-[#0ea5e9] transition-all shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#38bdf8] bg-sky-950/80 backdrop-blur-md border border-sky-400/30 px-2.5 py-1 rounded-full">
                        {seg.highlight}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                      {seg.title}
                    </h3>
                    <div className="text-xs text-[#38bdf8] font-semibold mb-3">
                      {seg.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-normal">
                      {seg.description}
                    </p>

                    {/* Feature Checklist */}
                    <ul className="space-y-2 mb-6 pt-4 border-t border-white/15">
                      {seg.benefits.map((b, bi) => (
                        <li key={bi} className="flex items-center text-xs text-slate-100 gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action */}
                  <div className="relative z-10">
                    <button
                      onClick={onOpenRFQ}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer group/btn active:scale-98"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            }

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
                  <span>Get a Quote</span>
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
