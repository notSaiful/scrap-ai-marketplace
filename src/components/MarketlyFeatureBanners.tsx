import React from 'react';
import { ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface MarketlyFeatureBannersProps {
  onSelectCategory: (category: string) => void;
}

export const MarketlyFeatureBanners: React.FC<MarketlyFeatureBannersProps> = ({ onSelectCategory }) => {
  const banners = [
    {
      id: 'ferrous',
      category: 'ferrous',
      tag: '500+ Metric Tons',
      title: 'Explore Ferrous & Heavy Melting Steel',
      description: 'Direct yard pricing for HMS 1/2, shredded auto scrap, and steel plate with CIF maritime freight.',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      badge: 'Direct Smelter Quota',
    },
    {
      id: 'non-ferrous',
      category: 'non-ferrous',
      tag: '150+ Metric Tons',
      title: 'Explore High-Purity Copper & Brass',
      description: 'Millberry 99.99%, birch/cliff copper, and brass honey lots with verified XRF spectrographic certificates.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      badge: '99.9% Assayed Purity',
    },
    {
      id: 'battery-ewaste',
      category: 'battery',
      tag: '80+ Metric Tons',
      title: 'Explore Battery & Secondary Polymers',
      description: 'Drained lead-acid battery scrap, high-recovery telecom PCBs, and HDPE regrind with escrow compliance.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      badge: 'Hazardous Escrow Protected',
    },
  ];

  return (
    <section id="highlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelectCategory(b.category)}
            className="group relative bg-white rounded-2xl border border-black/[0.08] hover:border-[#38bdf8] p-6 shadow-xs hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Top Tag & Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-bold text-[#0284c7] bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  {b.tag}
                </span>
                <span className="text-[10px] font-medium text-[#495057] bg-[#f8f9fa] border border-black/[0.05] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#0ea5e9]" />
                  {b.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-[#0f1115] leading-snug group-hover:text-[#0ea5e9] transition-colors mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-[#495057] leading-relaxed font-normal mb-6">
                {b.description}
              </p>
            </div>

            {/* Image Preview & Action */}
            <div>
              <div className="relative w-full h-36 rounded-xl overflow-hidden bg-[#f1f3f5] mb-4">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[#0f1115] group-hover:text-[#0ea5e9] transition-colors">
                <span>Explore Lots</span>
                <div className="w-7 h-7 rounded-full bg-[#f8f9fa] group-hover:bg-gradient-to-tr group-hover:from-[#38bdf8] group-hover:to-[#0ea5e9] group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
