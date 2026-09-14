import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  HelpCircle,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  TrendingUp,
  FileText,
} from 'lucide-react';

import { SCRAP_ITEMS } from '../data/scrapData';
import { queryOpenRouterRag } from '../services/openRouterService';

interface AIMetallurgicalAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  tags?: string[];
}

export const AIMetallurgicalAdvisorModal: React.FC<AIMetallurgicalAdvisorModalProps> = ({
  isOpen,
  onClose,
  initialQuestion,
}) => {
  const [inputQuery, setInputQuery] = useState(initialQuestion || '');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello! I am your AI Metallurgical & Scrap Trade Advisor on wastemarket.in. I evaluate alloy compatibility, ISRI specifications, induction/EAF furnace chemistry, CIF maritime freight, and escrow inspection protocols with live AI inference. What would you like to verify today?",
      timestamp: 'Just now',
      tags: ['ISRI Standards', 'XRF Assays', 'LME Benchmarks', 'Escrow'],
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'Can I melt Millberry 99.99% Cu directly in a coreless induction furnace?',
    'What are the phosphorus and sulfur tolerances for HMS 1/2 in EAF steelmaking?',
    'How does Free Trade Escrow protect against moisture or purity disputes at port?',
    'What is the yield difference between Clean 6063 extrusions vs Troma car wheels?',
  ];

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    try {
      const ragResult = await queryOpenRouterRag(q, SCRAP_ITEMS);
      const tags: string[] = [];
      if (ragResult.matchedItems.length > 0) {
        ragResult.matchedItems.slice(0, 2).forEach(item => tags.push(item.categoryName || item.title));
      }
      tags.push('Live Model');

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: ragResult.aiMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "Based on ISRI guidelines and London Metal Exchange benchmarks, please verify material lot assays and moisture certificates directly with verified yard documentation.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags: ['Assay Review'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-black/[0.08] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white p-5 sm:px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shadow-xs font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  AI Metallurgical & Scrap Trade Advisor
                </h3>
                <span className="text-[10px] bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full font-semibold">
                  RAG v2.4
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Trained on ISRI specifications, XRF spectrometry, and LME benchmark economics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#f8f9fa]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white rounded-br-xs shadow-xs'
                    : 'bg-white border border-black/[0.08] text-[#0f1115] shadow-2xs rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>

                {msg.tags && msg.tags.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-black/[0.06] flex flex-wrap gap-1.5">
                    {msg.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-100 text-[#495057] px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#86868b] mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center space-x-2 text-xs text-[#0284c7] bg-white border border-sky-100 px-3.5 py-2 rounded-full w-max shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing chemical assay and ISRI guidelines...</span>
            </div>
          )}
        </div>

        {/* Pre-canned Suggestions */}
        <div className="px-5 py-2.5 bg-white border-t border-black/[0.06] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {quickQuestions.map((qq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qq)}
              className="text-[11px] font-medium bg-[#f1f3f5] hover:bg-sky-50 hover:text-[#0284c7] text-[#495057] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {qq}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-black/[0.08]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about furnace compatibility, ISRI grades, CIF delivery..."
              className="flex-1 text-xs sm:text-sm bg-[#f8f9fa] border border-black/[0.08] focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/10 focus:bg-white rounded-full px-4 py-2.5 text-[#0f1115] placeholder-[#919eab] focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isProcessing}
              className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] disabled:opacity-40 text-white p-2.5 rounded-full transition-all active:scale-[0.98] shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
