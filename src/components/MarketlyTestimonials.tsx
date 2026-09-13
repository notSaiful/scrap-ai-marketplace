import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const MarketlyTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Jenny Wilson',
      role: 'Head of Procurement',
      company: 'Finiva Castings & Foundry',
      flag: '🇮🇳',
      rating: 5,
      quote:
        'Procuring furnace-ready copper scrap was always plagued by purity disputes and broker margins. With wastemarket.in, every container comes with an authenticated spectrograph certificate and trade escrow.',
    },
    {
      name: 'Daniel Carter',
      role: 'Managing Director',
      company: 'Rotterdam Port Scrap Terminals',
      flag: '🇳🇱',
      rating: 5,
      quote:
        'wastemarket.in transformed our export pipeline. We listed 450 MT of HMS 1/2 steel and received three verified proforma RFQs within 48 hours. The settlement process is seamless.',
    },
    {
      name: 'Sarah Mitchell',
      role: 'VP Secondary Raw Materials',
      company: 'Nordic Metal Recyclers',
      flag: '🇩🇪',
      rating: 5,
      quote:
        'The AI purity matching engine is remarkably accurate. Finding specific alloy compositions like Aluminum 6063 with tight silicon tolerances used to take weeks; now it takes seconds.',
    },
    {
      name: 'Alex Morgan',
      role: 'Chief Circular Officer',
      company: 'Apex Battery Solutions',
      flag: '🇺🇸',
      rating: 5,
      quote:
        'The escrow security and hazardous materials compliance features give us complete peace of mind when contracting drained lead-acid battery scrap across international borders.',
    },
  ];

  return (
    <section id="reviews" className="bg-[#f8f9fa] border-y border-black/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Industry Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0f1115] tracking-tight">
            Used by 3,000+ Foundries,<br />Recyclers & Smelters
          </h2>
          <p className="text-xs sm:text-sm text-[#495057] mt-2 font-normal">
            Trusted by the global recycling industry for transparent pricing, XRF-assayed scrap lots, and escrow-backed trades.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-3 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs text-[#212529] leading-relaxed font-normal mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-black/[0.05] flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#0f1115] text-white flex items-center justify-center font-bold text-xs">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-[#0f1115] flex items-center gap-1 truncate">
                    <span>{t.name}</span>
                    <span>{t.flag}</span>
                  </div>
                  <div className="text-[10px] text-[#919eab] font-medium truncate">
                    {t.role} • {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
