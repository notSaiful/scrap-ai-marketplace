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
      image: '/how-it-works-step1.jpg',
    },
    {
      number: '02',
      title: 'We grade and source it',
      description: 'AI analyzes quality; our team finds the right match.',
      icon: Sparkles,
      image: '/how-it-works-step2.jpg',
    },
    {
      number: '03',
      title: 'It arrives as promised',
      description: 'Verified quality, delivered on schedule.',
      icon: Truck,
      image: '/how-it-works-step3.jpg',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-slate-950 text-white border-y border-white/[0.08]">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-300 bg-sky-500/20 border border-sky-400/40 px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Industrial Trade Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            How it works
          </h2>
        </div>

        {/* 3 Steps - Cards with Uploaded Images as Card Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] p-6 sm:p-8 flex flex-col justify-between group border border-white/15 hover:border-sky-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_50px_rgba(14,165,233,0.25)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Contrast Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40 pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />

                {/* Top Badge: Step Number & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm font-extrabold text-white bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full shadow-xs tracking-wider">
                    STEP {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-sky-300 group-hover:scale-110 group-hover:bg-[#0ea5e9] group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Content: Title & Description */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-sky-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed drop-shadow-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
