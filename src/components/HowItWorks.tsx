import React from 'react';
import { Layers, Sparkles, Truck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenRFQ?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenRFQ }) => {
  const steps = [
    {
      number: '01',
      title: 'Tell us what you need',
      description: 'Select material, quantity, and grade.',
      icon: Layers,
      highlight: 'ISRI Standardized Specifications',
    },
    {
      number: '02',
      title: 'We grade and source it',
      description: 'AI analyzes quality; our team finds the right match.',
      icon: Sparkles,
      highlight: 'Spectrographic Assay Validation',
    },
    {
      number: '03',
      title: 'It arrives as promised',
      description: 'Verified quality, delivered on schedule.',
      icon: Truck,
      highlight: 'Guaranteed Freight & Escrow Protection',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#0f172a] via-[#0b1120] to-[#0f172a] text-white border-y border-slate-800 overflow-hidden">
      {/* Dynamic ambient background glow & tech grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#38bdf8] bg-sky-950/80 border border-sky-800/60 px-3.5 py-1 rounded-full mb-4 uppercase tracking-wider backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span>Industrial Trade Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            How it works
          </h2>
        </div>

        {/* 3 Interactive Pipeline Steps with Flow Connectors */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Subtle Desktop Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500/30 to-sky-500/0 -translate-y-6 pointer-events-none z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-slate-900/80 hover:bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 hover:border-[#38bdf8]/60 rounded-3xl p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.18)] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Badge & Step Number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-blue-500/10 border border-sky-400/30 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 group-hover:bg-[#0ea5e9] group-hover:text-white transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-[#38bdf8] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#38bdf8] transition-colors">
                    {step.title}
                  </h3>
                </div>

                {/* Bottom Step Indicator Pill */}
                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-[#38bdf8] font-semibold">
                  <span className="tracking-wide uppercase text-[11px]">Verified Protocol</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
