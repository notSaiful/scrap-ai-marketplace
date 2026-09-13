import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AboutMissionProps {
  onOpenRFQ?: () => void;
}

export const AboutMission: React.FC<AboutMissionProps> = ({ onOpenRFQ }) => {
  return (
    <section className="w-full bg-[#0F2A47]/[0.04] py-16 sm:py-24 border-b border-[#E2E2E0]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-column layout desktop (stacks on mobile, image-first on mobile) */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Text (max-width ~500px) */}
          <div className="lg:col-span-6 flex flex-col items-start max-w-[500px]">
            {/* Subtle Tag */}
            <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E2E0] px-3.5 py-1 rounded-full text-xs font-semibold text-[#1F9D74] mb-5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>About / Mission</span>
            </div>

            {/* Heading 28px Semibold Navy */}
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F2A47] tracking-tight mb-5 leading-snug">
              Why We Started wastemarket
            </h2>

            {/* Body text: 16px, line-height 1.6, Charcoal */}
            <p className="text-[16px] text-[#1C1C1E] leading-[1.6] font-normal mb-8">
              Too many businesses lose money to short-weighted loads, mismatched quality, and dealers who disappear after the sale. We built wastemarket so buyers never have to gamble on a phone call again — every batch is graded before you commit, every order is backed by a guarantee, and every delivery is tracked from source to your gate.
            </p>

            {/* Four Trust Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-xs text-[#0F2A47] font-medium pt-5 border-t border-[#0F2A47]/10">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1F9D74] shrink-0" />
                <span>Zero Short-Weight Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1F9D74] shrink-0" />
                <span>Pre-Commitment Assay</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1F9D74] shrink-0" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1F9D74] shrink-0" />
                <span>Source-to-Gate Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image slot (Warm team photo in 4:3 ratio, image-first on mobile) */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-lg rounded-[12px] overflow-hidden border border-[#E2E2E0] shadow-md bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/about-mission-team.jpg"
                  alt="WasteMarket Operations & Metallurgy Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3.5 bg-white border-t border-[#E2E2E0]/60 flex items-center justify-between text-xs text-[#6B7280]">
                <span className="font-semibold text-[#0F2A47]">
                  WasteMarket Operations & Metallurgy Team
                </span>
                <span className="text-[11px] text-[#1F9D74] bg-[#E9F7F2] font-semibold px-2.5 py-0.5 rounded-full">
                  BKC & JNPT Hub
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
