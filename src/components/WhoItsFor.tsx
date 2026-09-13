import React from 'react';

export const WhoItsFor: React.FC = () => {
  const pills = ['Manufacturers', 'Traders', 'Processors'];

  return (
    <section className="w-full bg-[#F7F8FA] py-16 border-b border-[#E2E2E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered text block, max-width ~600px */}
        <div className="max-w-[600px] mx-auto text-center">
          
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F2A47] tracking-tight mb-3">
            Built for Businesses That Buy in Bulk
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-[17px] text-[#374151] leading-relaxed font-normal mb-6">
            Manufacturers, traders, and processors who need reliable scrap supply — without the site visits, the haggling, or the guesswork.
          </p>

          {/* 3 small pill tags: light Teal background, Navy text, 20px radius */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {pills.map((pill, idx) => (
              <span
                key={idx}
                className="bg-[#E6F4F1] text-[#0F2A47] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-[20px] border border-[#0D9488]/20 shadow-2xs"
              >
                {pill}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
