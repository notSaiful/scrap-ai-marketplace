import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Lock, 
  Mail, 
  Phone,
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin',
}) => {
  if (!isOpen) return null;

  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form Fields: Email, Phone Number, Password only
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
          setErrorMessage('Please enter your email and password.');
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
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="apple-sheet max-w-md w-full p-7 sm:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Apple Circular Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-all active:scale-95"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <img 
            src="/logo.png" 
            alt="WasteMarket" 
            className="w-12 h-12 object-contain mx-auto mb-3 rounded-xl shadow-xs" 
          />
          <h2 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#86868b] mt-1 font-normal">
            {mode === 'signin' 
              ? 'Sign in to access your wastemarket.in orders' 
              : 'Sign up to start trading on wastemarket.in'}
          </p>
        </div>

        {/* Apple Segmented Mode Switcher */}
        <div className="apple-segmented-track w-full mb-5 flex">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMessage(''); }}
            className={`apple-segmented-item flex-1 text-center cursor-pointer ${
              mode === 'signin' ? 'active' : 'hover:text-[#1d1d1f]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(''); }}
            className={`apple-segmented-item flex-1 text-center cursor-pointer ${
              mode === 'signup' ? 'active' : 'hover:text-[#1d1d1f]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-2.5 rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs font-medium pl-10 pr-3.5 py-2.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
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
                <Phone className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs font-medium pl-10 pr-3.5 py-2.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
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
              <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs font-medium pl-10 pr-9 py-2.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="apple-btn-primary w-full mt-4 py-3 rounded-full shadow-xs flex items-center justify-center space-x-2 text-xs font-semibold cursor-pointer"
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

        {/* Security badge footer */}
        <div className="mt-5 pt-4 border-t border-black/[0.05] flex items-center justify-center space-x-1.5 text-[11px] text-[#86868b] font-normal">
          <ShieldCheck className="w-4 h-4 text-[#0ea5e9] shrink-0" />
          <span>Encrypted escrow session • 256-bit SSL</span>
        </div>

      </div>
    </div>
  );
};
