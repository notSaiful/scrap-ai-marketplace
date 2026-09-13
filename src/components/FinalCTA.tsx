import React from 'react';

interface FinalCTAProps {
  onOpenRFQ: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenRFQ }) => {
  return (
    <section className="w-full bg-[#0F2A47] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Centered content, 64px vertical padding */}
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-3">
            Ready to Buy Without the Guesswork?
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 font-normal mb-8 max-w-md mx-auto">
            Get your first AI-graded quote in under a minute.
          </p>

          {/* CTA: White fill, Navy text, 8px radius, Teal border on hover */}
          <button
            onClick={onOpenRFQ}
            className="bg-white text-[#0F2A47] hover:text-[#0D9488] border-2 border-transparent hover:border-[#0D9488] text-base font-semibold px-8 py-3.5 rounded-[8px] transition-all duration-200 shadow-md cursor-pointer active:scale-98"
          >
            Get Your Quote
          </button>
        </div>

      </div>
    </section>
  );
};
