import React, { useState } from 'react';
import { ScrapItem } from '../types/scrap';
import { SCRAP_ITEMS } from '../data/scrapData';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  Truck,
  Sparkles,
  Activity,
  Microscope,
  FileCheck,
  Award
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
  // Gallery Thumbnail Switcher
  const allImages = [
    item.primaryImage,
    item.images?.[1] || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    item.images?.[2] || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
  ];
  const [selectedImage, setSelectedImage] = useState<string>(item.primaryImage);

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

  // Derive realistic scrap rate per kg in INR
  const baseRatePerTon = item.pricePerTon > 1000 ? Math.round(item.pricePerTon * 83) : Math.round(item.pricePerTon * 85);
  const baseRate = Math.round(baseRatePerTon / 1000);
  const minPrice = Math.max(1, Math.round(baseRate * 0.95));
  const maxPrice = Math.max(1, Math.round(baseRate * 1.05));

  // Minimum MOQ for products is 10
  const moqKg = 10;

  // Quantity Stepper (in kg, starts at MOQ 10)
  const [quantity, setQuantity] = useState<number>(10);

  // Active Tab: Overview | AI Specifications | Technical Specs | Sourcing
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-specs' | 'specs' | 'sourcing'>('ai-specs');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const relatedMaterials = SCRAP_ITEMS.filter((s) => s.id !== item.id).slice(0, 3);

  const faqs = [
    {
      q: `What is the delivery timeline for ${materialName}?`,
      a: `Standard dispatch is typically scheduled within 3–5 business days from order confirmation and escrow fund lock.`,
    },
    {
      q: 'Can I request a custom quantity below the minimum order quantity?',
      a: `Standard orders start at indicated batch capacity (typically ${moqKg.toLocaleString('en-IN')} kg). For smaller trial batches, submit a quote request specifying your trial volume.`,
    },
    {
      q: 'How does the Escrow Delivery Guarantee protect my purchase?',
      a: 'Your payment remains secured in Razorpay Escrow until the shipment arrives at your destination weighbridge and specifications are verified.',
    },
  ];

  return (
    <div className="w-full bg-[#F7F8FA] pt-24 sm:pt-28 pb-32 text-slate-900 selection:bg-sky-500/15 selection:text-[#0284c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ========================================================================= */}
        {/* 1. BREADCRUMB                                                             */}
        {/* ========================================================================= */}
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

        {/* ========================================================================= */}
        {/* 2. ALIBABA SPLIT HERO: GALLERY-LEFT + STICKY-PANEL-RIGHT                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: MAIN IMAGE + THUMBNAIL STRIP                              */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Large Main Photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs">
              <img
                src={selectedImage}
                alt={materialName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                Live Lot: {item.origin.split(',')[0]}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                Batch #{item.id.toUpperCase()}
              </div>
            </div>

            {/* Thumbnail Strip: 4 Small Thumbnails (Click to swap main image) */}
            <div className="grid grid-cols-4 gap-3">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white shadow-2xs ${
                    selectedImage === imgUrl ? 'border-[#0ea5e9] ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Truck className="w-4 h-4 text-[#0ea5e9]" />
              <span>Real batch photos from supplier yard in {item.origin}.</span>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: STICKY ORDER PANEL                                        */}
          {/* Stays visible while buyer scrolls content below                         */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
              
              {/* Header Details */}
              <div>
                <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
                  Wholesale Bulk Allocation
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1115] mt-2">
                  {item.title}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Sourced from verified industrial suppliers in {item.origin}.
                </p>
              </div>

              {/* AI Specification Verified Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-50/90 to-blue-50/60 border border-sky-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
                    <span className="text-xs font-bold text-slate-900">AI Specification Verified</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-[#0284c7] px-2.5 py-0.5 rounded-full border border-sky-200">
                    {item.aiSpecs.verificationBadge}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="bg-white/80 p-2 rounded-lg border border-sky-100/70 text-center">
                    <div className="text-[10px] text-slate-500 font-medium">Assay Purity</div>
                    <div className="text-xs font-extrabold text-[#0284c7]">{item.aiSpecs.purityScore}%</div>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-sky-100/70 text-center">
                    <div className="text-[10px] text-slate-500 font-medium">ISRI Standard</div>
                    <div className="text-xs font-extrabold text-slate-800 truncate font-mono">{item.aiSpecs.isriCode.split(':')[1]?.trim() || item.grade}</div>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-sky-100/70 text-center">
                    <div className="text-[10px] text-slate-500 font-medium">Confidence</div>
                    <div className="text-xs font-extrabold text-emerald-600">{item.aiSpecs.aiConfidence}%</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Price Display */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                  Indicative Benchmark Price
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0f1115] mt-0.5">
                  ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-slate-500"> / kg</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Final landed price confirmed based on destination weighbridge location.
                </div>
              </div>

              {/* Quantity Stepper Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Order Quantity (kg)</span>
                  <span className="text-slate-400 font-normal">MOQ: {moqKg} kg</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(moqKg, quantity - 1))}
                      disabled={quantity <= moqKg}
                      className="p-3 text-slate-600 hover:text-black hover:bg-slate-200/60 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Decrease quantity by 1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={moqKg}
                      step={1}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          setQuantity(val);
                        } else {
                          setQuantity(moqKg);
                        }
                      }}
                      onBlur={() => {
                        if (quantity < moqKg) {
                          setQuantity(moqKg);
                        }
                      }}
                      className="w-16 text-sm font-bold text-slate-900 text-center bg-transparent focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-500 pr-3">kg</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-slate-600 hover:text-black hover:bg-slate-200/60 transition-colors cursor-pointer"
                      title="Increase quantity by 1"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    Est. Total: <strong className="text-slate-900">₹{(minPrice * quantity).toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Prominent Place Order Button */}
              <button
                onClick={() => onOpenRFQ(item, quantity)}
                className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all shadow-[0_8px_20px_rgba(14,165,233,0.3)] active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Place Order ({quantity.toLocaleString('en-IN')} kg)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Delivery Guarantee Line */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span>
                  <strong>Escrow Trade Assurance:</strong> Payments released only after physical weight and material verification at destination.
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. TABBED CONTENT BELOW THE FOLD                                          */}
        {/* "Overview" / "Specifications" / "How We Source"                           */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Tabs Bar */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70">
            {[
              { id: 'ai-specs', label: 'AI Specifications & Assay', icon: Sparkles },
              { id: 'overview', label: 'Material Overview' },
              { id: 'specs', label: 'Technical Parameters' },
              { id: 'sourcing', label: 'How We Source' },
            ].map(tab => {
              const Icon = (tab as any).icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-6 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-[#0ea5e9] text-[#0ea5e9] bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-[#0ea5e9]" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab: AI Specifications & Assay */}
          {activeTab === 'ai-specs' && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header & Verification Certificate */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#0ea5e9] uppercase tracking-wider bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.aiSpecs.verificationBadge}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Optical Emission Spectrometry (OES) & XRF Assay Report
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verified scan date: {item.aiSpecs.scanDate} • Mill-gate calibrated lot verification
                    </p>
                  </div>
                </div>

                {/* Score badge */}
                <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-4 shrink-0 shadow-sm">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Assay Purity</div>
                    <div className="text-2xl font-mono font-black text-sky-400">{item.aiSpecs.purityScore}%</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-800" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">AI Confidence</div>
                    <div className="text-lg font-mono font-bold text-emerald-400">{item.aiSpecs.aiConfidence}%</div>
                  </div>
                </div>
              </div>

              {/* Spectrographic Summary Quote Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/70 border border-sky-100 text-slate-800 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#0ea5e9]" />
                  <span>Spectrographic AI Laboratory Summary</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.aiSpecs.spectrographicSummary}"
                </p>
              </div>

              {/* AI Key Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">ISRI Circular Code</span>
                  <div className="text-sm font-bold text-slate-900 font-mono">{item.aiSpecs.isriCode}</div>
                  <p className="text-[11px] text-slate-500">Standardized ISRI grading classification</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Impurity Tolerance</span>
                  <div className="text-sm font-bold text-slate-900">{item.aiSpecs.impurityTolerance}</div>
                  <p className="text-[11px] text-slate-500">Zero tolerance for hazardous attachments</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Moisture Content</span>
                  <div className="text-sm font-bold text-slate-900">{item.aiSpecs.moistureContent}</div>
                  <p className="text-[11px] text-slate-500">Oven-dried & hot-wash tested</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Tare Weighbridge</span>
                  <div className="text-sm font-bold text-emerald-700">±0.5% Calibrated Tare</div>
                  <p className="text-[11px] text-slate-500">Destination mill-gate verified slip</p>
                </div>
              </div>

              {/* Chemical Composition Breakdown (if present) */}
              {item.composition && item.composition.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#0ea5e9]" />
                      <span>Verified Elemental Composition (XRF Assay)</span>
                    </h4>
                    <span className="text-xs text-slate-400">Values calibrated against ASTM/IS standards</span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-xs sm:text-sm text-left">
                      <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">Element</th>
                          <th className="py-2.5 px-4">Symbol</th>
                          <th className="py-2.5 px-4 text-right">Assayed Content</th>
                          <th className="py-2.5 px-4 text-right">Tolerance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {item.composition.map((comp, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                            <td className="py-2.5 px-4 font-semibold text-slate-900">{comp.element}</td>
                            <td className="py-2.5 px-4 font-mono text-slate-500">{comp.symbol}</td>
                            <td className="py-2.5 px-4 text-right font-mono font-bold text-[#0284c7]">
                              {comp.percentage}%
                            </td>
                            <td className="py-2.5 px-4 text-right text-slate-500 text-xs font-mono">
                              {comp.tolerance || '±0.01%'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Material Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {item.description || `${materialName} collected directly from industrial fabrication, demolition, and manufacturing streams. Prepared and packaged for direct furnace melt charges or secondary processing.`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Packaging</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">Compressed Bales / Loose Bulk</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Standard Logistics</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">20ft / 40ft Multi-Axle Trucks</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Inspection Mode</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">Yard Calibration & Weighbridge</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specifications (Alibaba-style 2-Column Key-Value Table) */}
          {activeTab === 'specs' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">Technical Specifications</h3>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#0ea5e9]" />
                  ISRI Standard Spec Sheet
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody>
                    {[
                      { key: 'Material Type', val: materialName },
                      { key: 'Material Classification', val: item.grade || 'Industrial Scrap' },
                      { key: 'Contamination Level', val: '< 1.5% non-metallic attachments' },
                      { key: 'Typical Bulk Density', val: '65 – 75 lbs/cu.ft (bale compressed)' },
                      { key: 'Sourcing Region', val: item.origin },
                      { key: 'Moisture Limit', val: '< 0.5% max permissible' },
                      { key: 'Physical Form', val: 'Sheared lengths / hydraulic baled lots' },
                      { key: 'Minimum Order Quantity', val: `${moqKg.toLocaleString('en-IN')} kg` },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}>
                        <td className="py-3 px-4 sm:px-6 font-semibold text-slate-700 w-1/3 border-r border-slate-200">
                          {row.key}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-slate-900 font-medium">
                          {row.val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: How We Source */}
          {activeTab === 'sourcing' && (
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Our Sourcing & Verification Process</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Yard Audit & On-Site Inspection</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Materials are pre-checked at certified partner yards to verify purity, sizing, and absence of foreign debris.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Weighbridge Electronic Slips</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tare and gross weight are digitally logged with stamped slips before truck dispatch to prevent weight discrepancies.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Destination Escrow Release</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Buyers inspect the delivery at their plant gate. Funds in escrow are released only after buyer acceptance.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 4. FREQUENTLY ASKED QUESTIONS (Dedicated Section Below Product Page)       */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-2 uppercase tracking-wider bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
              <HelpCircle className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f1115]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Common questions about ordering, logistics, custom volumes, and escrow protection for {materialName}.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#0ea5e9] transition-colors cursor-pointer bg-slate-50/50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#0ea5e9]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3 font-normal leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RELATED BULK MATERIALS (Cross-sell Items)                              */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#0f1115]">
              Related Bulk Materials
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Other industrial inventory frequently ordered by bulk buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedMaterials.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelatedItem ? onSelectRelatedItem(rel) : onOpenRFQ(rel)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#0ea5e9]/70 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={rel.primaryImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#0f1115] group-hover:text-[#0ea5e9] transition-colors line-clamp-1">
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

      </div>
    </div>
  );
};
