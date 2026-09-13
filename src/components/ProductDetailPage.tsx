import React, { useState } from 'react';
import { ScrapItem } from '../types/scrap';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  Truck, 
  Scale, 
  Building, 
  Award, 
  FileCheck2, 
  Send, 
  Clock, 
  Share2, 
  Heart, 
  Info,
  ChevronRight,
  Calculator,
  MessageSquare
} from 'lucide-react';

interface ProductDetailPageProps {
  item: ScrapItem;
  onBack: () => void;
  onOpenRFQ: (item: ScrapItem, quantity?: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  item,
  onBack,
  onOpenRFQ,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'specs' | 'lab' | 'shipping' | 'supplier'>('specs');
  const [orderQuantity, setOrderQuantity] = useState<number>(item.moq);
  const [isFavorited, setIsFavorited] = useState(false);

  // Calculate tier price based on order quantity
  const calculateUnitPrice = (qty: number) => {
    for (const tier of item.priceTiers) {
      if (tier.maxQty) {
        if (qty >= tier.minQty && qty <= tier.maxQty) {
          return tier.price;
        }
      } else {
        if (qty >= tier.minQty) {
          return tier.price;
        }
      }
    }
    return item.pricePerTon;
  };

  const currentUnitPrice = calculateUnitPrice(orderQuantity);
  const totalPrice = currentUnitPrice * orderQuantity;

  return (
    <div className="w-full bg-[#f8fafc] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Apple Style Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <button 
              onClick={onBack}
              className="flex items-center space-x-1.5 font-bold text-[#1d1d1f] hover:text-black bg-white border border-black/[0.08] px-3.5 py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-all active:scale-[0.98]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Back to Marketplace</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="hover:text-black cursor-pointer font-medium text-slate-600">{item.categoryName}</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#1d1d1f] font-bold truncate max-w-xs sm:max-w-md">{item.title}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsFavorited(!isFavorited)} 
              className={`p-2 rounded-full border transition-all active:scale-[0.96] ${
                isFavorited 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-black/[0.08] text-slate-600 hover:bg-slate-50'
              }`}
              title="Save scrap lot"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
            </button>
            <button 
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="p-2 rounded-full bg-white border border-black/[0.08] text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.96]"
              title="Share listing link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Main Showcase Section (Apple 2-Column Product Layout) */}
        <div className="bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_24px_-2px_rgba(0,0,0,0.05)] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Image Gallery & Inspection Seal (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* Main Preview Image */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                <img
                  src={item.images[activeImageIndex] || item.primaryImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* AI Purity Badge Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-black font-bold text-xs px-3 py-1 rounded-full shadow-md border border-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
                  <span>{item.aiSpecs.purityScore}% AI Assayed Purity</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-mono">
                  {activeImageIndex + 1} / {item.images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#38bdf8] ring-2 ring-sky-200'
                        : 'border-slate-200 hover:border-sky-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* AI Yard Inspection Guarantee Box */}
              <div className="bg-gradient-to-r from-sky-50/80 to-blue-50/80 rounded-xl p-4 border border-sky-200">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] text-white rounded-lg shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-black uppercase tracking-wide">
                        {item.aiSpecs.verificationBadge}
                      </span>
                      <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        {item.aiSpecs.aiConfidence}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.aiSpecs.spectrographicSummary}
                    </p>
                    <div className="text-[11px] text-slate-500 font-medium pt-1 flex items-center gap-3">
                      <span>Inspection Date: {item.aiSpecs.scanDate}</span>
                      <span>•</span>
                      <span>ISRI: {item.aiSpecs.isriCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Tier Pricing, Specs & CTA (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Supplier Header Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{item.supplier.flag}</span>
                    <span className="font-bold text-xs text-black hover:text-slate-700 cursor-pointer">
                      {item.supplier.name}
                    </span>
                    {item.supplier.isVerified && (
                      <span className="bg-slate-100 text-black text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-slate-200">
                        <ShieldCheck className="w-3 h-3 text-blue-600" />
                        Verified Yard
                      </span>
                    )}
                    <span className="text-xs text-slate-500">({item.supplier.yearsInBusiness} yrs)</span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-600">
                    <span>Rating: <strong className="text-black">★ {item.supplier.rating}</strong> ({item.supplier.reviewsCount})</span>
                    <span>•</span>
                    <span>Response: <strong className="text-black">{item.supplier.responseTime}</strong></span>
                  </div>
                </div>

                {/* Scrap Title */}
                <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight mt-3">
                  {item.title}
                </h1>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  {item.subtitle}
                </p>

                {/* Tiered Volume Pricing Table (Apple Style) */}
                <div className="mt-5 bg-[#f5f5f7] rounded-2xl p-4 border border-black/[0.05]">
                  <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-2.5">
                    Tiered Volume Pricing ({item.currency} / {item.unit})
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {item.priceTiers.map((tier, idx) => {
                      const isActiveTier = orderQuantity >= tier.minQty && (!tier.maxQty || orderQuantity <= tier.maxQty);
                      return (
                        <div 
                          key={idx}
                          className={`p-3 rounded-xl border transition-all ${
                            isActiveTier 
                              ? 'bg-white border-[#38bdf8] ring-2 ring-sky-200/60 shadow-xs' 
                              : 'bg-white/70 border-black/[0.05]'
                          }`}
                        >
                          <div className="text-xs font-medium text-[#86868b]">
                            {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${tier.unit}` : `≥ ${tier.minQty} ${tier.unit}`}
                          </div>
                          <div className="text-lg sm:text-xl font-semibold text-[#1d1d1f] mt-1 tracking-tight">
                            ${tier.price.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-[#86868b]">
                            per {tier.unit}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-[#86868b] px-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Scale className="w-3.5 h-3.5 text-[#0ea5e9]" />
                      Min. Order (MOQ): <b className="text-[#1d1d1f] font-semibold">{item.moq} {item.moqUnit}</b>
                    </span>
                    <span className="text-emerald-700 font-medium">
                      Available Stock: {item.availableStock.toLocaleString()} {item.stockUnit}
                    </span>
                  </div>
                </div>

                {/* Key Scrap Attributes Grid */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 bg-[#f5f5f7] rounded-xl border border-black/[0.04]">
                    <div className="text-[#86868b] text-[10px] uppercase font-semibold">Grade / Spec</div>
                    <div className="font-semibold text-[#1d1d1f] mt-0.5 truncate">{item.grade}</div>
                  </div>

                  <div className="p-3 bg-[#f5f5f7] rounded-xl border border-black/[0.04]">
                    <div className="text-[#86868b] text-[10px] uppercase font-semibold">Port of Loading</div>
                    <div className="font-semibold text-[#1d1d1f] mt-0.5 truncate">{item.loadingPort}</div>
                  </div>

                  <div className="p-3 bg-[#f5f5f7] rounded-xl border border-black/[0.04]">
                    <div className="text-[#86868b] text-[10px] uppercase font-semibold">Incoterms</div>
                    <div className="font-semibold text-[#1d1d1f] mt-0.5 truncate">{item.shippingTerms.join(', ')}</div>
                  </div>

                  <div className="p-3 bg-[#f5f5f7] rounded-xl border border-black/[0.04]">
                    <div className="text-[#86868b] text-[10px] uppercase font-semibold">Origin Yard</div>
                    <div className="font-semibold text-[#1d1d1f] mt-0.5 truncate">{item.origin}</div>
                  </div>

                  <div className="p-3 bg-[#f5f5f7] rounded-xl border border-black/[0.04]">
                    <div className="text-[#86868b] text-[10px] uppercase font-semibold">Moisture Spec</div>
                    <div className="font-semibold text-[#1d1d1f] mt-0.5 truncate">{item.aiSpecs.moistureContent}</div>
                  </div>

                  <div className="p-3 bg-[#f5f5f7] rounded-xl border border-black/[0.04]">
                    <div className="text-[#86868b] text-[10px] uppercase font-semibold">Impurity Cap</div>
                    <div className="font-semibold text-[#1d1d1f] mt-0.5 truncate">{item.aiSpecs.impurityTolerance}</div>
                  </div>
                </div>

                {/* Interactive Order Calculator */}
                <div className="mt-4 p-3.5 bg-white rounded-2xl border border-black/[0.08] shadow-2xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-[#1d1d1f]">Order Quantity:</span>
                    <div className="flex items-center bg-[#f5f5f7] rounded-full p-0.5 border border-black/[0.06]">
                      <button
                        onClick={() => setOrderQuantity(Math.max(item.moq, orderQuantity - 5))}
                        className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 text-[#1d1d1f] font-semibold text-sm shadow-2xs flex items-center justify-center transition-all"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Math.max(item.moq, Number(e.target.value) || item.moq))}
                        className="w-14 text-center font-semibold text-sm focus:outline-none bg-transparent text-[#1d1d1f]"
                        min={item.moq}
                      />
                      <button
                        onClick={() => setOrderQuantity(orderQuantity + 5)}
                        className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 text-[#1d1d1f] font-semibold text-sm shadow-2xs flex items-center justify-center transition-all"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-[#86868b] font-medium">MT</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#86868b] block font-medium">Estimated Lot Total:</span>
                    <span className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                      ${totalPrice.toLocaleString()} <span className="text-xs font-normal text-[#86868b]">USD</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Apple Style CTAs) */}
              <div className="pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenRFQ(item, orderQuantity)}
                  className="apple-btn-primary flex-1 py-3 px-6 text-xs font-semibold shadow-xs flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request for Quotation (RFQ)</span>
                </button>

                <button
                  onClick={() => onOpenRFQ(item, orderQuantity)}
                  className="apple-btn-secondary flex-1 py-3 px-6 text-xs font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#0ea5e9]" />
                  <span>Contact Recycler</span>
                </button>

                <button
                  onClick={() => alert(`Sample Request Logged: 5kg spectrographic test piece from lot ${item.id} will be expedited.`)}
                  className="apple-btn-secondary sm:w-auto py-3 px-5 text-xs font-medium"
                >
                  Request Sample
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs Section (Apple Segmented Style) */}
        <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Apple Segmented Control Tab Track */}
          <div className="p-4 sm:p-5 border-b border-black/[0.06] bg-[#f5f5f7]/60 flex items-center justify-start overflow-x-auto">
            <div className="apple-segmented-track">
              <button
                onClick={() => setSelectedTab('specs')}
                className={`apple-segmented-item whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                  selectedTab === 'specs' ? 'active' : 'hover:text-[#1d1d1f]'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Technical Specifications</span>
              </button>

              <button
                onClick={() => setSelectedTab('lab')}
                className={`apple-segmented-item whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                  selectedTab === 'lab' ? 'active' : 'hover:text-[#1d1d1f]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
                <span>AI Spectrograph & Certificate</span>
              </button>

              <button
                onClick={() => setSelectedTab('shipping')}
                className={`apple-segmented-item whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                  selectedTab === 'shipping' ? 'active' : 'hover:text-[#1d1d1f]'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Packaging & Logistics</span>
              </button>

              <button
                onClick={() => setSelectedTab('supplier')}
                className={`apple-segmented-item whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                  selectedTab === 'supplier' ? 'active' : 'hover:text-[#1d1d1f]'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Recycler Yard Profile</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Chemical & Technical Specifications */}
          {selectedTab === 'specs' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-black mb-2">Material Description & Standards</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-black mb-3">Elemental Spectrometric Composition</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-black font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Element</th>
                        <th className="py-2.5 px-4">Symbol</th>
                        <th className="py-2.5 px-4">Percentage Concentration</th>
                        <th className="py-2.5 px-4">Tolerance / Standard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {item.composition.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-bold text-black">{comp.element}</td>
                          <td className="py-2.5 px-4 font-mono text-black font-bold">{comp.symbol}</td>
                          <td className="py-2.5 px-4 font-bold text-black">{comp.percentage}%</td>
                          <td className="py-2.5 px-4 text-slate-600">{comp.tolerance || 'Standard'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Industrial Applications</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {item.application}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: AI Spectrograph & Lab Certificate */}
          {selectedTab === 'lab' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#0284c7]" />
                    <span className="font-bold text-sm text-black">AI Quality Inspection Dossier</span>
                  </div>
                  <span className="text-xs font-mono text-black bg-white px-2.5 py-1 rounded border border-slate-200 font-bold">
                    ISRI {item.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.aiSpecs.spectrographicSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-semibold uppercase text-[10px]">AI Purity Score</div>
                  <div className="text-2xl font-black text-black mt-1">{item.aiSpecs.purityScore}%</div>
                  <p className="text-slate-600 text-[11px] mt-1">Direct LIBS optical emission spectral validation.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-semibold uppercase text-[10px]">Moisture Index</div>
                  <div className="text-2xl font-black text-black mt-1">{item.aiSpecs.moistureContent}</div>
                  <p className="text-slate-600 text-[11px] mt-1">Microwave sensor calibrated for freight moisture safety.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-semibold uppercase text-[10px]">Impurity Tolerance</div>
                  <div className="text-2xl font-black text-black mt-1">{item.aiSpecs.impurityTolerance}</div>
                  <p className="text-slate-600 text-[11px] mt-1">Zero radioactive contamination detected (0.00 µSv/h).</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Packaging & Vessel Logistics */}
          {selectedTab === 'shipping' && (
            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-black">Maritime Freight & Packaging</h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-black">Packaging Method:</strong> {item.packaging}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 border border-slate-200 rounded-xl">
                  <div className="font-bold text-black mb-1 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0284c7]" />
                    <span>Loading Port</span>
                  </div>
                  <p className="text-slate-700">{item.loadingPort} (Customs cleared terminal)</p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl">
                  <div className="font-bold text-black mb-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#0284c7]" />
                    <span>Lead Time & Dispatch</span>
                  </div>
                  <p className="text-slate-700">Dispatched within 5 business days upon LC or Escrow confirmation</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Recycler Yard Profile */}
          {selectedTab === 'supplier' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{item.supplier.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.supplier.name}</h3>
                  <p className="text-xs text-slate-500">{item.supplier.yardLocation}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Years Active</div>
                  <div className="font-bold text-slate-800 mt-0.5">{item.supplier.yearsInBusiness} Years</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Response Rate</div>
                  <div className="font-bold text-slate-800 mt-0.5">{item.supplier.responseRate}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Annual Capacity</div>
                  <div className="font-bold text-slate-800 mt-0.5">{item.supplier.annualSupplyCapacity}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-400 text-[10px]">Buyer Satisfaction</div>
                  <div className="font-bold text-amber-600 mt-0.5">★ {item.supplier.rating} / 5.0</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
