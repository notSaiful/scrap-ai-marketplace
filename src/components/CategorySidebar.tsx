import React from 'react';
import { 
  Layers, 
  Coins, 
  Cpu, 
  Boxes, 
  Car, 
  FileText, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Award,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/scrapData';

interface CategorySidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-4 h-4 text-[#0284c7]" />;
      case 'Coins': return <Coins className="w-4 h-4 text-amber-500" />;
      case 'Anvil': return <TrendingUp className="w-4 h-4 text-slate-600" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-emerald-600" />;
      case 'Boxes': return <Boxes className="w-4 h-4 text-sky-500" />;
      case 'Car': return <Car className="w-4 h-4 text-purple-600" />;
      case 'FileText': return <FileText className="w-4 h-4 text-amber-600" />;
      default: return <Layers className="w-4 h-4 text-[#0284c7]" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Category Header (Alibaba style) */}
      <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#0284c7]" />
          <span>Categories for you</span>
        </h3>
        <span className="text-[11px] text-[#0284c7] font-semibold cursor-pointer hover:underline" onClick={() => onSelectCategory('all')}>
          View all
        </span>
      </div>

      {/* Category List */}
      <div className="divide-y divide-slate-100">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left transition-colors group ${
                isSelected
                  ? 'bg-sky-50/80 text-[#0284c7] font-semibold border-l-4 border-[#38bdf8]'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0284c7]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="p-1 rounded-md bg-slate-100 group-hover:bg-white transition-colors">
                  {getIcon(cat.iconName)}
                </span>
                <span className="truncate max-w-[150px]">{cat.name}</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  {cat.count}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-transform ${isSelected ? 'text-[#0284c7]' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Alibaba Style Trust & Services Card below sidebar */}
      <div className="p-4 bg-gradient-to-b from-slate-50 to-sky-50/50 border-t border-slate-200">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>wastemarket.in Guarantees</span>
        </div>
        
        <div className="space-y-2 text-[11px] text-slate-600">
          <div className="flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Assay Verification:</span>
              <p className="text-slate-500">LIBS & XRF spectrographic purity scans on all lots.</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Award className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">ISRI Standardized:</span>
              <p className="text-slate-500">Universal recycling grades and moisture tests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
