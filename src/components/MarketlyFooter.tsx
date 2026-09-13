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
    <footer className="w-full bg-[#0F2A47] text-slate-300 pt-16 pb-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-column responsive footer (stacks/accordions on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          
          {/* Col 1: Brand Column (wastemarket + tagline) */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2.5 cursor-pointer"
              onClick={onGoHome}
            >
              <img
                src="/logo.png"
                alt="WasteMarket"
                className="w-8 h-8 object-contain rounded-lg bg-white/10 p-0.5"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                wastemarket
              </span>
            </div>

            <p className="text-[15px] font-normal text-slate-300 leading-relaxed max-w-xs">
              Bulk scrap, graded and guaranteed.
            </p>

            <div className="text-xs text-slate-400">
              Institutional trading network with RBI-compliant Razorpay escrow settlement.
            </div>
          </div>

          {/* Col 2: Quick Links (About, FAQ, Contact, How It Works) */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </div>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => onOpenContactUs && onOpenContactUs()}
                  className="hover:text-[#1F9D74] transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('faq');
                  }}
                  className="hover:text-[#1F9D74] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenContactUs && onOpenContactUs()}
                  className="hover:text-[#1F9D74] transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('how-it-works');
                  }}
                  className="hover:text-[#1F9D74] transition-colors"
                >
                  How It Works
                </a>
              </li>
              {onOpenQuotes && (
                <li>
                  <button
                    onClick={onOpenQuotes}
                    className="hover:text-[#1F9D74] transition-colors cursor-pointer text-left"
                  >
                    Buyer Quotes & Tracking
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Legal (Terms of Service, Privacy Policy, Guarantee Policy) */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Legal
            </div>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={onOpenContactUs}
                  className="hover:text-[#1F9D74] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContactUs}
                  className="hover:text-[#1F9D74] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContactUs}
                  className="hover:text-[#1F9D74] transition-colors text-left cursor-pointer"
                >
                  Guarantee Policy
                </button>
              </li>
              <li>
                <span className="text-xs text-slate-400">
                  ISRI Specifications Standardized
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact (email, phone, a distinct teal pill 'Chat on WhatsApp' button) */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </div>
            <div className="space-y-2.5 text-[14px]">
              <div>
                <span className="text-xs text-slate-400 block">Email:</span>
                <a
                  href="mailto:support@wastemarket.in"
                  className="text-white font-medium hover:text-[#1F9D74] transition-colors"
                >
                  support@wastemarket.in
                </a>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Phone:</span>
                <span className="text-white font-medium block">
                  1800 890 7272 (Toll-Free)
                </span>
                <span className="text-slate-300 text-xs font-medium block">
                  +91 (022) 6982 4100 (Direct)
                </span>
              </div>

              {/* Distinct Teal Pill 'Chat on WhatsApp' button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/9118008907272?text=Hello%20WasteMarket,%20I%20would%20like%20to%20request%20a%20bulk%20scrap%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1F9D74] hover:bg-[#18805e] text-white px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center space-x-2 shadow-sm transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Below the columns, a minimal single-input email + 'Subscribe' button for 'Get Market Rate Updates' */}
        <div className="py-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">
              Get Market Rate Updates
            </div>
            <div className="text-xs text-slate-400">
              Receive verified weekly LME indices and Indian port pricing.
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center max-w-sm w-full sm:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email"
              className="w-full sm:w-64 text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-l-[8px] focus:outline-none focus:border-[#1F9D74] text-white placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-[#1F9D74] hover:bg-[#18805e] text-white text-xs font-semibold px-4 py-2.5 rounded-r-[8px] transition-colors shrink-0 cursor-pointer"
            >
              {subscribed ? <Check className="w-4 h-4 text-white" /> : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom bar: thin top border, centered 13px muted '© 2026 wastemarket. All rights reserved.' */}
        <div className="pt-6 border-t border-white/10 text-center text-[13px] text-slate-400">
          © 2026 wastemarket. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
