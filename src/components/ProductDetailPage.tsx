import React, { useState } from 'react';
import { ScrapItem } from '../types/scrap';
import { SCRAP_ITEMS } from '../data/scrapData';
import {
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  Sparkles
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
  // Gallery images
  const allImages = [
    item.primaryImage,
    ...(item.images || []),
  ].filter(Boolean).slice(0, 4);
  const [selectedImage, setSelectedImage] = useState<string>(item.primaryImage);

  // Material pricing
  const baseRatePerTon = item.pricePerTon > 1000 ? Math.round(item.pricePerTon * 83) : Math.round(item.pricePerTon * 85);
  const baseRate = Math.round(baseRatePerTon / 1000);
  const minPrice = Math.max(1, Math.round(baseRate * 0.95));
  const maxPrice = Math.max(1, Math.round(baseRate * 1.05));

  // Minimum MOQ for products is 10
  const moqKg = 10;
  const [quantity, setQuantity] = useState<number>(10);

  const relatedMaterials = SCRAP_ITEMS.filter((s) => s.id !== item.id).slice(0, 3);

  return (
    <div className="w-full bg-[#FBFBFC] pt-24 sm:pt-28 pb-28 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        {/* Main Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-xs">
              <img
                src={selectedImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                      selectedImage === imgUrl ? 'border-[#0ea5e9] ring-2 ring-sky-100' : 'border-slate-200/80 hover:border-slate-300'
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
            )}
          </div>

          {/* Right: Order & Pricing Panel */}
          <div className="lg:col-span-5 space-y-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
            {/* Title & Category */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-2">
                <span>{item.categoryName}</span>
                <span>•</span>
                <span className="font-mono text-slate-500">{item.grade}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {item.title}
              </h1>
            </div>

            {/* Price Display */}
            <div className="pb-5 border-b border-slate-100">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Indicative Benchmark Price
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-slate-500"> / kg</span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Order Quantity</span>
                <span className="text-slate-400 font-normal">Min. MOQ: {moqKg} kg</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(moqKg, quantity - 1))}
                    disabled={quantity <= moqKg}
                    className="p-3 text-slate-600 hover:text-black hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                      if (!isNaN(val)) setQuantity(val);
                    }}
                    onBlur={() => {
                      if (quantity < moqKg) setQuantity(moqKg);
                    }}
                    className="w-16 text-sm font-bold text-slate-900 text-center bg-transparent focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-400 pr-3">kg</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-slate-600 hover:text-black hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title="Increase quantity by 1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Est. Total: <span className="font-bold text-slate-900">₹{(minPrice * quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={() => onOpenRFQ(item, quantity)}
              className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all shadow-[0_8px_20px_rgba(14,165,233,0.25)] active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Place Order ({quantity.toLocaleString('en-IN')} kg)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Escrow note */}
            <div className="pt-3 flex items-center space-x-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Razorpay Escrow • Verified destination weighbridge tare</span>
            </div>
          </div>

        </div>

        {/* Specifications & Details (Clean & Minimalist) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8 shadow-xs">
          
          {/* Material Description */}
          {item.description && (
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">About this Material</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {item.description}
              </p>
            </div>
          )}

          {/* AI Specification & Technical Parameters Grid */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
              <h2 className="text-base font-bold text-slate-900">AI Specification & Quality Assay</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Assay Purity</span>
                <div className="text-lg font-bold text-[#0284c7] font-mono">{item.aiSpecs.purityScore}%</div>
                <div className="text-[11px] text-slate-500">{item.aiSpecs.verificationBadge}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ISRI Code</span>
                <div className="text-lg font-bold text-slate-900 font-mono">{item.aiSpecs.isriCode}</div>
                <div className="text-[11px] text-slate-500">Standardized classification</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Impurity Limit</span>
                <div className="text-lg font-bold text-slate-900">{item.aiSpecs.impurityTolerance}</div>
                <div className="text-[11px] text-slate-500">Zero foreign attachments</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Moisture Limit</span>
                <div className="text-lg font-bold text-slate-900">{item.aiSpecs.moistureContent}</div>
                <div className="text-[11px] text-slate-500">Oven-tested maximum</div>
              </div>
            </div>
          </div>

          {/* Elemental Chemical Composition (if present) */}
          {item.composition && item.composition.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900">Chemical Composition (XRF Assay)</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Element</th>
                      <th className="py-2.5 px-4">Symbol</th>
                      <th className="py-2.5 px-4 text-right">Content</th>
                      <th className="py-2.5 px-4 text-right">Tolerance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {item.composition.map((comp, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">{comp.element}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-500">{comp.symbol}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-[#0284c7]">
                          {comp.percentage}%
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate-500 font-mono text-xs">
                          {comp.tolerance || 'Max'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Similar Materials (Clean & Unobtrusive) */}
        {relatedMaterials.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Similar Materials</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedMaterials.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelatedItem ? onSelectRelatedItem(rel) : onOpenRFQ(rel)}
                  className="bg-white rounded-xl border border-slate-200/80 hover:border-[#0ea5e9]/70 overflow-hidden shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group p-3.5 space-y-3"
                >
                  <div className="aspect-[16/10] w-full rounded-lg bg-slate-100 overflow-hidden">
                    <img
                      src={rel.primaryImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0ea5e9] transition-colors line-clamp-1">
                      {rel.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {rel.categoryName} • {rel.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
