import React, { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';

interface MarketlyFooterProps {
  onGoHome: () => void;
  onSelectCategory?: (cat: string) => void;
  onOpenCategoriesPage?: (cat?: string) => void;
  onOpenAdvisorPage?: () => void;
  onOpenQuotes?: () => void;
  onOpenContactUs?: () => void;
}

export const MarketlyFooter: React.FC<MarketlyFooterProps> = ({
  onGoHome,
  onOpenCategoriesPage,
  onOpenAdvisorPage,
  onOpenQuotes,
  onOpenContactUs,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white border-t border-[#E2E2E0] pt-14 pb-8 text-sm text-[#4B5563]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-column layout desktop, stacked/accordion on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          
          {/* Col 1: Brand Column */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2.5 cursor-pointer"
              onClick={onGoHome}
            >
              <img
                src="/logo.png"
                alt="WasteMarket"
                className="w-8 h-8 object-contain rounded-lg shadow-2xs"
              />
              <span className="text-xl font-bold tracking-tight text-[#0F2A47]">
                wastemarket
              </span>
            </div>

            <p className="text-[15px] font-normal text-[#374151] leading-relaxed">
              Bulk scrap, graded and guaranteed.
            </p>

            {/* Newsletter: "Get Market Rate Updates" minimal field */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0F2A47] mb-2">
                Get Market Rate Updates
              </div>
              <form onSubmit={handleSubscribe} className="flex items-center max-w-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email"
                  className="w-full text-xs px-3 py-2 bg-[#F7F8FA] border border-[#E2E2E0] rounded-l-[6px] focus:outline-none focus:border-[#0D9488] text-[#0F2A47]"
                />
                <button
                  type="submit"
                  className="bg-[#0F2A47] hover:bg-[#0D9488] text-white text-xs font-semibold px-3 py-2 rounded-r-[6px] transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : 'Subscribe'}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-[#0D9488] mt-1 font-medium">
                  Subscribed for daily LME scrap alerts.
                </p>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2A47]">
              Quick Links
            </div>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => onOpenCategoriesPage && onOpenCategoriesPage('all')}
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left"
                >
                  All Scrap Lots
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('how-it-works');
                  }}
                  className="hover:text-[#0D9488] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenContactUs && onOpenContactUs()}
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left"
                >
                  About Us & Yard Office
                </button>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('faq');
                  }}
                  className="hover:text-[#0D9488] transition-colors"
                >
                  FAQ
                </a>
              </li>
              {onOpenAdvisorPage && (
                <li>
                  <button
                    onClick={onOpenAdvisorPage}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer text-left font-medium"
                  >
                    AI Metallurgical Advisor
                  </button>
                </li>
              )}
              {onOpenQuotes && (
                <li>
                  <button
                    onClick={onOpenQuotes}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer text-left"
                  >
                    Buyer Quotes & Tracking
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2A47]">
              Legal
            </div>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={onOpenContactUs}
                  className="hover:text-[#0D9488] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContactUs}
                  className="hover:text-[#0D9488] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContactUs}
                  className="hover:text-[#0D9488] transition-colors text-left cursor-pointer"
                >
                  Guarantee Policy
                </button>
              </li>
              <li>
                <span className="text-xs text-[#6B7280]">
                  RBI-Compliant Escrow Account Protected
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2A47]">
              Contact
            </div>
            <div className="space-y-2 text-[14px]">
              <div>
                <span className="text-xs text-[#6B7280] block">Official Email:</span>
                <a
                  href="mailto:support@wastemarket.in"
                  className="text-[#0F2A47] font-medium hover:text-[#0D9488] transition-colors"
                >
                  support@wastemarket.in
                </a>
              </div>

              <div>
                <span className="text-xs text-[#6B7280] block">Support Phone:</span>
                <span className="text-[#0F2A47] font-medium block">
                  1800 890 7272 (Toll-Free)
                </span>
                <span className="text-[#0F2A47] text-xs font-medium block">
                  +91 (022) 6982 4100 (Direct)
                </span>
              </div>

              {/* WhatsApp Button: small Teal pill button with icon */}
              <div className="pt-2">
                <a
                  href="https://wa.me/9118008907272?text=Hello%20WasteMarket,%20I%20would%20like%20to%20request%20a%20bulk%20scrap%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0D9488] hover:bg-[#0b7e74] text-white px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center space-x-2 shadow-2xs transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar: thin top border, centered, 13px muted text */}
        <div className="pt-6 border-t border-[#E2E2E0] text-center text-[13px] text-[#9CA3AF]">
          © 2026 wastemarket. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
