import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Scale,
  Award
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup';
  onBackToMarketplace: () => void;
  onOpenProfile?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signin',
  onBackToMarketplace,
  onOpenProfile,
}) => {
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form Fields: Email, Phone Number, Password only (no company, no yard name)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        if (!email.trim() || !password) {
          setErrorMessage('Please enter your email address and password.');
          setIsLoading(false);
          return;
        }
        await login(email.trim(), password);
      } else {
        if (!email.trim() || !phone.trim() || !password) {
          setErrorMessage('Please enter your email, phone number, and password.');
          setIsLoading(false);
          return;
        }
        await signup({
          email: email.trim(),
          phone: phone.trim(),
          password,
        });
      }
      setIsLoading(false);
      onBackToMarketplace();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Authentication failed. Please verify your credentials.');
    }
  };

  // If already logged in, show account status view
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex flex-col justify-between pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 border border-black/[0.08] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-[0_8px_20px_rgba(14,165,233,0.3)]">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Signed in as {user.name}
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            {user.email} {user.phone ? `• ${user.phone}` : ''}
          </p>

          <div className="space-y-3">
            <button
              onClick={onBackToMarketplace}
              className="apple-btn-primary w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Continue to Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="w-full py-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Manage Account Profile
              </button>
            )}

            <button
              onClick={() => logout()}
              className="w-full py-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex flex-col justify-between">
      {/* Top Simple Navigation Bar */}
      <div className="w-full border-b border-black/[0.06] bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onBackToMarketplace}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center space-x-2 cursor-pointer" onClick={onBackToMarketplace}>
          <img src="/logo.png" alt="WasteMarket" className="w-7 h-7 object-contain rounded-md" />
          <span className="font-bold text-sm text-slate-900 tracking-tight">wastemarket<span className="text-[#0ea5e9]">.in</span></span>
        </div>

        <div className="text-[11px] font-medium text-slate-500 hidden sm:flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Escrow Security</span>
        </div>
      </div>

      {/* Main Split Screen Area */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Pillars & Trust Points */}
          <div className="lg:col-span-6 space-y-6 text-left hidden lg:block pr-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284c7] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified B2B Metals & Secondary Materials</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f1115] tracking-tight leading-tight">
              Direct Yard Sourcing with Zero Speculation.
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Connect directly with 180+ verified scrap processing yards across India and global shipping routes. 
              Protected end-to-end with Razorpay Escrow settlement released only upon mill gate weighbridge tare inspection.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Razorpay Escrow Protection</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Funds are protected until verified weight slips and XRF assays are confirmed at your delivery gate.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pre-Dispatch Spectral Assays</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Optical Emission Spectrometry (OES) & XRF certificates on every lot to prevent phosphorus, sulfur, and tramp contamination.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">ISRI 2026 Compliant Specifications</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Clean Copper Millberry (&gt;99.9%), HMS 1/2 Steel, Aluminum 6063 extrusions, and Industrial Polymers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dedicated Auth Card */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-black/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden">
              
              {/* Brand Logo & Heading */}
              <div className="text-center mb-6">
                <img 
                  src="/logo.png" 
                  alt="WasteMarket" 
                  className="w-12 h-12 object-contain mx-auto mb-3 rounded-xl shadow-2xs" 
                />
                <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
                  {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
                </h2>
                <p className="text-xs text-[#86868b] mt-1 font-normal">
                  {mode === 'signin' 
                    ? 'Sign in to access your wastemarket.in orders' 
                    : 'Sign up to start trading on wastemarket.in'}
                </p>
              </div>

              {/* Segmented Mode Switcher */}
              <div className="apple-segmented-track w-full mb-5 flex">
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMessage(''); }}
                  className={`apple-segmented-item flex-1 text-center cursor-pointer ${
                    mode === 'signin' ? 'active font-semibold' : 'hover:text-[#1d1d1f]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMessage(''); }}
                  className={`apple-segmented-item flex-1 text-center cursor-pointer ${
                    mode === 'signup' ? 'active font-semibold' : 'hover:text-[#1d1d1f]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-2.5 rounded-xl text-center animate-in fade-in">
                  {errorMessage}
                </div>
              )}

              {/* Form: Email, Phone Number (signup only), Password */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs font-medium pl-10 pr-3.5 py-3 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number (Sign Up only) */}
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs font-medium pl-10 pr-3.5 py-3 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[#1d1d1f]">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => alert('Password reset link dispatched to your email.')}
                        className="text-[11px] font-medium text-[#86868b] hover:text-[#0ea5e9] cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-xs font-medium pl-10 pr-10 py-3 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="apple-btn-primary w-full mt-5 py-3.5 rounded-full shadow-xs flex items-center justify-center space-x-2 text-xs font-semibold cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Security & Escrow Trust Footer */}
              <div className="mt-6 pt-4 border-t border-black/[0.05] flex items-center justify-center space-x-1.5 text-[11px] text-[#86868b] font-normal">
                <ShieldCheck className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                <span>Encrypted escrow session • 256-bit SSL</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Clean Minimal Footer */}
      <div className="border-t border-black/[0.06] py-4 text-center text-xs text-slate-400">
        © 2026 wastemarket.in • Verified B2B Scrap & Secondary Feedstocks
      </div>
    </div>
  );
};
