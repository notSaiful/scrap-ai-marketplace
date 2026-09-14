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
    <section className="relative w-full min-h-screen flex flex-col justify-between py-12 sm:py-16 overflow-hidden">
      {/* Full Screen Section Image - 100% natural colors, not darkened */}
      <img
        src="/how-it-works-bg.jpg"
        alt="Automotive scrap car yard piles"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Top Bar: Title & Badge */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-full px-6 py-3.5 border border-white/60 shadow-lg max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f1115]">
            How it works
          </h2>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0284c7] bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>3-Step Process</span>
          </div>
        </div>
      </div>

      {/* Bottom Step Titles Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white/92 backdrop-blur-md border border-white/80 hover:border-sky-400/60 rounded-2xl p-4 sm:p-5 shadow-xl transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center text-[#0ea5e9] shrink-0 group-hover:scale-105 group-hover:bg-[#0ea5e9] group-hover:text-white transition-all shadow-2xs">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#0284c7] tracking-widest uppercase block mb-0.5">
                    Step {step.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f1115] tracking-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
