import React, { useState } from 'react';
import { ScrapItem } from '../types/scrap';
import { X, Send, CheckCircle2, ShieldCheck, FileText, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface RFQModalProps {
  item?: ScrapItem | null;
  initialQuantity?: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (data?: any) => void;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  item,
  initialQuantity,
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const { user, isAuthenticated } = useAuth();
  const defaultMoqKg = item ? (item.moq >= 10 ? item.moq * 50 : 500) : 500;
  const inrRatePerTon = item ? (item.pricePerTon > 1000 ? Math.round(item.pricePerTon * 83) : Math.round(item.pricePerTon * 85)) : 42000;
  const defaultPricePerKg = Math.max(1, Math.round(inrRatePerTon / 1000));

  const [quantity, setQuantity] = useState(initialQuantity || defaultMoqKg);
  const [targetPrice, setTargetPrice] = useState(defaultPricePerKg);
  const [destinationPort, setDestinationPort] = useState('Bengaluru, Karnataka');
  const [incoterm, setIncoterm] = useState('CIF');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess({
        item,
        quantity,
        targetPrice,
        destinationPort,
        incoterm,
        notes,
      });
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="apple-sheet max-w-xl w-full p-7 sm:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Apple Circular Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-all active:scale-95"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-black/[0.06]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white flex items-center justify-center font-bold shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1d1d1f] text-base">Request for Quotation (RFQ)</h3>
            <p className="text-xs text-[#86868b]">Direct inquiry to verified scrap smelter / yard</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-sky-100 text-[#0284c7] rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Order Request Submitted!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              AI Match Engine has dispatched your order inquiry to the yard manager. You will receive an official proforma invoice and assay certificate shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {isAuthenticated && user && (
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span className="font-bold text-black">{user.name}</span>
                  <span className="text-slate-500">({user.companyName})</span>
                </div>
                <span className="text-[10px] bg-sky-50 text-[#0284c7] font-bold px-1.5 py-0.2 rounded border border-sky-200">
                  Verified {user.role === 'buyer' ? 'Buyer' : 'Yard'}
                </span>
              </div>
            )}

            {item && (
              <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-100 flex items-center space-x-3">
                <img src={item.primaryImage} alt={item.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 truncate">
                  <div className="font-semibold text-xs text-black truncate">{item.title}</div>
                  <div className="text-[11px] text-[#0284c7] font-semibold mt-0.5">
                    ₹{defaultPricePerKg.toLocaleString('en-IN')} / kg • Yard: {item.supplier.name}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Required Quantity (kg)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={defaultMoqKg}
                  step={50}
                  className="w-full text-xs font-medium px-3.5 py-2.5 bg-neutral-50/70 border border-black/[0.1] rounded-xl focus:bg-white focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/10 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Target Price (₹ / kg)
                </label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  min={1}
                  step={1}
                  className="w-full text-xs font-medium px-3.5 py-2.5 bg-neutral-50/70 border border-black/[0.1] rounded-xl focus:bg-white focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/10 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  placeholder="e.g. Bengaluru, Karnataka"
                  className="w-full text-xs font-medium px-3.5 py-2.5 bg-neutral-50/70 border border-black/[0.1] rounded-xl focus:bg-white focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/10 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Shipping Terms
                </label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 bg-neutral-50/70 border border-black/[0.1] rounded-xl focus:bg-white focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/10 focus:outline-none transition-all"
                >
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CFR">CFR (Cost and Freight)</option>
                  <option value="EXW">EXW (Ex Works)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-black mb-1.5">
                Additional Requirements / Purity Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Specify radiation test requirements, packing, container preferences..."
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-neutral-50/70 border border-black/[0.1] rounded-xl focus:bg-white focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/10 focus:outline-none transition-all"
              />
            </div>

            <div className="bg-[#f5f5f7] p-3.5 rounded-2xl text-[11px] text-[#86868b] flex items-center space-x-2 border border-black/[0.04]">
              <ShieldCheck className="w-4 h-4 text-[#0ea5e9] shrink-0" />
              <span>Free Trade Escrow protection included with all verified suppliers.</span>
            </div>

            <div className="flex justify-end space-x-2.5 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="apple-btn-secondary px-5 py-2.5 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apple-btn-primary px-6 py-2.5 text-xs font-semibold shadow-xs flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit RFQ</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
