import React from 'react';

export const WhoItsFor: React.FC = () => {
  const pills = ['Manufacturers', 'Traders', 'Processors'];

  return (
    <section className="w-full bg-[#F7F8FA] py-16 border-b border-[#E2E2E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered text section, max-width 600px */}
        <div className="max-w-[600px] mx-auto text-center">
          
          {/* Heading 28px Semibold Navy */}
          <h2 className="text-[28px] font-semibold text-[#0F2A47] tracking-tight mb-3">
            Built for Businesses That Buy in Bulk
          </h2>

          {/* Subtext: 16px gray */}
          <p className="text-[16px] text-[#6B7280] leading-relaxed font-normal mb-6">
            Manufacturers, traders, and processors who need reliable scrap supply — without the site visits, the haggling, or the guesswork.
          </p>

          {/* Three pill tags in a row: light teal background, Navy text, fully rounded corners */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {pills.map((pill, idx) => (
              <span
                key={idx}
                className="bg-[#E9F7F2] text-[#0F2A47] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#1F9D74]/20 shadow-2xs"
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
