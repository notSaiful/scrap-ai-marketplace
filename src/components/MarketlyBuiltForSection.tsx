import React from 'react';
import { Flame, Factory, Car, TrendingUp, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export const MarketlyBuiltForSection: React.FC = () => {
  const personas = [
    {
      icon: Flame,
      title: 'Foundries & Smelters',
      description: 'Source furnace-ready scrap with guaranteed chemical purity, precise recovery ratios, and zero broker markups.',
      perks: ['Assayed XRF reports', 'CIF maritime delivery', 'Consistent monthly tonnage'],
    },
    {
      icon: Factory,
      title: 'Scrap Yards & Recyclers',
      description: 'Monetize processed scrap lots globally with automated proforma quotes, verified buyers, and secure escrow.',
      perks: ['Global buyer network', 'Instant digital RFQs', 'Escrow payment safety'],
    },
    {
      icon: Car,
      title: 'Automotive & OEM Plants',
      description: 'Streamline off-spec industrial turnings and stamping scrap with auditable ESG and circular economy traceability.',
      perks: ['ESG compliance reporting', 'Factory pickup logistics', 'Certified destruction'],
    },
    {
      icon: TrendingUp,
      title: 'Commodity Traders',
      description: 'Capitalize on real-time LME scrap arbitrage with flexible incoterms (FOB/CIF) and verified pre-shipment inspections.',
      perks: ['LME price tracking', 'Multi-currency settlement', 'Pre-shipment assays'],
    },
    {
      icon: Sparkles,
      title: 'Metallurgical Labs',
      description: 'Standardize scrap classification against ISRI, ASTM, and DIN standards with optical spectrometry verification.',
      perks: ['Standardized grades', 'Elemental composition', 'Impurity threshold alerts'],
    },
    {
      icon: Building2,
      title: 'Global Enterprises',
      description: 'Manage cross-border scrap procurement with centralized compliance, multi-terminal tracking, and enterprise volume quotas.',
      perks: ['Enterprise volume tier', 'Dedicated trade desk', 'Cross-border clearance'],
    },
  ];

  return (
    <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 px-3 py-1 rounded-full">
          Tailored Scrap Solutions
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#0f1115] tracking-tight mt-3">
          Built for everyone. Perfect for…
        </h2>
        <p className="text-xs sm:text-sm text-[#495057] mt-2 font-normal">
          Designed specifically for the modern secondary metal supply chain, from local recycling yards to global foundries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-black/[0.08] hover:border-[#38bdf8] p-6 shadow-xs hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-200/60 text-[#0ea5e9] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0f1115] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[#495057] leading-relaxed font-normal mb-4">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.05] space-y-2">
                {p.perks.map((perk, i) => (
                  <div key={i} className="flex items-center text-[11px] text-[#495057] space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
