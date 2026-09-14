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
        {/* Full-Screen Video Section with Text Overlay */}
        <div className="relative w-full min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] rounded-3xl text-white p-8 sm:p-14 lg:p-20 shadow-[0_25px_60px_rgba(15,23,42,0.22)] border border-slate-800 overflow-hidden mb-16 flex flex-col justify-center">
          {/* Background Video (Autoplay, Loop, Muted, Playsinline) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          >
            <source src="/why-we-started.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Overlay for High Contrast and Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          {/* Text Overlay Content */}
          <div className="relative z-10 max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Our Purpose</span>
            </div>

            {/* Mission Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 drop-shadow-md">
              Why We Started wastemarket
            </h2>

            {/* Subtitle prioritizing Trust and Simplicity */}
            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl drop-shadow-sm">
              Bulk scrap trading was broken by guesswork, mismatched grades, and uncertain delivery. We built wastemarket to make sourcing as simple, predictable, and trustworthy as buying any primary commodity.
            </p>

            {/* Simplicity & Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-white/10 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>Transparent AI grading</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Direct escrow protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Seamless gate delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Businesses Trust wastemarket */}
        <div>
          {/* Subheader without subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-200 text-[#0284c7] px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Institutional Accountability</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f1115]">
              Why Businesses Trust wastemarket
            </h3>
          </div>

          {/* 4 Trust Value Props Cards Grid - Clean minimal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-7 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(14,165,233,0.12)] hover:border-sky-300/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Pillar Title */}
                  <h4 className="text-lg font-bold text-[#0f1115] tracking-tight mb-3 group-hover:text-[#0284c7] transition-colors">
                    {pillar.title}
                  </h4>

                  {/* Pillar Description */}
                  <p className="text-xs sm:text-sm text-[#495057] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
