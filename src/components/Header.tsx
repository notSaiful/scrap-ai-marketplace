import React, { useState } from 'react';
import { Sparkles, LogOut, ChevronDown, ShieldCheck, Building, FileText, Menu, X, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onGoHome: () => void;
  onOpenCategoriesPage: () => void;
  onOpenAdvisorPage?: () => void;
  onOpenQuotes?: () => void;
  onOpenContactUs?: () => void;
  onOpenProfile?: () => void;
  currentPage?: 'marketplace' | 'categories' | 'advisor' | 'contact' | 'quotes' | 'auth';
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  shouldHide?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onGoHome, 
  onOpenCategoriesPage,
  onOpenAdvisorPage, 
  onOpenQuotes,
  onOpenContactUs,
  onOpenProfile,
  currentPage = 'marketplace', 
  onOpenAuth,
  shouldHide = false,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center fixed top-3 sm:top-5 left-0 right-0 z-50 px-4 pointer-events-none">
      <header className={`w-full max-w-5xl bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 transform pointer-events-auto ${
        shouldHide
          ? '-translate-y-20 opacity-0 scale-95 pointer-events-none'
          : 'translate-y-0 opacity-100 scale-100'
      }`}>
        
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={onGoHome}>
          <img 
            src="/logo.png" 
            alt="WasteMarket" 
            className="w-8 h-8 object-contain rounded-lg shadow-xs group-hover:scale-[1.05] transition-transform duration-200" 
          />
          <div className="flex items-center">
            <span className="text-base font-bold tracking-tight text-[#0f1115]">
              wastemarket<span className="bg-gradient-to-r from-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent">.in</span>
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Only: Homepage, Category, Quotes, Advisor, Contact Us) */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-[#495057]">
          <button 
            onClick={() => {
              onGoHome();
              setMobileMenuOpen(false);
            }}
            className={`transition-colors cursor-pointer ${currentPage === 'marketplace' ? 'text-[#0ea5e9] font-bold' : 'hover:text-[#0f1115]'}`}
          >
            Homepage
          </button>

          <button 
            onClick={() => {
              onOpenCategoriesPage();
              setMobileMenuOpen(false);
            }}
            className={`transition-colors cursor-pointer ${currentPage === 'categories' ? 'text-[#0ea5e9] font-bold' : 'hover:text-[#0f1115]'}`}
          >
            Category
          </button>

          <button 
            onClick={() => {
              if (onOpenQuotes) onOpenQuotes();
              setMobileMenuOpen(false);
            }}
            className={`transition-colors cursor-pointer ${currentPage === 'quotes' ? 'text-[#0ea5e9] font-bold' : 'hover:text-[#0f1115]'}`}
          >
            Orders
          </button>

          {onOpenAdvisorPage && (
            <button
              onClick={() => {
                onOpenAdvisorPage();
                setMobileMenuOpen(false);
              }}
              className={`transition-colors cursor-pointer ${currentPage === 'advisor' ? 'text-[#0ea5e9] font-bold' : 'hover:text-[#0f1115]'}`}
            >
              Advisor
            </button>
          )}

          <button 
            onClick={() => {
              if (onOpenContactUs) onOpenContactUs();
              setMobileMenuOpen(false);
            }}
            className={`transition-colors cursor-pointer ${currentPage === 'contact' ? 'text-[#0ea5e9] font-bold' : 'hover:text-[#0f1115]'}`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right: Obvious Sign In / Sign Up or User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 pr-3 rounded-full border border-black/[0.08] hover:border-black/[0.16] bg-white shadow-2xs hover:shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0ea5e9] text-white flex items-center justify-center font-semibold text-[11px] shadow-2xs">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-[#0f1115] leading-tight flex items-center gap-1">
                    <span>{user.name}</span>
                    <span>{user.flag}</span>
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-[#919eab]" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-black/[0.08] py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div 
                    onClick={() => {
                      if (onOpenProfile) onOpenProfile();
                      setShowProfileMenu(false);
                    }}
                    className="px-4 pb-3 border-b border-black/[0.06] hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <div className="text-xs font-bold text-[#0f1115] flex items-center justify-between">
                      <span>{user.name}</span>
                      <span className="text-[10px] bg-gradient-to-r from-sky-50 to-blue-50 text-[#0284c7] font-semibold px-2 py-0.5 rounded-full border border-sky-200">
                        Verified Trader
                      </span>
                    </div>
                    <div className="text-[11px] text-[#495057] font-medium truncate mt-0.5">
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="text-[11px] text-[#0f1115] font-medium truncate mt-1 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="py-1 text-xs font-medium text-[#0f1115]">
                    <button
                      onClick={() => {
                        if (onOpenProfile) onOpenProfile();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2.5 transition-colors cursor-pointer text-[#0f1115] font-semibold"
                    >
                      <User className="w-4 h-4 text-[#0ea5e9]" />
                      <span>Account Profile</span>
                    </button>

                    {onOpenAdvisorPage && (
                      <button
                        onClick={() => {
                          onOpenAdvisorPage();
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-sky-50/50 flex items-center space-x-2.5 transition-colors text-[#0ea5e9] font-semibold cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
                        <span>AI Metallurgical Advisor</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (onOpenQuotes) {
                          onOpenQuotes();
                        }
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#0ea5e9]" />
                      <span>My Active Orders</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-black/[0.06] px-3">
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg text-left flex items-center space-x-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <button
                type="button"
                onClick={() => onOpenAuth('signin')}
                className="text-xs font-semibold text-[#0f1115] hover:text-[#0ea5e9] px-3 sm:px-3.5 py-1.5 rounded-full hover:bg-black/[0.04] transition-all cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold shadow-[0_4px_14px_rgba(14,165,233,0.35)] transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#495057] hover:text-[#0f1115] hover:bg-black/[0.05] rounded-full transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl p-4 z-50 flex flex-col space-y-2 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <button 
            onClick={() => {
              onGoHome();
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'marketplace' ? 'bg-sky-50 text-[#0ea5e9]' : 'text-[#495057] hover:bg-slate-50 hover:text-[#0f1115]'
            }`}
          >
            Homepage
          </button>

          <button 
            onClick={() => {
              onOpenCategoriesPage();
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'categories' ? 'bg-sky-50 text-[#0ea5e9]' : 'text-[#495057] hover:bg-slate-50 hover:text-[#0f1115]'
            }`}
          >
            Category
          </button>

          <button 
            onClick={() => {
              if (onOpenQuotes) onOpenQuotes();
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'quotes' ? 'bg-sky-50 text-[#0ea5e9]' : 'text-[#495057] hover:bg-slate-50 hover:text-[#0f1115]'
            }`}
          >
            Orders
          </button>

          {onOpenAdvisorPage && (
            <button 
              onClick={() => {
                onOpenAdvisorPage();
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'advisor' ? 'bg-sky-50 text-[#0ea5e9]' : 'text-[#495057] hover:bg-slate-50 hover:text-[#0f1115]'
              }`}
            >
              Advisor
            </button>
          )}

          <button 
            onClick={() => {
              if (onOpenContactUs) onOpenContactUs();
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'contact' ? 'bg-sky-50 text-[#0ea5e9]' : 'text-[#495057] hover:bg-slate-50 hover:text-[#0f1115]'
            }`}
          >
            Contact Us
          </button>

          {isAuthenticated && user && (
            <button 
              onClick={() => {
                if (onOpenProfile) onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer bg-slate-50 text-[#0f1115] hover:bg-slate-100 flex items-center space-x-2"
            >
              <User className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Account Profile ({user.name})</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

