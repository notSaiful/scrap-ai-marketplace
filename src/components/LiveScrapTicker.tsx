import React from 'react';
import { TrendingUp, TrendingDown, Sparkles, Activity } from 'lucide-react';

interface TickerItem {
  id: string;
  name: string;
  category: string;
  ratePerKg: number;
  changePercent: number;
  isUp: boolean;
  market: string;
}

const LIVE_BENCHMARKS: TickerItem[] = [
  { id: 'hms-steel', name: 'Steel HMS 1/2 (80:20)', category: 'ferrous', ratePerKg: 42.50, changePercent: 1.4, isUp: true, market: 'Jalna / Mandi IF' },
  { id: 'millberry-cu', name: 'Millberry Copper 99.99%', category: 'non-ferrous', ratePerKg: 748.00, changePercent: -0.3, isUp: false, market: 'LME Secondary Spot' },
  { id: 'al-6063', name: 'Aluminum Extrusion 6063', category: 'non-ferrous', ratePerKg: 184.50, changePercent: 0.8, isUp: true, market: 'Domestic Ingot' },
  { id: 'brass-honey', name: 'Secondary Yellow Brass', category: 'non-ferrous', ratePerKg: 462.00, changePercent: 0.5, isUp: true, market: 'Jamnagar Bench' },
  { id: 'pet-flakes', name: 'Clean Hot-Washed PET Flakes', category: 'plastics', ratePerKg: 44.20, changePercent: 2.1, isUp: true, market: 'Polymer Spot' },
  { id: 'hdpe-regrind', name: 'HDPE Blow Moulding Regrind', category: 'plastics', ratePerKg: 52.80, changePercent: -0.6, isUp: false, market: 'Extrusion Spot' },
  { id: 'occ-11', name: 'Kraft OCC 11 Bales', category: 'paper', ratePerKg: 17.80, changePercent: 0.0, isUp: true, market: 'Morbi / Vapi Mill' },
];

interface LiveScrapTickerProps {
  onSelectCategory?: (category: string) => void;
}

export const LiveScrapTicker: React.FC<LiveScrapTickerProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full bg-[#090A0F] border-y border-white/[0.08] text-white overflow-hidden select-none py-2.5">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        
        {/* Live Market Badge on Left */}
        <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-white/10 shrink-0 text-xs font-semibold text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-wide uppercase text-[10px] text-slate-400 font-mono font-bold">
            Live Spot Rates
          </span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee flex items-center space-x-6 sm:space-x-8">
            {[...LIVE_BENCHMARKS, ...LIVE_BENCHMARKS].map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => onSelectCategory?.(item.category)}
                className="group inline-flex items-center space-x-2.5 text-xs text-left cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                <span className="font-medium text-slate-300 group-hover:text-[#38bdf8] transition-colors">
                  {item.name}
                </span>

                <span className="font-mono font-bold text-white tracking-tight">
                  ₹{item.ratePerKg.toFixed(2)}<span className="text-[10px] font-normal text-slate-400">/kg</span>
                </span>

                <span className={`inline-flex items-center text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                  item.changePercent > 0
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : item.changePercent < 0
                    ? 'text-rose-400 bg-rose-500/10'
                    : 'text-slate-400 bg-slate-500/10'
                }`}>
                  {item.changePercent > 0 ? (
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                  ) : item.changePercent < 0 ? (
                    <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                  ) : null}
                  {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                </span>

                <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
                  [{item.market}]
                </span>

                <span className="text-white/15 px-1">•</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
