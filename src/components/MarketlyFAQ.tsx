import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface MarketlyFAQProps {
  onOpenContactUs?: () => void;
}

export const MarketlyFAQ: React.FC<MarketlyFAQProps> = ({ onOpenContactUs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const faqs = [
    {
      question: 'How do you grade material quality without me seeing it in person?',
      answer:
        'Every batch is scanned, photographed, and subjected to spectrographic XRF assay verification. Our AI metallurgical model correlates elemental composition with ISRI scrap specifications, ensuring certified assay accuracy before you commit.',
    },
    {
      question: "What happens if the delivered material doesn't match the quote?",
      answer:
        "You are backed by our Delivery Guarantee. If what arrives doesn't match what was promised, our dispute protocol freezes escrow disbursement and we make it right with an immediate replacement or full refund. No disputes, no runaround.",
    },
    {
      question: 'How fast will I get a quote?',
      answer:
        'Automated price indications are generated instantly by our AI platform. Formal verified supplier quotes with locked freight logistics and delivery schedules are delivered within 2 to 4 business hours.',
    },
    {
      question: 'Do I need to visit a supplier or inspect the material myself?',
      answer:
        'No. We handle supplier licensing verification, physical yard audits, digital weight logging, and assay inspections so you never have to gamble on site visits or phone calls again.',
    },
    {
      question: 'How is the price set?',
      answer:
        "Pricing is benchmarked in real-time against live LME cash indices and domestic Indian yard spot rates, indexed by verified purity. No haggling, no hidden cuts. What you're quoted is what you pay.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full bg-[#F7F8FA] py-16 sm:py-24 border-b border-[#E2E2E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F2A47] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] mt-2">
            Everything you need to know about buying bulk scrap on WasteMarket.
          </p>
        </div>

        {/* Accordion component, max-width 700px centered, one item open at a time */}
        <div className="max-w-[700px] mx-auto space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-[10px] border border-[#E2E2E0] transition-colors overflow-hidden"
              >
                {/* Question Row: 16-20px padding */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  {/* Navy 16px medium question text */}
                  <span className="text-[16px] font-medium text-[#0F2A47] pr-4 leading-snug">
                    {faq.question}
                  </span>

                  {/* +/- toggle icon right-aligned */}
                  <div className="w-6 h-6 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[#0F2A47] shrink-0 border border-[#E2E2E0]">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#1F9D74]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-[#6B7280]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-[15px] text-[#4B5563] leading-relaxed border-t border-[#F1F3F5]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Below the list, centered teal link: "Still have a question? Talk to us" */}
        <div className="text-center text-sm sm:text-base text-[#6B7280] mt-10">
          <span>Still have a question? </span>
          <button
            onClick={onOpenContactUs}
            className="text-[#1F9D74] font-medium hover:underline cursor-pointer inline-flex items-center"
          >
            Talk to us
          </button>
        </div>

      </div>
    </section>
  );
};
