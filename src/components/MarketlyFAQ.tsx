import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Pricing & Escrow' | 'Grading & Assays' | 'Logistics' | 'Support';
}

interface MarketlyFAQProps {
  onOpenContactUs?: () => void;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do you grade material quality without me seeing it in person?',
    answer:
      'Every batch is scanned, photographed, and subjected to spectrographic XRF assay verification. Our AI metallurgical model correlates elemental composition with ISRI scrap specifications, ensuring certified assay accuracy before you commit.',
    category: 'Grading & Assays',
  },
  {
    question: 'How does Razorpay Escrow protect my payment on bulk lots?',
    answer:
      'All buyer deposits are locked in an RBI-compliant Razorpay Nodal Escrow account. Funds are only disbursed to the supplier after your port/yard weighbridge receipt and assay inspection confirm the shipment matches verified contract specifications.',
    category: 'Pricing & Escrow',
  },
  {
    question: "What happens if the delivered material doesn't match the quote or assay?",
    answer:
      'You are covered by our 100% Quality & Delivery Guarantee. If delivered cargo shows greater than 1.5% assay variance or weight discrepancy, our dispute protocol freezes escrow disbursement and initiates prompt refund or replacement.',
    category: 'General',
  },
  {
    question: 'How is the scrap lot price determined?',
    answer:
      'Pricing is benchmarked in real-time against live LME (London Metal Exchange) cash indices and Indian domestic yard pricing, indexed by verified scrap grade purity. No arbitrary markups or opaque haggling.',
    category: 'Pricing & Escrow',
  },
  {
    question: 'What spectrographic testing standards (XRF/OES) do you require?',
    answer:
      'Suppliers must provide certified Thermo Niton or Olympus handheld XRF spectrographic test sheets showing elemental percentage breakdowns (Cu, Fe, Al, Zn, Pb, Sn) along with moisture and unrecovered non-metallic deduction ratios.',
    category: 'Grading & Assays',
  },
  {
    question: 'What are your delivery, CIF maritime freight, and weighbridge terms?',
    answer:
      'We offer both Ex-Yard dispatch and CIF port delivery (Nhava Sheva, Mundra, Chennai, Hazira). Every consignment includes certified electronic weighbridge gross/tare slips and seal-tamper photos.',
    category: 'Logistics',
  },
  {
    question: 'Do I need to visit the supplier yard or inspect the material myself?',
    answer:
      'No. We handle supplier licensing verification, physical yard audit, digital lot tagging, and assay inspection so international and domestic buyers can source with institutional confidence.',
    category: 'General',
  },
  {
    question: 'How fast will I get a quote or dispatch confirmation?',
    answer:
      'Automated price indications are generated instantly by our AI Advisor. Formal supplier RFQ responses with verified freight schedules are delivered within 2 to 4 business hours.',
    category: 'Logistics',
  },
  {
    question: 'How can our scrap yard register as an approved verified supplier?',
    answer:
      'Scrap yards submit valid GSTIN, Factory/Yard License, Pollution Control Board (PCB) Consent to Operate (CTO), and past 12-month spectrographic track records. Site inspection is scheduled within 4 business days.',
    category: 'Support',
  },
  {
    question: 'How do I contact the Grievance Redressal Officer or compliance team?',
    answer:
      'Under Consumer Protection E-Commerce Rules and Razorpay Guidelines, you can reach our Grievance Officer, Mr. Rajesh K. Singhania, at grievance-officer@wastemarket.in or +91 (022) 6982 4115. Formal response is guaranteed within 48 hours.',
    category: 'Support',
  },
];

const CATEGORIES = ['All', 'General', 'Pricing & Escrow', 'Grading & Assays', 'Logistics', 'Support'] as const;

export const MarketlyFAQ: React.FC<MarketlyFAQProps> = ({ onOpenContactUs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Filter items by search query and category
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuestion = item.question.toLowerCase().includes(q);
        const matchesAnswer = item.answer.toLowerCase().includes(q);
        return matchesQuestion || matchesAnswer;
      }
      return true;
    });
  }, [searchQuery, activeCategory]);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#ffffff]">
      {/* Centered Framer Container (max-width 760px, as in akfaq.framer.website) */}
      <div className="max-w-[760px] mx-auto">
        
        {/* Top Header & Badge (AK FAQ Style) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/60 text-[#888888] text-[11px] font-semibold tracking-wider uppercase mb-3">
            <span>FAQ</span>
          </div>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0f0f0f] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-[#666666] mt-2 max-w-lg mx-auto font-normal leading-relaxed">
            Everything you need to know. Can't find the answer?{' '}
            {onOpenContactUs ? (
              <button
                onClick={onOpenContactUs}
                className="text-[#0ea5e9] hover:underline font-semibold cursor-pointer"
              >
                Contact our team.
              </button>
            ) : (
              <a href="#contact" className="text-[#0ea5e9] hover:underline font-semibold">
                Contact our team.
              </a>
            )}
          </p>
        </div>

        {/* 1. Interactive Search Bar (AK FAQ Style) */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-white border border-black/[0.08] focus:border-[#0ea5e9] rounded-[10px] py-2.5 pl-10 pr-9 text-[13.5px] text-[#0f0f0f] placeholder:text-[#999999] outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Category Filter Tabs (AK FAQ Style) */}
        <div className="flex items-center gap-1.5 flex-wrap mb-5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[12px] font-medium py-1.5 px-3.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0f0f0f] text-white border border-[#0f0f0f] shadow-2xs'
                    : 'bg-transparent text-[#666666] hover:text-[#0f0f0f] border border-black/[0.08] hover:border-black/[0.16]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3. Numbered Accordion Items (01, 02, 03... AK FAQ Style) */}
        <div className="space-y-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-[10px] bg-slate-50 border border-black/[0.06] text-[13.5px] text-[#666666]">
              No questions match your search. Try another keyword or category.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              const formattedNumber = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-[10px] border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#0ea5e9]/50 shadow-xs'
                      : 'border-black/[0.08] hover:border-black/[0.16]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    {/* Left: Number + Question Text */}
                    <div className="flex items-start space-x-3.5 flex-1 pr-2">
                      <span className="font-mono text-[13px] font-bold text-[#bbbbbb] shrink-0 mt-0.5">
                        {formattedNumber}
                      </span>
                      <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#0f0f0f] leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    {/* Right: Circular Blue Toggle Button (Matching user preference) */}
                    <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center text-[#0ea5e9]">
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-6 h-6 stroke-[#0ea5e9] fill-none transition-transform duration-300 ${
                          isOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2.2" />
                        <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2.2" strokeLinecap="round" />
                        <line
                          x1="12"
                          y1="8"
                          x2="12"
                          y2="16"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          className={`transition-all duration-200 origin-center ${
                            isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                          }`}
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable Answer */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 pl-[45px] sm:pl-[49px] animate-in fade-in duration-200">
                      <p className="text-[13.5px] text-[#666666] leading-[1.6] font-normal">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 4. Bottom Footer CTA Card (AK FAQ Style: Still have questions? We're here to help.) */}
        <div className="mt-6 rounded-[12px] bg-[#f7f7f5] border border-black/[0.06] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-[15px] text-[#0f0f0f]">
              Still have questions?
            </h4>
            <p className="text-[13px] text-[#666666] mt-0.5 font-normal">
              We're here to help. Reach our 24/7 scrap logistics & escrow desk.
            </p>
          </div>

          <button
            onClick={() => {
              if (onOpenContactUs) onOpenContactUs();
              else {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[10px] inline-flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer active:scale-98 shrink-0"
          >
            <span>Contact our team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
