import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  FileCheck2, 
  Activity, 
  ArrowRight,
  TrendingDown,
  Truck
} from 'lucide-react';

interface BentoMasterpieceProps {
  onOpenRFQ?: () => void;
  onExploreCatalog?: () => void;
}

export const BentoMasterpiece: React.FC<BentoMasterpieceProps> = ({ onOpenRFQ, onExploreCatalog }) => {
  const [activeTab, setActiveTab] = useState<'steel' | 'copper' | 'aluminum'>('steel');

  const specs = {
    steel: {
      title: 'HMS 1 & 2 (80:20) Induction Furnace Grade',
      purity: '99.85% Pure Steel Charge',
      debris: '< 0.8% Non-Ferrous Attachments',
      sulfur: '0.028% (Safe EAF Limit < 0.05%)',
      density: '0.85 MT/m³ Compressed',
      certification: 'ISRI 200–206 XRF Certified',
    },
    copper: {
      title: 'Millberry High-Conductivity Copper Wire',
      purity: '99.99% Electrolytic Copper',
      debris: '0.00% Varnish / Insulation',
      sulfur: 'Lead < 5ppm (Laser LIBS Verified)',
      density: '250kg Dense Hydraulic Briquettes',
      certification: 'ISRI "Berry" Spectro Certified',
    },
    aluminum: {
      title: 'Aluminum 6063 Clean Extrusion Scrap',
      purity: '98.90% Pure 6063 Architectural Alloy',
      debris: '< 0.5% Paint / Anodizing Residue',
      sulfur: 'Magnesium 0.55%, Silicon 0.42%',
      density: 'Hydraulic Pressed Bales',
      certification: 'ISRI "Tutu" Lab Certified',
    },
  };

  const currentSpec = specs[activeTab];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-3 uppercase tracking-wider bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>Industrial Trust Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115]">
            The Zero-Guesswork Standard
          </h2>
          <p className="text-xs sm:text-sm text-[#495057] mt-2 font-normal max-w-xl">
            How modern secondary induction furnaces and recycling mills eliminate contamination fraud, broker tollgates, and weighbridge theft.
          </p>
        </div>

        <div className="shrink-0 flex items-center space-x-3">
          <button
            onClick={onExploreCatalog}
            className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            Explore Verified Catalog
          </button>
          <button
            onClick={onOpenRFQ}
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-[0_4px_14px_rgba(14,165,233,0.3)] cursor-pointer active:scale-98"
          >
            Request Batch Quote
          </button>
        </div>
      </div>

      {/* Asymmetric 4-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Card 1: Large Interactive Purity & Chemical Spec (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6 hover:shadow-[0_16px_36px_rgba(14,165,233,0.08)] transition-all">
          <div>
            {/* Tag & Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Pre-Dispatch Digital Assay</h3>
                  <p className="text-[11px] text-slate-400">Elemental Purity & Contamination Verification</p>
                </div>
              </div>

              {/* Material Switcher Tabs */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center space-x-1 text-xs">
                {(['steel', 'copper', 'aluminum'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all capitalize cursor-pointer ${
                      activeTab === tab 
                        ? 'bg-white text-slate-900 shadow-2xs' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Spec Card Highlight */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c101c] text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-bold text-xs sm:text-sm text-sky-400">
                  {currentSpec.title}
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                  {currentSpec.certification}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Assayed Purity</span>
                  <strong className="text-white text-sm font-bold font-mono">{currentSpec.purity}</strong>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Tolerance Ceiling</span>
                  <strong className="text-emerald-400 text-sm font-bold font-mono">{currentSpec.debris}</strong>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Chemistry Safety</span>
                  <strong className="text-slate-200 text-xs font-medium font-mono">{currentSpec.sulfur}</strong>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Physical Form</span>
                  <strong className="text-slate-200 text-xs font-medium font-mono">{currentSpec.density}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Every dispatch includes signed lab spectrographic slip
            </span>
            <span className="text-[11px] text-slate-400 font-mono">ISRI Compliant</span>
          </div>
        </div>

        {/* Card 2: 100% Escrow Protection Flow (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#090A0F] to-[#121624] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full font-bold">
                100% Capital Protection
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Razorpay Escrow Assurance
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Never pay advance cash to unvetted yards. Your money is secured in bank escrow and disbursed only after your weighbridge inspection.
            </p>

            {/* Visual Step-by-Step Pipeline */}
            <div className="mt-6 space-y-3">
              {[
                { step: '1', title: 'Fund Escrow', desc: 'Buyer deposits order funds into secure Razorpay Escrow account.' },
                { step: '2', title: 'Yard Dispatch', desc: 'Partner yard loads containers with electronic tare slip & GPS tracker.' },
                { step: '3', title: 'Weighbridge Confirmation', desc: 'Truck arrives at your mill gate; net weight & purity are checked.' },
                { step: '4', title: 'Fund Release', desc: 'Buyer digitally confirms weighbridge slip to release payment.' },
              ].map((s, i) => (
                <div key={i} className="flex items-start space-x-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>Dispute Window: 48 Hours</span>
            <span className="text-emerald-400 font-bold">Zero Broker Exposure</span>
          </div>
        </div>

        {/* Card 3: Calibrated Electronic Weighbridge Slips (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-5">
          <div>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Scale className="w-4 h-4" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Calibrated Digital Weighbridge Slips
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Weighbridge tampering is the #1 complaint in scrap procurement. We enforce dual-calibrated gross, tare, and net telemetry on all dispatches.
            </p>

            {/* Simulated Digital Slip Receipt */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[10px] pb-2 border-b border-slate-200">
                <span>DIGITAL WEIGHBRIDGE SLIP</span>
                <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">VERIFIED</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Gross Weight:</span>
                <strong className="text-slate-900">32,480 kg</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Tare Truck Weight:</span>
                <strong className="text-slate-900">12,120 kg</strong>
              </div>
              <div className="flex justify-between text-slate-900 font-bold pt-1.5 border-t border-slate-200 text-sm">
                <span>Certified Net Charge:</span>
                <span className="text-[#0ea5e9]">20,360 kg</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Zero moisture padding</span>
            <span className="font-semibold text-slate-800">Tamper-Evident QR Slip</span>
          </div>
        </div>

        {/* Card 4: Direct Yard Network & Mill Transport (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-slate-500">
                12 Industrial Mill Corridors
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Direct-from-Smelter Yard Allocations
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
              Connect directly to certified industrial yards with dedicated logistics lanes to Mandi Gobindgarh, Jalna, Raipur, Peenya Bengaluru, Bhiwandi, and Coimbatore.
            </p>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              {[
                { label: 'Jalna IF Cluster', time: '24–48h Delivery' },
                { label: 'Mandi Gobindgarh', time: '48–72h Delivery' },
                { label: 'Peenya / Bengaluru', time: 'Same-Day Dispatch' },
                { label: 'Gujarat GIDC Smelters', time: '24–36h Delivery' },
              ].map((hub, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-xs text-slate-900 truncate">{hub.label}</div>
                  <div className="text-[10px] text-[#0ea5e9] font-medium mt-0.5">{hub.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
            <span>Containerized & open-trailer logistics ready</span>
            <span className="font-mono text-[#0ea5e9] font-bold">100% Weighbridge Stamped</span>
          </div>
        </div>

      </div>

    </section>
  );
};
