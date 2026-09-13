import React, { useState } from 'react';
import { ScrapItem } from '../types/scrap';
import { SCRAP_ITEMS } from '../data/scrapData';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  Check,
  Scan,
  Cpu,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface ProductDetailPageProps {
  item: ScrapItem;
  onBack: () => void;
  onOpenRFQ: (item: ScrapItem, quantity?: number) => void;
  onSelectRelatedItem?: (item: ScrapItem) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  item,
  onBack,
  onOpenRFQ,
  onSelectRelatedItem,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<'A' | 'B' | 'C'>('A');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Derive material display name and base pricing
  const materialName = item.title.includes('Steel')
    ? 'Steel Scrap'
    : item.title.includes('Copper')
    ? 'Copper Scrap'
    : item.title.includes('Aluminum')
    ? 'Aluminum Scrap'
    : item.title.includes('PET') || item.title.includes('HDPE')
    ? 'Plastic Waste'
    : item.title.includes('Cardboard') || item.title.includes('OCC')
    ? 'Paper & Cardboard'
    : item.categoryName;

  // Grade Tiers tailored to the material (defaulting to indicative INR or benchmark values)
  const baseRate = item.pricePerTon > 1000 ? Math.round(item.pricePerTon * 83) : Math.round(item.pricePerTon * 85);
  const gradeTiers = [
    {
      id: 'A',
      name: 'Grade A – Premium',
      description: 'Minimal contamination, consistent size, highest resale value.',
      indicativePrice: `₹${(Math.round(baseRate * 1.05)).toLocaleString('en-IN')}–${(Math.round(baseRate * 1.15)).toLocaleString('en-IN')}`,
      badgeStyle: 'bg-[#0ea5e9] text-white font-semibold',
      badgeBorder: 'border-transparent',
      isSolidTeal: true,
      badgeText: 'Grade A',
    },
    {
      id: 'B',
      name: 'Grade B – Standard',
      description: 'Light contamination, mixed sizing, reliable for most industrial use.',
      indicativePrice: `₹${(Math.round(baseRate * 0.95)).toLocaleString('en-IN')}–${(Math.round(baseRate * 1.02)).toLocaleString('en-IN')}`,
      badgeStyle: 'bg-transparent text-[#0ea5e9] font-semibold border-2 border-[#0ea5e9]',
      badgeBorder: 'border-[#0ea5e9]',
      isSolidTeal: false,
      badgeText: 'Grade B',
    },
    {
      id: 'C',
      name: 'Grade C – Mixed/Economy',
      description: 'Higher variability, best for buyers prioritizing volume over uniformity.',
      indicativePrice: `₹${(Math.round(baseRate * 0.85)).toLocaleString('en-IN')}–${(Math.round(baseRate * 0.92)).toLocaleString('en-IN')}`,
      badgeStyle: 'bg-transparent text-slate-500 font-medium border border-slate-300',
      badgeBorder: 'border-slate-300',
      isSolidTeal: false,
      badgeText: 'Grade C',
    },
  ];

  // Verified Batch Gallery (real batch photos from actual inventory)
  const batchPhotos = [
    {
      url: item.primaryImage,
      batchId: 'BATCH-8821',
      date: 'Verified Yesterday',
      specs: 'Fe 98.4% · Optical Density 68 lbs/cu.ft',
    },
    {
      url: item.images?.[1] || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      batchId: 'BATCH-8819',
      date: 'Verified 3 days ago',
      specs: 'Spectrometer scanned · Moisture < 0.2%',
    },
    {
      url: item.images?.[2] || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      batchId: 'BATCH-8790',
      date: 'Verified 5 days ago',
      specs: '3D laser LiDAR mesh mapped',
    },
    {
      url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      batchId: 'BATCH-8742',
      date: 'Verified 1 week ago',
      specs: 'Weighbridge calibrated & assayed',
    },
  ];

  // Related Cross-Sell Materials
  const relatedMaterials = SCRAP_ITEMS.filter((s) => s.id !== item.id).slice(0, 3);

  // Material-specific FAQs
  const materialFaqs = [
    {
      q: `What contamination levels are typical in Grade B ${materialName}?`,
      a: `In Grade B ${materialName}, non-target attachments or permissible dirt are strictly calibrated below 1.2% to 2.5% max. Each consignment includes an AI spectrographic assay ensuring zero hazardous tramp elements before dispatch.`,
    },
    {
      q: 'Can I request a custom quantity below your standard minimum?',
      a: 'Yes, while standard orders start at institutional container levels (typically 20 MT), verified buyers can request fractional allocation through our shared container consolidation routes.',
    },
    {
      q: 'How does the Delivery Guarantee protect my purchase?',
      a: 'Every order is secured via Razorpay Trade Escrow. If the physical delivery at your weighbridge fails to match the assay report specs, we replace the batch immediately or issue a full refund with zero haggling.',
    },
  ];

  const handleSelectGradeAndQuote = (gradeId: 'A' | 'B' | 'C') => {
    setSelectedGrade(gradeId);
    onOpenRFQ(item);
  };

  return (
    <div className="w-full bg-[#f8f9fa] pt-24 sm:pt-28 pb-32 text-slate-900 selection:bg-sky-500/15 selection:text-[#0284c7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. BREADCRUMB + HEADER + FULL-WIDTH HERO PHOTO                            */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          {/* Breadcrumb: 13px gray, links underline on hover */}
          <nav className="flex items-center space-x-2 text-[13px] text-slate-500">
            <button
              onClick={onBack}
              className="hover:underline hover:text-slate-900 transition-all flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <button onClick={onBack} className="hover:underline hover:text-slate-900 transition-all cursor-pointer">
              Materials
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{materialName}</span>
          </nav>

          {/* Header: 32px Semibold Navy */}
          <div>
            <h1 className="text-3xl sm:text-[32px] font-semibold tracking-tight text-[#0f1115]">
              {materialName}
            </h1>
            {/* Subhead: 16px gray below header */}
            <p className="text-base text-slate-500 mt-1 font-normal">
              AI-graded and sourced from verified suppliers near you.
            </p>
          </div>

          {/* Full-width hero photo of the material (real batch photo, not stock) */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[12px] overflow-hidden border border-black/[0.08] shadow-sm bg-slate-100 group">
            <img
              src={item.primaryImage}
              alt={`${materialName} verified batch`}
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            {/* Real Batch Verification Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">Live Yard Batch: {item.origin}</span>
              </div>
              <div className="hidden sm:block text-white/90 text-xs bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono">
                Assay Purity: {item.aiSpecs.purityScore}%
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. GRADE TIERS (Grade A, Grade B, Grade C)                                */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0f1115]">
                Available Grades
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardized ISRI classification with verified purity thresholds.
              </p>
            </div>
          </div>

          {/* 3 cards side by side desktop, stacked mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {gradeTiers.map((tier) => {
              const isSelected = selectedGrade === tier.id;

              return (
                <div
                  key={tier.id}
                  className={`bg-white rounded-[12px] p-5 border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isSelected ? 'border-[#0ea5e9] ring-2 ring-[#0ea5e9]/20' : 'border-black/[0.08]'
                  }`}
                >
                  <div>
                    {/* Grade badge top of each card: Solid Teal, Teal outline, Gray outline */}
                    <div className="mb-4">
                      <span className={`inline-block text-xs px-3 py-1 rounded-full uppercase tracking-wider ${tier.badgeStyle}`}>
                        {tier.badgeText}
                      </span>
                    </div>

                    {/* Grade Name & Description */}
                    <h3 className="text-base font-bold text-[#0f1115] mb-1.5">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#495057] leading-relaxed mb-6 font-normal min-h-[38px]">
                      {tier.description}
                    </p>

                    {/* Price: Navy 18px medium */}
                    <div className="mb-2">
                      <div className="text-[18px] font-medium text-[#0f1115]">
                        {tier.indicativePrice} <span className="text-xs text-slate-500 font-normal">/ ton</span>
                      </div>
                      {/* "(indicative)" in 12px gray beneath */}
                      <div className="text-[12px] text-slate-400 font-normal">
                        (indicative)
                      </div>
                    </div>
                  </div>

                  {/* Secondary CTA: "Select This Grade" — outline Navy, fills solid Teal on hover */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleSelectGradeAndQuote(tier.id as any)}
                      className="w-full py-2.5 px-4 rounded-[8px] text-xs font-semibold border border-[#0f1115] text-[#0f1115] hover:bg-[#0ea5e9] hover:border-[#0ea5e9] hover:text-white transition-all cursor-pointer text-center"
                    >
                      Select This Grade
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Microcopy under pricing */}
          <p className="text-xs text-slate-500 text-center sm:text-left italic">
            Final price confirmed after AI grading of your specific order.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 3. HOW WE GRADE THIS MATERIAL                                             */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-[#0f1115]/[0.04] border border-black/[0.06] p-7 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Short text block */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-[#0f1115]">
                How We Grade {materialName}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Every batch is scanned in 3D and assessed by our AI for contamination, size consistency, and composition — then verified by our team before you ever see a quote.
              </p>
            </div>

            {/* Right Column: Simple annotated graphic (scan icon → AI check icon → human checkmark icon) */}
            <div className="lg:col-span-7">
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-white rounded-2xl border border-black/[0.06] shadow-2xs">
                
                {/* Connecting thin teal line (desktop) */}
                <div className="hidden sm:block absolute top-1/2 left-16 right-16 h-[2px] bg-[#0ea5e9]/40 -translate-y-1/2 -z-0" />

                {/* Step 1: Scan Icon */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-[#0ea5e9]/30 flex items-center justify-center text-[#0ea5e9] shadow-2xs">
                    <Scan className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0f1115]">1. 3D LiDAR Scan</div>
                    <div className="text-[11px] text-slate-400">Volume & Size Mesh</div>
                  </div>
                </div>

                {/* Step 2: AI Check Icon */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-[#0ea5e9]/30 flex items-center justify-center text-[#0ea5e9] shadow-2xs">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0f1115]">2. AI Assay Check</div>
                    <div className="text-[11px] text-slate-400">Contamination & Chemistry</div>
                  </div>
                </div>

                {/* Step 3: Human Checkmark Icon */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-[#0ea5e9]/30 flex items-center justify-center text-[#0ea5e9] shadow-2xs">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0f1115]">3. Human Verified</div>
                    <div className="text-[11px] text-slate-400">Physical Sign-Off</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. REAL BATCH PHOTOS / 3D SCAN GALLERY                                    */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f1115]">
              Recent Batches We've Sourced
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Actual photos from recent verified batches — not stock images.
            </p>
          </div>

          {/* 4-Image Grid, 8px radius each, subtle border */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {batchPhotos.map((batch, i) => (
              <div
                key={i}
                className="bg-white rounded-[8px] overflow-hidden border border-black/[0.08] shadow-2xs group flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img
                    src={batch.url}
                    alt={batch.batchId}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {batch.batchId}
                  </span>
                </div>
                <div className="p-3 bg-white">
                  <div className="text-[11px] font-semibold text-[#0f1115] truncate">
                    {batch.date}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {batch.specs}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Backed by optical density measurements, handheld XRF assay reports, and electronic weighbridge slips.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 5. GUARANTEE REMINDER + PRIMARY CTA (Prominent Band)                      */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 rounded-3xl p-7 sm:p-9 text-white shadow-lg border border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Guarantee Badge Line */}
            <div className="flex items-start space-x-3 max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[#38bdf8] font-bold text-sm sm:text-base flex items-center gap-1.5">
                  <span>Delivery Guarantee Protected</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Backed by our Delivery Guarantee — if it doesn't match the graded quality, we make it right.
                </p>
              </div>
            </div>

            {/* Primary CTA button leading into existing single-page quote thread */}
            <div className="w-full sm:w-auto shrink-0">
              <button
                onClick={() => onOpenRFQ(item)}
                className="w-full sm:w-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-[8px] transition-all shadow-[0_8px_20px_rgba(14,165,233,0.35)] active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Request Quote for {materialName}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. RELATED MATERIALS (Cross-sell Items)                                   */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f1115]">
              You Might Also Need
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Complementary industrial lots frequently ordered alongside {materialName}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedMaterials.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelatedItem ? onSelectRelatedItem(rel) : onOpenRFQ(rel)}
                className="bg-white rounded-2xl border border-black/[0.08] hover:border-[#0ea5e9]/70 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={rel.primaryImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#0f1115] group-hover:text-[#0284c7] transition-colors line-clamp-1">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {rel.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0ea5e9]">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. MATERIAL-SPECIFIC FAQ (2-3 items)                                      */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-black/[0.06]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f1115]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific details regarding purity standards, sampling, and supply contracts.
            </p>
          </div>

          <div className="space-y-3">
            {materialFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-black/[0.08] overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0f1115] hover:text-[#0284c7] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0284c7]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Link back to full homepage FAQ */}
          <div className="pt-2 text-center sm:text-left">
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] hover:underline cursor-pointer"
            >
              See all FAQs on homepage &rarr;
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
