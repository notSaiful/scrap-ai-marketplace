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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 text-[#0284c7] px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
          <span>Streamlined 3-Step Process</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115]">
          How it works
        </h2>
        <p className="text-xs sm:text-sm text-[#495057] mt-2 font-normal leading-relaxed">
          Predictable scrap trade from initial specification to final delivery at your melt shop or warehouse.
        </p>
      </div>

      {/* 3 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="apple-card relative p-7 sm:p-8 flex flex-col justify-between group overflow-hidden bg-white"
            >
              {/* Top Row: Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_14px_rgba(14,165,233,0.3)]">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-black/[0.06] flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold text-[#0f1115] tracking-tight mb-2">
                  "{step.title}"
                </h3>
                <p className="text-xs sm:text-sm text-[#495057] leading-relaxed font-normal">
                  — {step.description}
                </p>
              </div>

              {/* Bottom Subtle Pill */}
              <div className="mt-8 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#0284c7] font-semibold">
                <span>{step.highlight}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0ea5e9]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
