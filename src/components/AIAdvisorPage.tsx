import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  ArrowUp,
  PanelLeftClose,
  PanelLeftOpen,
  History,
  Zap,
  Check,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  ChevronDown,
  ShieldCheck,
  Award,
  MessageSquare,
  Camera,
  Loader2,
  Trash2,
  Settings,
  Key,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { SCRAP_ITEMS } from '../data/scrapData';
import { ScrapItem } from '../types/scrap';
import {
  queryOpenRouterRag,
  getSavedOpenRouterKey,
  saveOpenRouterKey,
  getSavedOpenRouterModel,
  saveOpenRouterModel,
  testOpenRouterConnection,
  OPENROUTER_FREE_MODELS,
} from '../services/openRouterService';

export interface AIAdvisorPageProps {
  onBackToMarketplace: () => void;
  onSearchScrapOnMarketplace: (query: string) => void;
  onOpenRFQ?: (item?: ScrapItem, qty?: number) => void;
  onSelectScrapItem?: (item: ScrapItem) => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  reasoningTime?: string;
  reasoningSteps?: string[];
  recommendedLots?: ScrapItem[];
  suggestedFollowUps?: string[];
  hasInventoryMatch?: boolean;
  humbleReply?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  timeLabel: string;
  messages: ChatMessage[];
}

// Simple, subtle starter recommendations (like ChatGPT)
const SUBTLE_STARTER_PROMPTS = [
  'Why are metals in high demand right now?',
  'Show me top 3 waste and scraps which are high in demand in India',
  'High-purity copper wire scrap (>99.9% Cu)',
  'Heavy melting steel HMS 1/2 with CIF freight quote',
  'Clean aluminum 6063 extrusions for remelting',
  'OCC 11 cardboard bales specification and pricing',
];

export const AIAdvisorPage: React.FC<AIAdvisorPageProps> = ({
  onBackToMarketplace,
  onSearchScrapOnMarketplace,
  onOpenRFQ,
  onSelectScrapItem,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('wm_advisor_chat_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [openReasoningIds, setOpenReasoningIds] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  // OpenRouter Settings Modal State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [openRouterKey, setOpenRouterKey] = useState<string>(() => getSavedOpenRouterKey());
  const [openRouterModel, setOpenRouterModel] = useState<string>(() => getSavedOpenRouterModel());
  const [testStatus, setTestStatus] = useState<{ testing: boolean; result?: { success: boolean; message: string } }>({ testing: false });
  const [keySavedNotification, setKeySavedNotification] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wm_advisor_chat_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

  const handleSaveSettings = () => {
    saveOpenRouterKey(openRouterKey);
    saveOpenRouterModel(openRouterModel);
    setKeySavedNotification(true);
    setTimeout(() => setKeySavedNotification(false), 2500);
    setShowSettingsModal(false);
  };

  const handleTestConnection = async () => {
    setTestStatus({ testing: true });
    try {
      const res = await testOpenRouterConnection(openRouterKey, openRouterModel);
      setTestStatus({ testing: false, result: res });
    } catch (err: any) {
      setTestStatus({ testing: false, result: { success: false, message: err.message || 'Connection failed' } });
    }
  };

  // Active session object
  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === activeSessionId) || null;
  }, [sessions, activeSessionId]);

  // Lock window scroll at top when advisor mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Safely scroll internal chat messages container ONLY (never touch window/document scroll)
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Only scroll if there is actual content overflowing inside the chat container
    if (container.scrollHeight > container.clientHeight) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [activeSession?.messages.length, isThinking]);

  // Auto-expanding textarea handler (expands dynamically as prompt gets bigger)
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputPrompt(e.target.value);
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 180)}px`;
  };

  // Reset textarea height when prompt clears
  useEffect(() => {
    if (!inputPrompt && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [inputPrompt]);

  // Execute or follow up in a chat conversation
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isThinking) return;

    setInputPrompt('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: trimmed,
      timestamp: timeStr,
    };

    let targetSessionId = activeSessionId;

    if (!targetSessionId) {
      // Create new session
      const newSessionId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: newSessionId,
        title: trimmed.length > 28 ? `${trimmed.slice(0, 28)}...` : trimmed,
        createdAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeLabel: 'Just now',
        messages: [userMsg],
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSessionId);
      targetSessionId = newSessionId;
    } else {
      // Append user message to active session
      setSessions(prev =>
        prev.map(s => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              messages: [...s.messages, userMsg],
            };
          }
          return s;
        })
      );
    }

    setIsThinking(true);

    try {
      // OpenRouter Auto Free query
      const result = await queryOpenRouterRag(trimmed, SCRAP_ITEMS);

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        text: result.aiMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        reasoningTime: result.reasoningTime,
        reasoningSteps: result.reasoningSteps,
        recommendedLots: result.matchedItems,
        suggestedFollowUps: result.suggestedFollowUps,
        hasInventoryMatch: result.hasInventoryMatch,
        humbleReply: result.humbleReply,
      };

      setSessions(prev =>
        prev.map(s => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              messages: [...s.messages, aiMsg],
            };
          }
          return s;
        })
      );
    } catch (err) {
      console.error('Error generating AI response:', err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleStartNewChat = () => {
    setActiveSessionId(null);
    setInputPrompt('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  const toggleReasoning = (msgId: string) => {
    setOpenReasoningIds(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  const handleToggleSelectCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    setFeedback(prev => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }));
  };

  const handleCopyText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="flex h-screen pt-20 sm:pt-24 bg-white overflow-hidden text-slate-900 selection:bg-sky-500/15 selection:text-[#0284c7]">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR: Clean ChatGPT-style Sidebar (No token cost / credits)    */}
      {/* ========================================================================= */}
      <aside 
        className={`bg-[#f9fafb] border-r border-slate-200/80 transition-all duration-300 flex flex-col shrink-0 z-30 ${
          sidebarOpen ? 'w-64 sm:w-72' : 'w-0 sm:w-16 overflow-hidden'
        }`}
      >
        {/* Sidebar Top: New Chat + Sidebar Toggle */}
        <div className="p-3 border-b border-slate-200/60 flex items-center justify-between gap-2">
          {sidebarOpen ? (
            <>
              <button
                onClick={handleStartNewChat}
                className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 text-slate-800 text-xs font-semibold shadow-2xs transition-all active:scale-98 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-slate-600" />
                <span>New chat</span>
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Expand sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* History List */}
        {sidebarOpen ? (
          <div className="flex-1 flex flex-col overflow-hidden p-3 pt-3">
            {/* History Section Heading */}
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Recent Chats
              </span>
              <span className="text-[10px] text-slate-400">
                {sessions.length}
              </span>
            </div>

            {/* Scrollable History List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {sessions.map(s => {
                const isActive = activeSessionId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-sky-50 text-[#0284c7] font-semibold border border-sky-100 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate flex-1 min-w-0">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0ea5e9]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className="truncate">{s.title}</span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(s.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Bottom: OpenRouter Key & Model Config */}
            <div className="pt-2 border-t border-slate-200/80 mt-2">
              <button
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <KeyRound className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>OpenRouter AI Key</span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${openRouterKey.trim() ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {openRouterKey.trim() ? 'Active' : 'Configure'}
                </span>
              </button>
            </div>

          </div>
        ) : (
          /* Collapsed Icons Only */
          <div className="flex-1 flex flex-col items-center py-4 space-y-4">
            <button
              onClick={handleStartNewChat}
              className="w-10 h-10 rounded-xl bg-white hover:bg-sky-50 hover:text-[#0ea5e9] border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shadow-2xs"
              title="New chat"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="View History"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center text-[#0284c7] transition-colors cursor-pointer"
              title="OpenRouter Settings"
            >
              <KeyRound className="w-5 h-5" />
            </button>
          </div>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN CHAT AREA (ChatGPT Style Conversational Thread)                  */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        
        {/* Floating Sidebar Toggle button when collapsed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-3 left-3 z-20 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Open sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable Chat Message Stream */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
          
          {/* ===================================================================== */}
          {/* SCENARIO A: INITIAL EMPTY STATE (No messages in active session)       */}
          {/* ===================================================================== */}
          {!activeSession || activeSession.messages.length === 0 ? (
            <div className="max-w-2xl mx-auto py-16 sm:py-24 flex flex-col items-center text-center animate-in fade-in duration-300">
              
              {/* Clean Avatar */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-[#0ea5e9] flex items-center justify-center text-white shadow-md mb-5">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              {/* Minimal Headline */}
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                What scrap material are you looking for?
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-8">
                Ask about alloy grades, certified XRF assays, CIF maritime pricing, or port availability.
              </p>

              {/* Simple, Subtle Recommendation Starter Chips (Like ChatGPT) */}
              <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                {SUBTLE_STARTER_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 rounded-full px-4 py-2 transition-all cursor-pointer shadow-2xs active:scale-98 text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* ===================================================================== */
            /* SCENARIO B: MULTI-TURN CHAT CONVERSATION (Matching Images 3 & 4)      */
            /* ===================================================================== */
            <div className="max-w-4xl mx-auto pb-6 space-y-8">
              
              {activeSession.messages.map(msg => {
                if (msg.role === 'user') {
                  /* User Message: Right-Aligned Bubble (Like Image 4) */
                  return (
                    <div key={msg.id} className="flex justify-end animate-in fade-in duration-200">
                      <div className="bg-[#f3f4f6] text-slate-900 rounded-2xl sm:rounded-3xl px-5 py-3 text-sm sm:text-base font-medium max-w-[80%] shadow-2xs">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                /* Assistant Message: Left-Aligned with Avatar & Products (Like Image 3) */
                const isReasoningExpanded = openReasoningIds.has(msg.id);
                return (
                  <div key={msg.id} className="flex flex-col text-left animate-in fade-in duration-200">
                    
                    {/* Header Row: Avatar + Label + Timestamp + Worked For Badge */}
                    <div className="flex items-center space-x-2.5 mb-2.5">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        AI Mode
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {msg.timestamp}
                      </span>

                      {/* Worked for X seconds trace pill (Matching Image 3 & 4) */}
                      {msg.reasoningTime && (
                        <button
                          onClick={() => toggleReasoning(msg.id)}
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ml-1"
                        >
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>Worked for {msg.reasoningTime}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isReasoningExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Collapsible Reasoning Details */}
                    {isReasoningExpanded && msg.reasoningSteps && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 mb-3 text-xs text-slate-600 space-y-1.5 animate-in fade-in duration-200 ml-8 max-w-2xl">
                        <div className="font-bold text-slate-800 mb-1 text-[11px] uppercase tracking-wider">
                          Sourcing Agent Execution Steps:
                        </div>
                        {msg.reasoningSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Assistant Message Text */}
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal mb-4 ml-8 whitespace-pre-line">
                      {msg.text}
                    </div>

                    {/* Humble Note when no direct inventory match exists */}
                    {msg.humbleReply && (
                      <div className="ml-8 mb-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start space-x-2.5">
                          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-amber-950 mb-0.5">Live Yard Inventory Note</span>
                            <p className="leading-relaxed text-amber-900">{msg.humbleReply}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenRFQ?.()}
                          className="self-start sm:self-auto shrink-0 bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xs cursor-pointer transition-all active:scale-98 whitespace-nowrap"
                        >
                          Request Sourcing RFQ
                        </button>
                      </div>
                    )}

                    {/* Embedded Product Cards (ONLY if matched lots exist!) */}
                    {msg.recommendedLots && msg.recommendedLots.length > 0 && (
                      <div className="ml-8 mb-4">
                        <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified Yard Lots in Stock ({msg.recommendedLots.length}):</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {msg.recommendedLots.map(item => {
                            const isSelected = selectedItemIds.has(item.id);
                            return (
                              <div
                                key={item.id}
                                onClick={() => onSelectScrapItem?.(item)}
                                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#38bdf8] p-4 transition-all duration-200 hover:shadow-[0_8px_25px_rgba(14,165,233,0.12)] flex flex-col justify-between group cursor-pointer"
                              >
                                <div>
                                  {/* Card Image with Select Button */}
                                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 bg-slate-100">
                                    <img
                                      src={item.primaryImage}
                                      alt={item.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Select Button Top Right */}
                                    <button
                                      type="button"
                                      onClick={(e) => handleToggleSelectCard(item.id, e)}
                                      className={`absolute top-2.5 right-2.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 shadow-2xs backdrop-blur-md transition-all cursor-pointer ${
                                        isSelected
                                          ? 'bg-[#0ea5e9] text-white border-[#0ea5e9]'
                                          : 'bg-white/90 hover:bg-white text-slate-700 border-black/10'
                                      }`}
                                    >
                                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${isSelected ? 'bg-white text-[#0ea5e9]' : 'border border-slate-400'}`}>
                                        {isSelected ? '✓' : ''}
                                      </span>
                                      <span>{isSelected ? 'Selected' : 'Select'}</span>
                                    </button>

                                    {/* Camera Lens Bottom Left */}
                                    <div className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-xs text-white flex items-center justify-center shadow-xs">
                                      <Camera className="w-3.5 h-3.5" />
                                    </div>
                                  </div>

                                  {/* Verification Badges */}
                                  <div className="flex items-center space-x-1.5 mb-1.5">
                                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                      <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                                      Trade Escrow
                                    </span>
                                    <span className="inline-flex items-center text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                                      <Award className="w-3 h-3 mr-1 text-sky-600" />
                                      {item.aiSpecs.purityScore}% Pure
                                    </span>
                                  </div>

                                  {/* Title */}
                                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0284c7] line-clamp-2 leading-snug transition-colors mb-2">
                                    {item.title}
                                  </h4>

                                  {/* Price & MOQ */}
                                  <div className="mb-2">
                                    <div className="text-base sm:text-lg font-extrabold text-slate-900">
                                      ${item.pricePerTon.toLocaleString()}{' '}
                                      <span className="text-xs font-normal text-slate-500">/ ton</span>
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      Min. order: {item.moq} {item.moqUnit} • {item.availableStock} {item.stockUnit} stock
                                    </div>
                                  </div>

                                  {/* Supplier */}
                                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-4">
                                    <span className="font-semibold text-slate-900 truncate max-w-[140px]">
                                      {item.supplier.name}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="shrink-0">{item.supplier.flag} {item.supplier.rating}★</span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div>
                                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectScrapItem?.(item);
                                      }}
                                      className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold py-2 rounded-full transition-all cursor-pointer active:scale-98 text-center"
                                    >
                                      View details
                                    </button>
                                    
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenRFQ?.(item, item.moq);
                                      }}
                                      className="w-full bg-slate-900 hover:bg-[#0ea5e9] text-white text-xs font-bold py-2 rounded-full transition-all cursor-pointer active:scale-98 text-center shadow-xs"
                                    >
                                      AI negotiate
                                    </button>
                                  </div>

                                  <div className="mt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>Matches requirements (Purity, Stock, Escrow)</span>
                                  </div>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Simple Subtle Follow-Up Recommendation Pills */}
                    {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-8 mb-3">
                        {msg.suggestedFollowUps.map((action, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSendMessage(action)}
                            className="text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 rounded-xl px-3 py-1.5 transition-all cursor-pointer shadow-2xs text-left"
                          >
                            {action} →
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Feedback Toolbar */}
                    <div className="flex items-center space-x-2 ml-8 text-slate-400">
                      <button
                        onClick={() => handleFeedback(msg.id, 'up')}
                        className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                          feedback[msg.id] === 'up' ? 'text-emerald-600 bg-emerald-50' : ''
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, 'down')}
                        className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                          feedback[msg.id] === 'down' ? 'text-rose-600 bg-rose-50' : ''
                        }`}
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                        title="Copy text"
                      >
                        {copiedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: 'AI Scrap Sourcing', text: msg.text, url: window.location.href });
                          } else {
                            handleCopyText(msg.id, msg.text);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                        title="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* Live Thinking / Searching State (Matching Image 4) */}
              {isThinking && (
                <div className="flex flex-col text-left animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      AI Mode
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full ml-1">
                      <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                      <span>Thinking...</span>
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 ml-8 flex items-center space-x-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0ea5e9]" />
                    <span>Searching scrap yard lots and spectrographic XRF assays...</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ======================================================================= */}
        {/* 3. STICKY BOTTOM CHAT INPUT BAR (Auto-expanding Textarea, No Scrollbar) */}
        {/* ======================================================================= */}
        <div className="p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent z-20 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-300 shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-within:border-[#0ea5e9] focus-within:ring-4 focus-within:ring-[#0ea5e9]/15 transition-all p-2 sm:p-3 flex items-end">
              
              {/* Plus / Attach Button */}
              <button
                type="button"
                onClick={() => handleSendMessage('Attach chemical assay report: Copper Berry 99.99%')}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shrink-0 mb-1 cursor-pointer"
                title="Attach assay / photo"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Auto-expanding Textarea (Expands height naturally as prompt gets bigger) */}
              <textarea
                ref={textareaRef}
                value={inputPrompt}
                onChange={handleTextareaInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputPrompt);
                  }
                }}
                rows={1}
                disabled={isThinking}
                placeholder="Describe your needs or ask a follow-up question..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 border-none outline-none bg-transparent resize-none overflow-hidden max-h-44 leading-relaxed"
                style={{ minHeight: '24px' }}
              />

              {/* Submit Send Button */}
              <button
                type="button"
                onClick={() => handleSendMessage(inputPrompt)}
                disabled={isThinking || !inputPrompt.trim()}
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#0ea5e9] disabled:bg-slate-200 text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer disabled:cursor-not-allowed shrink-0 mb-1"
                title="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

            </div>

            <p className="text-[11px] text-slate-400 text-center mt-2 font-normal">
              AI Sourcing Assistant. Double-check important specifications and pricing.
            </p>
          </div>
        </div>

        {/* Key Saved Toast Notification */}
        {keySavedNotification && (
          <div className="absolute top-4 right-4 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>OpenRouter configuration saved!</span>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 4. OPENROUTER API KEY & REAL RAG CONFIGURATION MODAL                     */}
      {/* ========================================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">OpenRouter AI Configuration</h3>
                  <p className="text-xs text-slate-500">Real-time LLM inference & RAG</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* API Key Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  OpenRouter API Key (Free)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={openRouterKey}
                    onChange={(e) => setOpenRouterKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none transition-all"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                  <span>Keys start with <code className="text-slate-600">sk-or-v1-</code></span>
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0284c7] hover:underline flex items-center gap-1"
                  >
                    <span>Get free key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Model Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected Free AI Model
                </label>
                <select
                  value={openRouterModel}
                  onChange={(e) => setOpenRouterModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-900 outline-none transition-all"
                >
                  {OPENROUTER_FREE_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Active free model with zero credit requirement.
                </p>
              </div>

              {/* Test Status Banner */}
              {testStatus.result && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium border flex items-start gap-2 ${
                    testStatus.result.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {testStatus.result.success ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <span className="text-rose-600 font-bold shrink-0">!</span>
                  )}
                  <span className="break-all">{testStatus.result.message}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus.testing || !openRouterKey.trim()}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                {testStatus.testing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{testStatus.testing ? 'Testing...' : 'Test Connection'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="text-xs font-semibold px-5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white transition-colors cursor-pointer shadow-xs"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
