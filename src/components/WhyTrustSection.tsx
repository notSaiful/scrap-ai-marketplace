import React from 'react';
import { Shield, Check, Scale, MapPin } from 'lucide-react';

export const WhyTrustSection: React.FC = () => {
  const points = [
    {
      title: 'AI-Graded, Human-Verified',
      description:
        "Every batch is scanned and quality-checked before you ever see a quote, not after you've paid.",
      icon: Shield,
    },
    {
      title: 'Delivery Guaranteed',
      description:
        "If what arrives doesn't match what was promised, we make it right. No disputes, no runaround.",
      icon: Check,
    },
    {
      title: 'One Fair Price',
      description:
        "No haggling, no hidden cuts. What you're quoted is what you pay.",
      icon: Scale,
    },
    {
      title: 'Full Order Tracking',
      description:
        'Know exactly where your order is, from sourcing to your gate.',
      icon: MapPin,
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-[#E2E2E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F2A47] tracking-tight">
            Why Businesses Trust wastemarket
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] mt-3 font-normal">
            Institutional standards, transparent pricing, and contractual accountability.
          </p>
        </div>

        {/* 2x2 grid desktop, 1-column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-[12px] p-6 border border-[#E2E2E0] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-[#1F9D74]/70 hover:shadow-sm transition-all flex flex-col justify-start"
              >
                {/* Small teal-filled icon circle top-left */}
                <div className="w-8 h-8 rounded-full bg-[#1F9D74] text-white flex items-center justify-center shrink-0 mb-4 shadow-2xs">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>

                {/* 16px bold Navy heading */}
                <h3 className="text-[16px] font-bold text-[#0F2A47] mb-2 tracking-tight">
                  {point.title}
                </h3>

                {/* 14px gray description */}
                <p className="text-[14px] text-[#6B7280] leading-relaxed font-normal">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
