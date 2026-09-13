import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Send,
  User,
  Bot,
  Copy,
  Check,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { queryOpenRouterRag } from '../services/openRouterService';
import { SCRAP_ITEMS } from '../data/scrapData';

interface ContactUsPageProps {
  onGoHome: () => void;
  onOpenAdvisorPage?: () => void;
  onOpenQuotes?: () => void;
}

interface SupportChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const SUPPORT_FAQS = [
  {
    q: 'How does Razorpay Escrow protect my transaction?',
    a: 'All bulk buyer deposits are held safely in our Razorpay-backed Trade Escrow node. Funds are only disbursed to the supplier after destination weighbridge receipts and certified XRF spectrographic assays confirm the cargo matches agreed specs.',
  },
  {
    q: 'What payment modes are accepted?',
    a: 'We support Corporate NEFT / RTGS via dedicated Virtual Account Numbers (VAN), Corporate Net Banking across all major scheduled banks, high-limit UPI, and Commercial Cards.',
  },
  {
    q: 'What is the dispute & refund timeline?',
    a: 'Buyers have a 48-hour inspection window upon delivery. In the event of an off-spec assay or weight variance, disbursements are frozen immediately and refunds are credited back within 3 to 5 business days.',
  },
  {
    q: 'How does a scrap yard register as an approved supplier?',
    a: 'Yard suppliers submit valid GSTIN, Factory/Yard License, Pollution Control Board (PCB) Consent to Operate (CTO), and past 12-month spectrographic track records. A physical audit is scheduled within 4 business days.',
  },
];

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onGoHome }) => {
  const [activeTab, setActiveTab] = useState<'ai_chat' | 'ticket_form'>('ai_chat');

  // AI Support Chat State
  const [chatMessages, setChatMessages] = useState<SupportChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Hello! I am the WasteMarket AI Support Specialist. Ask me anything about our scrap listings, Razorpay Escrow payments, certified XRF assays, or shipping terms.',
      timestamp: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Ticket Form State
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'escrow_payment',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccessId, setTicketSuccessId] = useState<string | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages, isAiTyping]);

  const handleSendAiMessage = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isAiTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: SupportChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: time,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsAiTyping(true);

    try {
      const matchedFaq = SUPPORT_FAQS.find(
        (f) =>
          f.q.toLowerCase().includes(trimmed.toLowerCase()) ||
          trimmed.toLowerCase().includes('razorpay') ||
          trimmed.toLowerCase().includes('escrow') ||
          trimmed.toLowerCase().includes('refund')
      );

      let replyText = '';
      if (
        trimmed.toLowerCase().includes('razorpay') ||
        trimmed.toLowerCase().includes('escrow') ||
        trimmed.toLowerCase().includes('payment') ||
        trimmed.toLowerCase().includes('refund')
      ) {
        replyText =
          matchedFaq?.a ||
          'All payments on wastemarket.in are secured by Razorpay Enterprise Escrow. When you book a scrap lot, funds are safeguarded in an RBI-compliant nodal account until inspection. We support NEFT/RTGS Virtual Accounts, Net Banking, and UPI.';
      } else {
        const ragResponse = await queryOpenRouterRag(
          `Customer Support Question for wastemarket.in: ${trimmed}`,
          SCRAP_ITEMS
        );
        replyText =
          ragResponse.aiMessage ||
          'Thank you for reaching out. If you require immediate human assistance, please submit a ticket via the "Submit Ticket" tab or contact support@wastemarket.in.';
      }

      const aiMsg: SupportChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: SupportChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Our support team is available. You can submit an official inquiry via the "Submit Ticket" tab or call 1800 890 7272.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email || !formState.phone || !formState.message) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `WM-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketSuccessId(generatedId);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 sm:pt-28 pb-16 selection:bg-sky-500/15 selection:text-[#0284c7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Simple Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={onGoHome}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </button>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Tabs (AI Support Chat / Submit Ticket) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Tab Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 sm:px-6 flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('ai_chat')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'ai_chat'
                    ? 'bg-white text-[#0284c7] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
                <span>AI Support Chat</span>
                <span className="bg-sky-100 text-[#0284c7] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  Instant
                </span>
              </button>

              <button
                onClick={() => setActiveTab('ticket_form')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'ticket_form'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Submit Ticket
              </button>
            </div>

            {/* TAB 1: AI Support Chat */}
            {activeTab === 'ai_chat' && (
              <div className="flex flex-col h-[520px]">
                {/* Chat Message Stream */}
                <div
                  ref={chatScrollRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-slate-50/40"
                >
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1 text-[11px] text-slate-400">
                        {msg.sender === 'ai' ? (
                          <>
                            <div className="w-4 h-4 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white text-[9px] font-bold">
                              AI
                            </div>
                            <span className="font-semibold text-slate-700">AI Support</span>
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-slate-700">You</span>
                            <User className="w-3 h-3" />
                          </>
                        )}
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`group relative p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                          msg.sender === 'user'
                            ? 'bg-[#0284c7] text-white rounded-tr-xs shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        {msg.sender === 'ai' && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 p-1 rounded transition-opacity"
                            title="Copy response"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-2xl w-fit">
                      <Bot className="w-4 h-4 text-[#0ea5e9] animate-bounce" />
                      <span>AI Assistant is looking up records...</span>
                    </div>
                  )}
                </div>

                {/* Preset Prompt Pills */}
                <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto custom-scrollbar flex gap-2">
                  {SUPPORT_FAQS.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendAiMessage(faq.q)}
                      className="text-[11px] whitespace-nowrap bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-[#0284c7] border border-slate-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendAiMessage(chatInput);
                  }}
                  className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isAiTyping}
                    className="bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Submit Ticket */}
            {activeTab === 'ticket_form' && (
              <div className="p-6 sm:p-8">
                {ticketSuccessId ? (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      Ticket Created: {ticketSuccessId}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
                      Our team will reply to {formState.email} within 2–4 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setTicketSuccessId(null);
                        setFormState({
                          fullName: '',
                          email: '',
                          phone: '',
                          category: 'escrow_payment',
                          message: '',
                        });
                      }}
                      className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Submit Another Ticket
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.fullName}
                          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone (+91) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="+91 98200 00000"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Category *
                        </label>
                        <select
                          value={formState.category}
                          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none cursor-pointer"
                        >
                          <option value="escrow_payment">Razorpay Escrow & Payment Inquiry</option>
                          <option value="assay_dispute">Scrap Quality & XRF Assay Dispute</option>
                          <option value="logistics_cif">Port Logistics & Delivery</option>
                          <option value="supplier_kyc">Supplier Yard Onboarding & KYC</option>
                          <option value="general">General Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe your inquiry..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Exact Corporate Details Requested */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            
            {/* Header: Company Name & Brand */}
            <div className="pb-4 mb-5 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                WasteMarket Technologies India Pvt. Ltd.
              </h2>
              <div className="text-xs font-medium text-[#0ea5e9] mt-0.5">
                Operating Brand: wastemarket.in
              </div>
            </div>

            {/* Structured Contact Block */}
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              
              {/* Registered Corporate Office */}
              <div>
                <strong className="text-slate-900 block font-semibold mb-0.5">
                  Registered Corporate Office:
                </strong>
                <span>
                  Unit 402, 4th Floor, Pinnacle Corporate Park, Bandra Kurla Complex (BKC), Bandra East, Mumbai, Maharashtra – 400051, India.
                </span>
              </div>

              {/* Operational Yard & Logistics Hub */}
              <div>
                <strong className="text-slate-900 block font-semibold mb-0.5">
                  Operational Yard & Logistics Hub:
                </strong>
                <span>
                  Plot 14-B, Sector 18, JNPT Logistics Park, Dronagiri, Navi Mumbai, Maharashtra – 400702, India.
                </span>
              </div>

              {/* Customer Support Desk */}
              <div>
                <strong className="text-slate-900 block font-semibold mb-0.5">
                  Customer Support Desk:
                </strong>
                <div>Toll-Free: <strong>1800 890 7272</strong></div>
                <div>Direct Landline: +91 (022) 6982 4100</div>
              </div>

              {/* Official Support Email */}
              <div>
                <strong className="text-slate-900 block font-semibold mb-0.5">
                  Official Support Email:
                </strong>
                <div>
                  <a href="mailto:support@wastemarket.in" className="text-[#0284c7] hover:underline font-medium">
                    support@wastemarket.in
                  </a>
                </div>
                <div>Escrow Desk: escrow@wastemarket.in</div>
              </div>

              {/* Operational Support Hours */}
              <div className="pt-1">
                <strong className="text-slate-900 block font-semibold mb-0.5">
                  Operational Support Hours:
                </strong>
                <div>Monday to Saturday: 09:00 AM – 07:00 PM IST</div>
                <div className="text-slate-500">Sunday & National Holidays: Automated AI Desk Active</div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
