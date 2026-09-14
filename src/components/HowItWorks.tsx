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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115]">
          How it works
        </h2>
      </div>

      {/* Cinematic Industrial Image Showcase with Step Heading Titles */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-700/40 shadow-2xl min-h-[360px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 group">
        {/* Background Image */}
        <img
          src="/how-it-works-bg.jpg"
          alt="Automotive scrap car yard piles"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 pointer-events-none"
        />

        {/* Multi-layered dark moody gradient overlay for cinematic contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#38bdf8] bg-slate-950/80 backdrop-blur-md border border-sky-400/30 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Streamlined 3-Step Process</span>
          </div>
        </div>

        {/* Bottom Headings Titles Only */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-slate-950/70 backdrop-blur-md border border-white/15 hover:border-sky-400/50 rounded-2xl p-4 sm:p-5 transition-all group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-white shrink-0 group-hover/item:scale-105 group-hover/item:bg-[#0ea5e9] transition-all">
                  <Icon className="w-5 h-5 text-[#38bdf8] group-hover/item:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#38bdf8] tracking-widest uppercase block mb-0.5">
                    Step {step.number}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
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
