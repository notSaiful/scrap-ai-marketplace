import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Scale, 
  Zap 
} from 'lucide-react';

interface MaterialConfig {
  id: string;
  name: string;
  category: string;
  baseRatePerKg: number;
  grade: string;
  density: string;
}

const MATERIALS: MaterialConfig[] = [
  { id: 'steel-hms', name: 'Steel HMS 1 & 2 (80:20)', category: 'Ferrous', baseRatePerKg: 42.50, grade: 'ISRI 200–206', density: '0.85 MT/m³' },
  { id: 'copper-millberry', name: 'Millberry Copper Wire 99.99%', category: 'Non-Ferrous', baseRatePerKg: 748.00, grade: 'ISRI "Berry"', density: 'Compressed Briquette' },
  { id: 'aluminum-6063', name: 'Aluminum Extrusion Scrap 6063', category: 'Non-Ferrous', baseRatePerKg: 184.50, grade: 'ISRI "Tutu"', density: 'Clean Baled' },
  { id: 'pet-flakes', name: 'Hot-Washed PET Flakes', category: 'Polymers', baseRatePerKg: 44.20, grade: 'Clear Optical Sort', density: 'Jumbo PP Bags' },
  { id: 'occ-cardboard', name: 'OCC 11 Kraft Bales', category: 'Paper', baseRatePerKg: 17.80, grade: 'Grade 11 Corrugated', density: 'Hydraulic Compressed' },
];

interface DestinationCluster {
  id: string;
  city: string;
  state: string;
  transitDays: string;
  freightPerKg: number; // in INR
}

const DESTINATIONS: DestinationCluster[] = [
  { id: 'bengaluru', city: 'Bengaluru / Peenya', state: 'Karnataka', transitDays: '1–2 Days', freightPerKg: 1.80 },
  { id: 'mandi', city: 'Mandi Gobindgarh', state: 'Punjab', transitDays: '3–4 Days', freightPerKg: 2.80 },
  { id: 'jalna', city: 'Jalna Industrial Zone', state: 'Maharashtra', transitDays: '2–3 Days', freightPerKg: 2.10 },
  { id: 'raipur', city: 'Raipur Steel Hub', state: 'Chhattisgarh', transitDays: '2–4 Days', freightPerKg: 2.40 },
  { id: 'bhiwandi', city: 'Mumbai / Bhiwandi', state: 'Maharashtra', transitDays: '2–3 Days', freightPerKg: 2.00 },
  { id: 'coimbatore', city: 'Coimbatore Foundry Cluster', state: 'Tamil Nadu', transitDays: '1–2 Days', freightPerKg: 1.90 },
];

interface LandedCostSimulatorProps {
  onLockRateAndRequestRFQ?: (payload: { materialName: string; quantityKg: number; targetRate: number; destination: string }) => void;
}

export const LandedCostSimulator: React.FC<LandedCostSimulatorProps> = ({ onLockRateAndRequestRFQ }) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('steel-hms');
  const [quantityKg, setQuantityKg] = useState<number>(5000);
  const [destinationId, setDestinationId] = useState<string>('bengaluru');

  const activeMaterial = useMemo(() => 
    MATERIALS.find(m => m.id === selectedMaterialId) || MATERIALS[0]
  , [selectedMaterialId]);

  const activeDestination = useMemo(() => 
    DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0]
  , [destinationId]);

  // Dynamic Volume Discount Tier (large tonnage gets yard bulk incentive)
  const volumeDiscountPerKg = useMemo(() => {
    if (quantityKg >= 20000) return 1.50;
    if (quantityKg >= 10000) return 0.90;
    if (quantityKg >= 2500) return 0.40;
    return 0.00;
  }, [quantityKg]);

  // Calculations
  const adjustedYardRatePerKg = Math.max(1, activeMaterial.baseRatePerKg - volumeDiscountPerKg);
  const landedRatePerKg = adjustedYardRatePerKg + activeDestination.freightPerKg;
  const subtotal = Math.round(landedRatePerKg * quantityKg);
  const gstEstimated = Math.round(subtotal * 0.18);
  const totalLandedCost = subtotal + gstEstimated;

  const handleTriggerRFQ = () => {
    if (onLockRateAndRequestRFQ) {
      onLockRateAndRequestRFQ({
        materialName: activeMaterial.name,
        quantityKg,
        targetRate: Math.round(landedRatePerKg),
        destination: `${activeDestination.city}, ${activeDestination.state}`,
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header Badge & Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0ea5e9] mb-3 uppercase tracking-wider bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full">
          <Calculator className="w-3.5 h-3.5 text-[#0ea5e9]" />
          <span>Transparent Landed Pricing</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f1115]">
          Interactive Landed Cost Simulator
        </h2>
        <p className="text-xs sm:text-sm text-[#495057] mt-2 font-normal">
          Simulate verified scrap costs delivered directly to your mill gate with zero broker margins and full weighbridge escrow protection.
        </p>
      </div>

      {/* Simulator Master Bento Container */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* Left Column: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-7 border-b lg:border-b-0 lg:border-r border-black/[0.06]">
            
            {/* Control 1: Select Material */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5 flex items-center justify-between">
                <span>1. Select Feedstock Material</span>
                <span className="text-[11px] font-normal text-slate-400">Spec: {activeMaterial.grade}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MATERIALS.map(mat => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedMaterialId(mat.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedMaterialId === mat.id
                        ? 'bg-sky-50/70 border-[#0ea5e9] shadow-xs'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {mat.name.split('(')[0]}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${selectedMaterialId === mat.id ? 'bg-[#0ea5e9]' : 'bg-slate-300'}`} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                      <span>{mat.category}</span>
                      <strong className="font-mono text-slate-800 font-bold">₹{mat.baseRatePerKg.toFixed(2)}/kg</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Quantity Slider (in kg) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Order Volume
                </label>
                <div className="flex items-center space-x-2">
                  {volumeDiscountPerKg > 0 && (
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      -₹{volumeDiscountPerKg.toFixed(2)}/kg bulk discount applied
                    </span>
                  )}
                  <span className="text-sm sm:text-base font-extrabold text-[#0ea5e9] font-mono">
                    {quantityKg.toLocaleString('en-IN')} kg
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={500}
                max={40000}
                step={250}
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
                <span>500 kg (Trial)</span>
                <span>5,000 kg (Single Axle)</span>
                <span>20,000 kg (Trailer)</span>
                <span>40,000 kg (Multi-Drop)</span>
              </div>
            </div>

            {/* Control 3: Destination Mill Cluster */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5 flex items-center justify-between">
                <span>3. Destination Mill Cluster</span>
                <span className="text-[11px] font-normal text-slate-400 flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#0ea5e9]" />
                  Transit: {activeDestination.transitDays}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DESTINATIONS.map(dest => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setDestinationId(dest.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      destinationId === dest.id
                        ? 'bg-sky-50/80 border-[#0ea5e9] shadow-xs'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {dest.city}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                      <span>{dest.state}</span>
                      <span className="font-mono text-slate-600">+₹{dest.freightPerKg.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Computed Quote Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-[#090a0f] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Live Proforma Estimate
                    </h4>
                    <p className="text-[10px] text-slate-400">Direct Mill Gate Landed Cost</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                  Zero Broker Spreads
                </span>
              </div>

              {/* Large Computed Rate */}
              <div className="my-6">
                <div className="text-xs text-slate-400">Estimated Landed Price:</div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 font-mono">
                  ₹{landedRatePerKg.toFixed(2)}
                  <span className="text-sm font-normal text-slate-400"> / kg</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Includes direct yard charge + freight to {activeDestination.city}
                </div>
              </div>

              {/* Itemized Breakdown Rows */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Yard Base Benchmark:</span>
                  <span className="font-mono">₹{activeMaterial.baseRatePerKg.toFixed(2)} / kg</span>
                </div>

                {volumeDiscountPerKg > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Bulk Allocation Discount:</span>
                    <span className="font-mono">-₹{volumeDiscountPerKg.toFixed(2)} / kg</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span>Logistics & Freight to {activeDestination.city}:</span>
                  <span className="font-mono">+₹{activeDestination.freightPerKg.toFixed(2)} / kg</span>
                </div>

                <div className="flex justify-between text-slate-300 pt-1 border-t border-white/5">
                  <span>Subtotal ({quantityKg.toLocaleString('en-IN')} kg):</span>
                  <span className="font-mono font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>GST (18% Reverse Charge):</span>
                  <span className="font-mono">₹{gstEstimated.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Estimated Outlay:</span>
                  <span className="font-mono text-[#38bdf8] text-base">₹{totalLandedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Escrow Guarantee */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleTriggerRFQ}
                className="w-full bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl transition-all shadow-[0_4px_20px_rgba(14,165,233,0.35)] active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Lock This Rate & Request Allocation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Protected by Razorpay Escrow. Released post-weighbridge.</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
