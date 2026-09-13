import React from 'react';
import { Camera, X, ImageIcon } from 'lucide-react';

interface ImageMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScrapType: (scrapType: string) => void;
}

export const ImageMatchModal: React.FC<ImageMatchModalProps> = ({
  isOpen,
  onClose,
  onSelectScrapType,
}) => {
  if (!isOpen) return null;

  const sampleVisualImages = [
    { name: 'Copper Wire Bales', type: 'copper', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Heavy Steel Scrap', type: 'steel', img: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80' },
    { name: 'Telecom PCB Boards', type: 'pcb', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
    { name: 'PET Plastic Flakes', type: 'pet', img: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-black/[0.08] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white flex items-center justify-center shadow-xs">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#1d1d1f] text-sm">AI Scrap Visual Matching</h3>
              <p className="text-xs text-slate-500">Match scrap lots using spectrographic photo recognition</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-black p-1.5 rounded-full hover:bg-black/[0.04] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 border-2 border-dashed border-sky-200 bg-gradient-to-b from-sky-50/50 to-blue-50/20 rounded-2xl p-6 text-center">
          <ImageIcon className="w-10 h-10 text-[#0ea5e9] mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#1d1d1f]">Drop scrap yard photo here or browse files</p>
          <p className="text-xs text-slate-500 mt-1">Supports metal bales, turnings, PCB boards, plastic regrind</p>
        </div>

        <div className="mt-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Or select a sample scrap lot to test AI match:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sampleVisualImages.map((sample, index) => (
              <div
                key={index}
                onClick={() => {
                  onSelectScrapType(sample.type);
                  onClose();
                }}
                className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-black/[0.06] hover:border-sky-400 bg-white hover:bg-sky-50/40 cursor-pointer transition-all active:scale-[0.98]"
              >
                <img src={sample.img} alt={sample.name} className="w-11 h-11 rounded-lg object-cover" />
                <div className="text-left">
                  <div className="text-xs font-bold text-[#1d1d1f]">{sample.name}</div>
                  <div className="text-[11px] text-[#0ea5e9] font-semibold">Match lot &rarr;</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1d1d1f] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
