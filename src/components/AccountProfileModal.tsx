import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  LogOut,
  Save,
  PackageCheck,
  ArrowRight
} from 'lucide-react';

interface AccountProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrders?: () => void;
  ordersCount?: number;
}

export const AccountProfileModal: React.FC<AccountProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenOrders,
  ordersCount = 0,
}) => {
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync state if user changes
  React.useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    updateProfile({
      name: name.trim() || user.name,
      phone: phone.trim(),
    });

    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    }, 300);
  };

  const initials = (name || user.name || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="apple-sheet max-w-lg w-full p-6 sm:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-all active:scale-95 cursor-pointer z-10"
          title="Close profile"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto pr-1 -mr-1">
          {/* Header Identity Banner */}
          <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-black/[0.06]">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white flex items-center justify-center font-bold text-xl shadow-[0_4px_16px_rgba(14,165,233,0.3)]">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Verified Trader">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1d1d1f] truncate tracking-tight">
                  {name || user.name}
                </h2>
                <span className="shrink-0 text-[10px] font-bold text-[#0284c7] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                  Verified Trader
                </span>
              </div>
              <p className="text-xs text-[#86868b] truncate mt-0.5 font-medium">
                {user.email}
              </p>
              <div className="flex items-center text-[11px] text-slate-500 mt-1 space-x-2">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Member since {user.memberSince || 'Sep 2026'}</span>
              </div>
            </div>
          </div>

          {/* Success Notification Banner */}
          {showSuccess && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile details updated successfully.</span>
            </div>
          )}

          {/* Edit Profile Form */}
          <form onSubmit={handleSave} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full text-xs font-medium pl-10 pr-3.5 py-2.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full text-xs font-medium pl-10 pr-24 py-2.5 bg-slate-100 rounded-xl text-slate-500 border border-black/[0.06] cursor-not-allowed"
                />
                <span className="absolute right-3 top-2.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
            </div>

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
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="apple-btn-primary w-full py-2.5 rounded-xl shadow-xs flex items-center justify-center space-x-2 text-xs font-semibold cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>

          {/* Account Security & Escrow Badges */}
          <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] mb-4 space-y-2.5">
            <div className="text-xs font-bold text-[#1d1d1f] mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
              <span>Security & Settlement Privileges</span>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Razorpay Trade Escrow
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Active Protection
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Weighbridge Tare Release
              </span>
              <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                Mill Gate Verified
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Data Encryption
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                256-bit SSL
              </span>
            </div>
          </div>

          {/* Quick Orders Link */}
          {onOpenOrders && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenOrders();
              }}
              className="w-full mb-4 p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#38bdf8] flex items-center justify-between transition-all group shadow-2xs hover:shadow-xs cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-[#1d1d1f] group-hover:text-[#0284c7] transition-colors">
                    My Scrap Orders & RFQs
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {ordersCount > 0 ? `${ordersCount} active order(s) placed` : 'Track pending proformas and delivery status'}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              logout();
              onClose();
            }}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
