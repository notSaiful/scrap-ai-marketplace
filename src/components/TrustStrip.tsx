import React from 'react';
import { Check } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    'AI-Graded Quality',
    'Delivery Guaranteed',
    'No Site Visits Needed',
  ];

  return (
    <div className="w-full bg-[#F7F8FA] border-y border-[#E2E2E0] py-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 items in a row desktop, stacked or wrapped on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2.5">
              {/* Teal checkmark icon */}
              <div className="w-5 h-5 rounded-full bg-[#E6F4F1] text-[#0D9488] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              {/* Navy 14-16px medium-weight text */}
              <span className="text-[#0F2A47] text-sm sm:text-base font-medium tracking-tight">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
