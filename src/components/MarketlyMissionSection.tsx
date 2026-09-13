import React from 'react';
import { ShieldCheck, CheckCircle2, Tag, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface MarketlyMissionSectionProps {
  onOpenRFQ?: () => void;
  onExploreLots?: () => void;
}

export const MarketlyMissionSection: React.FC<MarketlyMissionSectionProps> = ({
  onOpenRFQ,
  onExploreLots,
}) => {
  const trustPillars = [
    {
      title: 'AI-Graded, Human-Verified',
      description:
        "Every batch is scanned and quality-checked before you ever see a quote, not after you've paid.",
      icon: Sparkles,
      tag: 'Verified Quality',
      accentColor: 'from-sky-500 to-blue-600',
    },
    {
      title: 'Delivery Guaranteed',
      description:
        "If what arrives doesn't match what was promised, we make it right. No disputes, no runaround.",
      icon: CheckCircle2,
      tag: 'Zero-Dispute Escrow',
      accentColor: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'One Fair Price',
      description:
        "No haggling, no hidden cuts. What you're quoted is what you pay.",
      icon: Tag,
      tag: 'Benchmark Pricing',
      accentColor: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Full Order Tracking',
      description:
        'Know exactly where your order is, from sourcing to your gate.',
      icon: Compass,
      tag: 'Gate-to-Gate GPS',
      accentColor: 'from-indigo-500 to-sky-600',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-black/[0.05]">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[240px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement Hero Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b1329] to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(15,23,42,0.18)] border border-slate-800 overflow-hidden mb-16">
          {/* Subtle Grid Accent in Background */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 max-w-4xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Mission</span>
            </div>

            {/* Mission Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Why We Started wastemarket
            </h2>

            {/* Mission Body Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
              Too many businesses lose money to short-weighted loads, mismatched quality, and dealers who disappear after the sale. We built wastemarket so buyers never have to gamble on a phone call again — every batch is graded before you commit, every order is backed by a guarantee, and every delivery is tracked from source to your gate.
            </p>

            {/* Micro Highlights Pill Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Short-Weight Risk</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Pre-Commitment Grade Assay</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Escrow Protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Businesses Trust wastemarket */}
        <div>
          {/* Subheader */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-200 text-[#0284c7] px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Institutional Accountability</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f1115]">
              Why Businesses Trust wastemarket
            </h3>
            <p className="text-sm sm:text-base text-[#495057] mt-3 max-w-xl mx-auto">
              Every ton sourced on WasteMarket is engineered for zero risk, transparent pricing, and predictable industrial delivery.
            </p>
          </div>

          {/* 4 Trust Value Props Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-7 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(14,165,233,0.12)] hover:border-sky-300/80 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon with Gradient & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.accentColor} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Pillar Title */}
                    <h4 className="text-lg font-bold text-[#0f1115] tracking-tight mb-2 group-hover:text-[#0284c7] transition-colors">
                      {pillar.title}
                    </h4>

                    {/* Pillar Description */}
                    <p className="text-xs sm:text-sm text-[#495057] leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Card Footer Line */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0ea5e9]">
                    <span>Verified Guarantee</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Action Prompt Banner */}
          {(onOpenRFQ || onExploreLots) && (
            <div className="mt-12 text-center">
              <button
                onClick={onOpenRFQ || onExploreLots}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-[0_4px_16px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_24px_rgba(14,165,233,0.4)] transition-all cursor-pointer active:scale-98"
              >
                <span>Request a Guaranteed RFQ Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
