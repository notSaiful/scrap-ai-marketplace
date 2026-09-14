import React from 'react';
import { ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

interface MarketlyFooterProps {
  onGoHome: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenCategoriesPage?: (cat?: string) => void;
  onOpenAdvisorPage?: () => void;
  onOpenQuotes?: () => void;
  onOpenContactUs?: () => void;
}

export const MarketlyFooter: React.FC<MarketlyFooterProps> = ({ 
  onGoHome, 
  onSelectCategory,
  onOpenCategoriesPage,
  onOpenAdvisorPage,
  onOpenQuotes,
  onOpenContactUs,
}) => {
  return (
    <footer id="contact" className="w-full bg-white border-t border-black/[0.08] pt-16 pb-12 text-[#495057] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-black/[0.06]">
          
          {/* Col 1: Brand Info (2 Cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={onGoHome}>
              <img 
                src="/logo.png" 
                alt="WasteMarket" 
                className="w-8 h-8 object-contain rounded-lg shadow-xs" 
              />
              <span className="text-lg font-bold tracking-tight text-[#0f1115]">
                wastemarket<span className="bg-gradient-to-r from-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent">.in</span>
              </span>
            </div>

            <p className="text-sm font-medium text-[#0f1115] leading-relaxed max-w-sm">
              Bulk scrap, graded and guaranteed.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-[#495057] pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free Trade Escrow • ISRI Assayed • ISO Certified</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0f1115]">
              Navigation
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('all') : onGoHome()} 
                  className="hover:text-[#0f1115] transition-colors cursor-pointer"
                >
                  Categories Directory
                </button>
              </li>
              {onOpenAdvisorPage && (
                <li>
                  <button 
                    onClick={onOpenAdvisorPage} 
                    className="hover:text-[#0284c7] text-[#0ea5e9] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>AI Advisor</span>
                  </button>
                </li>
              )}
              {onOpenQuotes && (
                <li>
                  <button 
                    onClick={onOpenQuotes} 
                    className="hover:text-[#0f1115] transition-colors cursor-pointer"
                  >
                    My Orders
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('all') : onGoHome()} 
                  className="hover:text-[#0f1115] transition-colors cursor-pointer"
                >
                  All Scrap Listings
                </button>
              </li>
              <li>
                <a href="#highlights" className="hover:text-[#0f1115] transition-colors">
                  Top Highlights
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#0f1115] transition-colors">
                  Why wastemarket.in
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#0f1115] transition-colors">
                  Industry Reviews
                </a>
              </li>
              {onOpenContactUs && (
                <li>
                  <button
                    onClick={onOpenContactUs}
                    className="hover:text-[#0284c7] font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Contact & Grievances
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0f1115]">
              Quick Links
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#faq" className="hover:text-[#0f1115] transition-colors">
                  Trade FAQs
                </a>
              </li>
              <li>
                <span className="hover:text-[#0f1115] transition-colors cursor-pointer">
                  LME Scrap Index
                </span>
              </li>
              <li>
                <span className="hover:text-[#0f1115] transition-colors cursor-pointer">
                  Post Scrap RFQ
                </span>
              </li>
              <li>
                <span className="hover:text-[#0f1115] transition-colors cursor-pointer">
                  Trade Escrow Protection
                </span>
              </li>
              <li>
                <span className="hover:text-[#0f1115] transition-colors cursor-pointer">
                  KYC Yard Onboarding
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Scrap Grades */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0f1115]">
              Top Scrap Grades
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('non-ferrous') : onSelectCategory('non-ferrous')} 
                  className="hover:text-[#0f1115] transition-colors text-left cursor-pointer"
                >
                  Copper Millberry 99.9%
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('ferrous') : onSelectCategory('ferrous')} 
                  className="hover:text-[#0f1115] transition-colors text-left cursor-pointer"
                >
                  Heavy Melting Steel (HMS 1/2)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('non-ferrous') : onSelectCategory('non-ferrous')} 
                  className="hover:text-[#0f1115] transition-colors text-left cursor-pointer"
                >
                  Aluminum 6063 Extrusions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('battery') : onSelectCategory('battery')} 
                  className="hover:text-[#0f1115] transition-colors text-left cursor-pointer"
                >
                  Lead-Acid Drained Batteries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('plastics') : onSelectCategory('plastic')} 
                  className="hover:text-[#0f1115] transition-colors text-left cursor-pointer"
                >
                  PET Bottle Flakes & Regrind
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#919eab]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-xs font-semibold text-[#0f1115]">"Bulk scrap, graded and guaranteed."</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Copyright © {new Date().getFullYear()} wastemarket.in</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-[#0f1115] cursor-pointer transition-colors">
              Terms and Conditions
            </span>
            <span className="hover:text-[#0f1115] cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-[#0f1115] cursor-pointer transition-colors">
              ISRI Scrap Standards
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
