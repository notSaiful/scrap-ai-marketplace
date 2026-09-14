import React from 'react';
import { ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface WhatWeSourceProps {
  onSelectCategory?: (category: string) => void;
  onOpenContact?: () => void;
}

export const WhatWeSource: React.FC<WhatWeSourceProps> = ({
  onSelectCategory,
  onOpenContact,
}) => {
  const materials = [
    {
      name: 'Metal Scrap',
      categoryKey: 'ferrous',
      grade: 'HMS 1/2 · Shredded 211 · Prime Plate & Copper/Alloy Lots',
      image: '/images/steel-scrap.jpg',
      specs: 'ISRI 200-206 compliant, density verified, foundry & smelter ready',
    },
    {
      name: 'Plastic Waste',
      categoryKey: 'plastics',
      grade: 'PET Hot Washed Flakes · HDPE Regrind · PP Bales',
      image: '/images/plastic-waste.jpg',
      specs: 'Low moisture (<0.8%), IV sorted, zero PVC contamination',
    },
    {
      name: 'Paper & Cardboard',
      categoryKey: 'paper',
      grade: 'OCC 11 Bales · Double Sorted Kraft (DSK) · White Ledger',
      image: '/images/paper-cardboard.jpg',
      specs: 'Wire tied 550kg bales, moisture <8.5%, mill certified',
    },
    {
      name: 'E-Waste',
      categoryKey: 'e-waste',
      grade: 'Server Boards · Telecom Scrap · Shredded Circuit Boards',
      image: '/images/e-waste.jpg',
      specs: 'Assayed precious metal yields (Au/Ag/Pd), depopulated PCB lots',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-white border-b border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-3 uppercase tracking-wider bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>Industrial Inventory</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115]">
            Materials We Source
          </h2>
          <p className="text-xs sm:text-sm text-[#495057] mt-2 font-normal">
            AI-inspected bulk scrap lots ready for direct industrial re-melting, extrusion, and recycling.
          </p>
        </div>

        {/* 4 Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory?.(mat.categoryKey)}
              className="group bg-white rounded-3xl border border-black/[0.08] hover:border-[#0ea5e9]/70 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.12)] transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Material Thumbnail Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to high quality industrial photo if local image is unavailable
                    const target = e.target as HTMLImageElement;
                    if (mat.categoryKey === 'ferrous') target.src = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
                    else if (mat.categoryKey === 'plastics') target.src = 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=800&q=80';
                    else if (mat.categoryKey === 'paper') target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80';
                    else if (mat.categoryKey === 'e-waste') target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';
                    else target.src = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {mat.grade.split('·')[0].trim()}
                  </span>
                </div>
              </div>

              {/* Material Text Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f1115] tracking-tight group-hover:text-[#0284c7] transition-colors">
                    {mat.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0284c7]">
                  <span>Explore lots</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Line: Don't see what you're looking for? [Ask us] */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-600 bg-slate-50 border border-slate-200/80 px-5 py-2.5 rounded-full shadow-2xs">
            <HelpCircle className="w-4 h-4 text-[#0ea5e9]" />
            <span>Don't see what you're looking for?</span>
            <button
              onClick={onOpenContact}
              className="font-bold text-[#0284c7] hover:text-[#0369a1] hover:underline cursor-pointer transition-colors"
            >
              Ask us
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
