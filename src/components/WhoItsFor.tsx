import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface WhoItsForProps {
  onOpenRFQ?: () => void;
  onExploreCatalog?: () => void;
}

export const WhoItsFor: React.FC<WhoItsForProps> = ({ onOpenRFQ, onExploreCatalog }) => {
  const panels = [
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      image: '/manufacturing-bg.jpg',
      alt: 'Industrial scrap crane and manufacturing foundries',
      subtitle: 'Foundries & Production Plants',
    },
    {
      id: 'traders',
      name: 'Traders',
      image: '/traders-bg.jpg',
      alt: 'Scrap yard inventory warehouse and dealers',
      subtitle: 'Stockists & Regional Dealers',
    },
    {
      id: 'processors',
      name: 'Processors',
      image: '/processors-bg.jpg',
      alt: 'Shredded metals, granulators, and recyclers',
      subtitle: 'Shredders & Recyclers',
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 bg-[#F7F8FA] border-y border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-3 uppercase tracking-wider bg-sky-100/70 border border-sky-200/80 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>Target Sectors</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115]">
            Built for Businesses That Buy in Bulk
          </h2>
        </div>

        {/* 3 Panels Slide Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {panels.map((panel, idx) => (
            <div
              key={idx}
              onClick={onOpenRFQ}
              className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.25)] border border-slate-700/40 cursor-pointer group transition-all duration-500 flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Background Image */}
              <img
                src={panel.image}
                alt={panel.alt}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 pointer-events-none"
              />

              {/* Multi-layered cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/20 group-hover:via-slate-950/50 transition-colors pointer-events-none" />
              <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

              {/* Content: Just the name and subtle indicator */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#38bdf8] tracking-widest uppercase block mb-1">
                    0{idx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                    {panel.name}
                  </h3>
                </div>

                {/* Arrow Action Bubble */}
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-[#0ea5e9] group-hover:scale-110 transition-all shadow-lg">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
