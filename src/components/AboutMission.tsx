import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutMissionProps {
  onOpenRFQ?: () => void;
}

export const AboutMission: React.FC<AboutMissionProps> = ({ onOpenRFQ }) => {
  return (
    <section className="w-full bg-[#0F2A47]/[0.04] py-16 sm:py-24 border-b border-[#E2E2E0]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-column layout desktop: text left, supporting image/graphic right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text (max-width ~500px) */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-[500px]">
            {/* Optional subtle pill */}
            <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E2E0] px-3.5 py-1 rounded-full text-xs font-semibold text-[#0D9488] mb-5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Our Core Mission</span>
            </div>

            {/* Heading 28px Semibold Navy */}
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F2A47] tracking-tight mb-5 leading-snug">
              Why We Started wastemarket
            </h2>

            {/* Body 16px Regular Charcoal, line-height 1.6 */}
            <p className="text-[16px] text-[#374151] leading-[1.6] font-normal mb-8">
              Too many businesses lose money to short-weighted loads, mismatched quality, and dealers who disappear after the sale. We built wastemarket so buyers never have to gamble on a phone call again — every batch is graded before you commit, every order is backed by a guarantee, and every delivery is tracked from source to your gate.
            </p>

            {/* Supporting Assurance Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-xs text-[#0F2A47] font-medium pt-4 border-t border-[#0F2A47]/10">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Zero Short-Weight Tolerance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Pre-Commitment AI Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Source-to-Gate Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Supporting graphic/image (Chaos to Clarity / Verified Yard Assurance) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-[#E2E2E0] shadow-md p-6 overflow-hidden">
              
              {/* Visual Graphic Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F3F5]">
                <div className="text-xs font-semibold text-[#0F2A47] uppercase tracking-wider">
                  The WasteMarket Difference
                </div>
                <span className="text-[11px] font-semibold text-[#0D9488] bg-[#E6F4F1] px-2.5 py-0.5 rounded-full">
                  Chaos → Clarity
                </span>
              </div>

              {/* Comparison Illustration Box */}
              <div className="space-y-4">
                {/* Traditional Scrap Gamble (Red/Gray Tint) */}
                <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-100">
                  <div className="text-xs font-bold text-red-900 mb-1 flex items-center justify-between">
                    <span>Traditional Scrap Trade</span>
                    <span className="text-[10px] text-red-700 bg-red-100 px-2 py-0.5 rounded-full">High Risk</span>
                  </div>
                  <p className="text-xs text-red-700 leading-relaxed">
                    Unverified phone bids, mysterious moisture cuts, short weights, and no escrow recourse.
                  </p>
                </div>

                {/* WasteMarket Guarantee (Teal/Navy Tint) */}
                <div className="p-3.5 rounded-xl bg-[#E6F4F1] border border-[#0D9488]/30">
                  <div className="text-xs font-bold text-[#0F2A47] mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                      <span>WasteMarket Standard</span>
                    </span>
                    <span className="text-[10px] text-[#0D9488] bg-white font-bold px-2 py-0.5 rounded-full">
                      100% Protected
                    </span>
                  </div>
                  <p className="text-xs text-[#0F2A47]/80 leading-relaxed">
                    Pre-delivery spectrographic assays, dual digital weighbridge slips, and funds held in RBI-compliant escrow.
                  </p>
                </div>
              </div>

              {/* Inspection Yard Snapshot */}
              <div className="mt-4 rounded-xl overflow-hidden h-32 relative">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
                  alt="Verified Scrap Processing & Sourcing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0F2A47]/40 flex items-center justify-center p-3 text-center">
                  <span className="text-white text-xs font-semibold drop-shadow-sm">
                    Operating Yard & Logistics Hub · JNPT Logistics Park, Navi Mumbai
                  </span>
                </div>
              </div>

              {onOpenRFQ && (
                <button
                  onClick={onOpenRFQ}
                  className="mt-4 w-full bg-[#0F2A47] hover:bg-[#0D9488] text-white text-xs font-semibold py-2.5 rounded-[8px] transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Experience Guaranteed Sourcing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
