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
    <section className="relative py-16 sm:py-24 bg-white border-y border-black/[0.06] overflow-hidden">
      {/* Background Architectural Blueprint / Subtle Grid Element */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Soft Glow Spheres */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-sky-200/40 via-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>Industrial Trade Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0f1115] mb-3">
            How it works
          </h2>
        </div>

        {/* 3 Interactive Pipeline Steps with Horizontal Connecting Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Subtle Desktop Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-sky-400/0 via-sky-400/30 to-sky-400/0 -translate-y-6 pointer-events-none z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-white hover:bg-slate-50/70 border border-black/[0.08] hover:border-[#0ea5e9]/70 rounded-3xl p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Badge & Step Number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center text-[#0284c7] group-hover:scale-110 group-hover:bg-[#0ea5e9] group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-[#0ea5e9] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0f1115] tracking-tight mb-2 group-hover:text-[#0284c7] transition-colors">
                    {step.title}
                  </h3>
                </div>

                {/* Bottom Step Indicator Pill */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#0284c7] font-semibold">
                  <span className="tracking-wide uppercase text-[11px]">Verified Protocol</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
