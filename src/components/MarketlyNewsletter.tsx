import React, { useState } from 'react';
import { Mail, CheckCircle2, TrendingUp } from 'lucide-react';

export const MarketlyNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden text-center shadow-[0_20px_50px_rgba(14,165,233,0.25)]">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 border border-white/25 px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real-Time Scrap Market Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
            Join our weekly Scrap Market & LME Price Index newsletter!
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 mb-8 font-normal leading-relaxed">
            Receive verified commodity benchmark updates, ISRI trade alerts, newly processed yard inventory, and export shipping index data directly to your inbox.
          </p>

          {isSubscribed ? (
            <div className="bg-white/20 border border-white/30 rounded-full py-3 px-6 inline-flex items-center space-x-2 text-white text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>You're subscribed to wastemarket.in market intelligence!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
              <div className="relative w-full flex-1">
                <Mail className="w-4 h-4 text-blue-200 absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email..."
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white/15 border border-white/30 rounded-full text-xs text-white placeholder-blue-200 focus:outline-none focus:bg-white/25 focus:border-white transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#0f1115] font-bold text-xs px-7 py-3 rounded-full transition-all active:scale-[0.98] shadow-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400 mt-4">
            Zero spam. Unsubscribe at any time. Read our{' '}
            <span className="text-white underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
