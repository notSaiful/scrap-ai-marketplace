import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface WhatWeSourceProps {
  onSelectCategory?: (category: string) => void;
  onAskUs?: () => void;
}

export const WhatWeSource: React.FC<WhatWeSourceProps> = ({
  onSelectCategory,
  onAskUs,
}) => {
  const materials = [
    {
      name: 'Steel Scrap',
      id: 'steel',
      image: '/images/steel-scrap.jpg',
      description: 'HMS 1/2, Plate & Structural, Shredded',
    },
    {
      name: 'Plastic Waste',
      id: 'plastic',
      image: '/images/plastic-waste.jpg',
      description: 'Clean Baled Polymers, Sorted Flakes',
    },
    {
      name: 'Paper & Cardboard',
      id: 'paper',
      image: '/images/paper-cardboard.jpg',
      description: 'OCC Corrugated, Mixed Kraft Bales',
    },
    {
      name: 'Textile Waste',
      id: 'textiles',
      image: '/images/textile-waste.jpg',
      description: 'Sorted Cotton Clips, Fabric Remnants',
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-[#E2E2E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F2A47] tracking-tight">
            Materials We Source
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] mt-2">
            Institutional volume scrap with spectrographic and gravimetric certification.
          </p>
        </div>

        {/* 4-column grid desktop, 2x2 tablet, single column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {materials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectCategory && onSelectCategory(mat.id)}
              className="group bg-white rounded-[12px] border border-[#E2E2E0] hover:border-[#1F9D74] transition-all duration-200 overflow-hidden cursor-pointer shadow-2xs hover:shadow-md flex flex-col"
            >
              {/* Material thumbnail on top (square 1:1 image) */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#F7F8FA]">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 text-[#0F2A47] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                  <ArrowUpRight className="w-4 h-4 text-[#1F9D74]" />
                </div>
              </div>

              {/* Name centered below in Navy medium weight */}
              <div className="p-5 text-center flex-1 flex flex-col justify-center">
                <h3 className="text-base sm:text-[17px] font-medium text-[#0F2A47] group-hover:text-[#1F9D74] transition-colors">
                  {mat.name}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 font-normal">
                  {mat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Below the grid, centered teal link: "Don't see what you're looking for? Ask us" */}
        <div className="text-center text-sm sm:text-base text-[#6B7280]">
          <span>Don't see what you're looking for? </span>
          <button
            onClick={onAskUs}
            className="text-[#1F9D74] font-medium hover:underline cursor-pointer inline-flex items-center"
          >
            Ask us
          </button>
        </div>

      </div>
    </section>
  );
};
