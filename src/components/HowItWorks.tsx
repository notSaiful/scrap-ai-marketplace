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
    <section className="relative py-20 sm:py-28 overflow-hidden min-h-[500px] flex items-center justify-center text-white border-y border-black/[0.1]">
      {/* Background Scrap Yard Image with Full Fill */}
      <img
        src="/how-it-works-scrap-bg.jpg"
        alt="Scrap yard and material processing"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      {/* Cinematic Dark Gradient Overlay for Maximum Text Contrast & Clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/90 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-300 bg-sky-500/20 border border-sky-400/40 px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Industrial Trade Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            How it works
          </h2>
        </div>

        {/* 3 Steps - Minimal Text Overlay (No Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 group"
              >
                {/* Step Number & Icon Header */}
                <div className="flex items-center space-x-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 backdrop-blur-md group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-sky-400 tracking-wider">
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-sky-300 transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
