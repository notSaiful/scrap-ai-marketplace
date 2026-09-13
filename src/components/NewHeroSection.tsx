import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Search, CheckCircle2, Scale, FileText } from 'lucide-react';

interface NewHeroSectionProps {
  onOpenRFQ: () => void;
  onSearchSubmit?: (query: string) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const NewHeroSection: React.FC<NewHeroSectionProps> = ({
  onOpenRFQ,
  onSearchSubmit,
  searchQuery = '',
  setSearchQuery,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = localQuery.trim() || 'Steel Scrap';
    if (setSearchQuery) setSearchQuery(q);
    if (onSearchSubmit) onSearchSubmit(q);
  };

  return (
    <section className="relative w-full bg-[#F7F8FA] border-b border-[#E2E2E0] overflow-hidden">
      {/* 100px vertical padding desktop / 48px mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subhead, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small subtle badge */}
            <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E2E0] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0F2A47] mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1F9D74] animate-pulse" />
              <span>India's Institutional B2B Scrap Network</span>
            </div>

            {/* Headline: 48px Semibold Navy (#0F2A47) desktop / 28-32px mobile */}
            <h1 className="text-[30px] sm:text-[38px] lg:text-[48px] font-semibold text-[#0F2A47] leading-[1.16] tracking-tight mb-4 sm:mb-5">
              Bulk Scrap, Graded and Guaranteed.
            </h1>

            {/* Subheadline: 18px Regular gray below it, max-width 560px */}
            <p className="text-base sm:text-[18px] text-[#374151] leading-relaxed max-w-[560px] mb-8 font-normal">
              AI-verified quality. One fair price. Delivered on time — every time.
            </p>

            {/* Two CTAs: solid Navy button "Get Your Quote" (white text, 8px radius, teal hover state) and text link "See How It Works" with underline-on-hover */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenRFQ}
                className="bg-[#0F2A47] hover:bg-[#1F9D74] text-white text-base font-semibold px-8 py-3.5 rounded-[8px] transition-colors duration-200 text-center shadow-sm cursor-pointer active:scale-98"
              >
                Get Your Quote
              </button>

              <a
                href="#how-it-works"
                onClick={handleScrollToHowItWorks}
                className="text-[#0F2A47] hover:underline text-base font-medium text-center py-2 sm:py-0 transition-colors"
              >
                See How It Works
              </a>
            </div>

            {/* Quick Material Search Input */}
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative flex items-center bg-white rounded-[8px] border border-[#E2E2E0] hover:border-[#1F9D74] focus-within:border-[#1F9D74] focus-within:ring-2 focus-within:ring-[#1F9D74]/20 transition-all p-1.5 shadow-xs">
                <Search className="w-4 h-4 text-[#6B7280] ml-2.5 mr-2 shrink-0" />
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Instant search: Steel, Copper, HDPE flakes, Corrugated..."
                  className="w-full text-sm text-[#1C1C1E] placeholder-[#9CA3AF] bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#0F2A47] hover:bg-[#1F9D74] text-white text-xs font-semibold px-4 py-2 rounded-[6px] transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Supporting graphic / image slot (desktop right side, stacked below CTA on mobile) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md bg-white rounded-[12px] border border-[#E2E2E0] shadow-[0_10px_30px_rgba(15,42,71,0.08)] p-6 sm:p-7 overflow-hidden">
              
              {/* Graphic Card Header */}
              <div className="flex items-center justify-between border-b border-[#F1F3F5] pb-4 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E9F7F2] flex items-center justify-center text-[#1F9D74]">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">
                      Verified Batch
                    </div>
                    <div className="text-sm font-bold text-[#0F2A47]">
                      WM-LOT-9842 · Grade A
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center space-x-1 bg-[#E9F7F2] text-[#1F9D74] text-xs font-semibold px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI Assayed</span>
                </span>
              </div>

              {/* Graphic Material Snapshot */}
              <div className="relative rounded-lg overflow-hidden mb-5 bg-slate-100 h-40 border border-slate-200">
                <img
                  src="/images/steel-scrap.jpg"
                  alt="Certified Industrial Steel Scrap"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A47]/80 via-[#0F2A47]/20 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <div className="text-[11px] font-semibold tracking-wider text-emerald-300 uppercase">
                      Spectrographic XRF Reading
                    </div>
                    <div className="text-sm font-bold">
                      Fe Purity: 99.2% · ISRI 200/201
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F8FA] border border-[#E2E2E0]/60">
                  <span className="text-[#6B7280]">Weighbridge Slip</span>
                  <span className="font-semibold text-[#0F2A47] flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#1F9D74]" />
                    <span>24.80 MT Certified</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F8FA] border border-[#E2E2E0]/60">
                  <span className="text-[#6B7280]">Escrow Protection</span>
                  <span className="font-semibold text-[#1F9D74] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1F9D74]" />
                    <span>Razorpay Nodal Locked</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F8FA] border border-[#E2E2E0]/60">
                  <span className="text-[#6B7280]">Delivery Logistics</span>
                  <span className="font-semibold text-[#0F2A47]">
                    Gate-to-Gate GPS Tracking
                  </span>
                </div>
              </div>

              {/* Card CTA */}
              <button
                onClick={onOpenRFQ}
                className="mt-5 w-full bg-[#0F2A47] hover:bg-[#1F9D74] text-white text-xs font-semibold py-2.5 px-4 rounded-[8px] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Request Inspection Report & Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
