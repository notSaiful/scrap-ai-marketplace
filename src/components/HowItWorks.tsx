import React from 'react';

interface HowItWorksProps {
  onOpenRFQ?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  const steps = [
    {
      number: '1',
      title: 'Tell us what you need',
      description: 'Select material, quantity, and grade.',
    },
    {
      number: '2',
      title: 'We grade and source it',
      description: 'AI analyzes quality; our team finds the right match.',
    },
    {
      number: '3',
      title: 'It arrives as promised',
      description: 'Verified quality, delivered on schedule.',
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-16 sm:py-24 border-b border-[#E2E2E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F2A47] tracking-tight mb-3">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280]">
            From initial RFQ to gate delivery with institutional transparency.
          </p>
        </div>

        {/* 3-column layout desktop, stacked vertically on mobile with ~48px gap */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          
          {/* Thin horizontal connector line between circles on desktop only (Teal #1F9D74, 2px) */}
          <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-[2px] bg-[#1F9D74] -z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              
              {/* Numbered circle (1/2/3), Navy fill, white number, 40px diameter */}
              <div className="w-10 h-10 rounded-full bg-[#0F2A47] text-white flex items-center justify-center font-bold text-base shadow-sm mb-6 ring-4 ring-white">
                {step.number}
              </div>

              {/* Step title: 18px Semibold Navy */}
              <h3 className="text-[18px] font-semibold text-[#0F2A47] mb-2 tracking-tight">
                "{step.title}"
              </h3>

              {/* Description: 15px Regular gray (#6B7280) */}
              <p className="text-[15px] text-[#6B7280] leading-relaxed font-normal max-w-xs">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
