import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  FileText, 
  User, 
  LogIn, 
  CheckCircle2, 
  Scale, 
  HelpCircle, 
  X,
  Layers,
  Phone,
  Mail,
  Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MarketlyFooterProps {
  onGoHome: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenCategoriesPage?: (cat?: string) => void;
  onOpenAdvisorPage?: () => void;
  onOpenQuotes?: () => void;
  onOpenContactUs?: () => void;
  onOpenRFQ?: () => void;
  onOpenImageSearch?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
  onOpenProfile?: () => void;
  currentPage?: string;
}

type LegalModalType = 'terms' | 'privacy' | 'isri' | null;

export const MarketlyFooter: React.FC<MarketlyFooterProps> = ({ 
  onGoHome, 
  onSelectCategory,
  onOpenCategoriesPage,
  onOpenAdvisorPage,
  onOpenQuotes,
  onOpenContactUs,
  onOpenRFQ,
  onOpenImageSearch,
  onOpenAuth,
  onOpenProfile,
  currentPage = 'marketplace',
}) => {
  const { isAuthenticated } = useAuth();
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  // Helper for cross-page section navigation
  const handleNavigateToSection = (sectionId: string) => {
    if (currentPage !== 'marketplace') {
      onGoHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="w-full bg-white border-t border-black/[0.08] pt-16 pb-12 text-[#495057] text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-black/[0.06]">
          
          {/* Col 1: Brand Info (2 Cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer w-fit" onClick={onGoHome}>
              <img 
                src="/logo.png" 
                alt="WasteMarket" 
                className="w-8 h-8 object-contain rounded-lg shadow-xs" 
              />
              <span className="text-lg font-bold tracking-tight text-[#0f1115]">
                wastemarket<span className="bg-gradient-to-r from-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent">.in</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-[#0f1115] leading-relaxed">
              "Bulk scrap, graded and guaranteed."
            </p>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              India's premier AI-powered B2B industrial scrap sourcing network. Certified optical spectrometry grading, mill gate tare verification, and Razorpay Escrow protection.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0" />
                <span>support@wastemarket.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ISRI 2026 Assayed • Mill Gate Weighbridge Tare Guarantee</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation (Accurate Site Map) */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0f1115]">
              Navigation
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button 
                  onClick={onGoHome} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('all') : onGoHome()} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Categories Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection('available-lots')} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Live Material Lots
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection('how-it-works')} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection('target-sectors')} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Target Sectors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection('why-us')} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Why wastemarket.in
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection('faq')} 
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Trade FAQs
                </button>
              </li>
              {onOpenQuotes && (
                <li>
                  <button 
                    onClick={onOpenQuotes} 
                    className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                  >
                    My Orders & Quotes
                  </button>
                </li>
              )}
              {onOpenContactUs && (
                <li>
                  <button
                    onClick={onOpenContactUs}
                    className="hover:text-[#0284c7] text-[#0ea5e9] font-semibold transition-colors cursor-pointer text-left"
                  >
                    Contact & Grievances
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Quick Links (Actionable Shortcuts) */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0f1115]">
              Quick Links
            </div>
            <ul className="space-y-2 font-medium">
              {onOpenRFQ && (
                <li>
                  <button
                    onClick={onOpenRFQ}
                    className="hover:text-[#0284c7] text-[#0ea5e9] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left group"
                  >
                    <span>Post Sourcing RFQ</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
              )}
              {onOpenImageSearch && (
                <li>
                  <button
                    onClick={onOpenImageSearch}
                    className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <Camera className="w-3 h-3 text-[#0ea5e9]" />
                    <span>AI Visual Scrap Matcher</span>
                  </button>
                </li>
              )}
              {onOpenAdvisorPage && (
                <li>
                  <button 
                    onClick={onOpenAdvisorPage} 
                    className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <Sparkles className="w-3 h-3 text-[#0ea5e9]" />
                    <span>AI Sourcing Advisor</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => handleNavigateToSection('why-us')}
                  className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                >
                  Trade Escrow Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (isAuthenticated && onOpenProfile) {
                      onOpenProfile();
                    } else if (onOpenAuth) {
                      onOpenAuth('signin');
                    }
                  }}
                  className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  {isAuthenticated ? (
                    <>
                      <User className="w-3 h-3 text-[#0ea5e9]" />
                      <span>My Account Profile</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3 h-3 text-[#0ea5e9]" />
                      <span>Sign In / Create Account</span>
                    </>
                  )}
                </button>
              </li>
              {onOpenContactUs && (
                <li>
                  <button
                    onClick={onOpenContactUs}
                    className="hover:text-[#0284c7] transition-colors cursor-pointer text-left"
                  >
                    Help & Support Desk
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Top Scrap Grades (Direct Catalog Navigation) */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#0f1115]">
              Top Scrap Grades
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('ferrous') : onSelectCategory('ferrous')} 
                  className="hover:text-[#0284c7] transition-colors text-left cursor-pointer"
                >
                  Heavy Melting Steel (HMS 1/2)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('non-ferrous') : onSelectCategory('non-ferrous')} 
                  className="hover:text-[#0284c7] transition-colors text-left cursor-pointer"
                >
                  Copper Millberry 99.9%
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('non-ferrous') : onSelectCategory('non-ferrous')} 
                  className="hover:text-[#0284c7] transition-colors text-left cursor-pointer"
                >
                  Aluminum 6063 Extrusions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('battery') : onSelectCategory('battery')} 
                  className="hover:text-[#0284c7] transition-colors text-left cursor-pointer"
                >
                  Lead-Acid Drained Batteries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('plastics') : onSelectCategory('plastics')} 
                  className="hover:text-[#0284c7] transition-colors text-left cursor-pointer"
                >
                  PET Bottle Flakes & Regrind
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenCategoriesPage ? onOpenCategoriesPage('paper') : onSelectCategory('paper')} 
                  className="hover:text-[#0284c7] transition-colors text-left cursor-pointer"
                >
                  OCC Kraft Cardboard Bales
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row & Legal Modals */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#919eab]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-xs font-semibold text-[#0f1115]">wastemarket.in</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Copyright © {new Date().getFullYear()} WasteMarket Technologies India Pvt. Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setLegalModal('terms')} 
              className="hover:text-[#0f1115] cursor-pointer transition-colors"
            >
              Terms and Conditions
            </button>
            <button 
              onClick={() => setLegalModal('privacy')} 
              className="hover:text-[#0f1115] cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setLegalModal('isri')} 
              className="hover:text-[#0f1115] cursor-pointer transition-colors"
            >
              ISRI Scrap Standards
            </button>
          </div>
        </div>

      </div>

      {/* Legal & Standards Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0ea5e9] flex items-center justify-center">
                  {legalModal === 'terms' && <FileText className="w-4 h-4" />}
                  {legalModal === 'privacy' && <ShieldCheck className="w-4 h-4" />}
                  {legalModal === 'isri' && <Scale className="w-4 h-4" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {legalModal === 'terms' && 'Terms and Conditions of Trade'}
                  {legalModal === 'privacy' && 'Privacy & Data Protection Policy'}
                  {legalModal === 'isri' && 'ISRI 2026 Scrap Grading Specifications'}
                </h3>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {legalModal === 'terms' && (
                <>
                  <p className="font-semibold text-slate-900">1. Nature of the Platform</p>
                  <p>wastemarket.in operates a verified B2B procurement platform for industrial recyclables and secondary raw materials. All transactions represent commercial bulk purchases subject to Indian Contract Act, 1872 regulations.</p>
                  
                  <p className="font-semibold text-slate-900">2. Tare Weight & Delivery Verification</p>
                  <p>All delivered lot weights are verified against the destination mill-gate calibrated weighbridge slip. In the event of tare discrepancy exceeding ±0.5%, the buyer is credited the net variance automatically.</p>

                  <p className="font-semibold text-slate-900">3. Escrow Settlement</p>
                  <p>Funds deposited for orders are held securely in a licensed Escrow account (powered by Razorpay Escrow). Settlement to the vendor is triggered only upon chemical/density acceptance at destination.</p>

                  <p className="font-semibold text-slate-900">4. Non-Spec Rejection & Dispute Resolution</p>
                  <p>Materials failing pre-agreed chemical spectrometry tolerances (OES/XRF assay) are eligible for immediate rejection or renegotiated re-grading with zero penalty to the buyer.</p>
                </>
              )}

              {legalModal === 'privacy' && (
                <>
                  <p className="font-semibold text-slate-900">1. Data Privacy Commitment</p>
                  <p>wastemarket.in is committed to protecting commercial confidentiality. We do not sell, rent, or publicly expose your mill pricing or proprietary scrap recipes to third-party brokers.</p>

                  <p className="font-semibold text-slate-900">2. Information We Collect</p>
                  <p>We collect corporate trade details, delivery mill addresses, verified weighbridge slips, and user contact details necessary for order dispatch, billing, and regulatory GST compliance.</p>

                  <p className="font-semibold text-slate-900">3. Security & Encryption</p>
                  <p>All communications, purchase requests, and transaction histories are secured using enterprise 256-bit SSL encryption. Payment and escrow instruments are processed through RBI-authorized payment aggregators.</p>
                </>
              )}

              {legalModal === 'isri' && (
                <>
                  <p className="font-semibold text-slate-900">1. Standardized Circular Specifications</p>
                  <p>wastemarket.in utilizes the Institute of Scrap Recycling Industries (ISRI) circular specifications to grade every metal, polymer, and paper lot traded across the platform.</p>

                  <p className="font-semibold text-slate-900">2. Ferrous Standards</p>
                  <p>• <strong>HMS 1 (ISRI 200)</strong>: Clean iron and steel scrap, minimum thickness 1/4 inch, charging box size.<br />• <strong>HMS 2 (ISRI 201/202)</strong>: Iron and steel scrap, black and galvanized, minimum thickness 1/8 inch.<br />• <strong>Shredded (ISRI 211)</strong>: Homogeneous iron and steel scrap magnetically separated.</p>

                  <p className="font-semibold text-slate-900">3. Non-Ferrous & Polymers</p>
                  <p>• <strong>Copper Millberry (ISRI Barley)</strong>: Clean, untinned, uncoated unalloyed copper wire.<br />• <strong>Aluminum 6063 (ISRI Tutu)</strong>: Clean alloy extrusions with zero thermal break or iron attachments.<br />• <strong>PET Flakes</strong>: Hot-washed clear flakes with moisture &lt; 0.8% and zero PVC contamination.</p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
