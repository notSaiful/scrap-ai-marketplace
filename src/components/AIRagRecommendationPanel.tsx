import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FileText,
  Flame,
  Globe,
  DollarSign,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { RagRecommendationBrief, ScrapRagResult } from '../types/rag';
import { ScrapItem } from '../types/scrap';

interface AIRagRecommendationPanelProps {
  brief: RagRecommendationBrief;
  onSelectScrap: (item: ScrapItem) => void;
  onOpenRFQ: (item: ScrapItem) => void;
  onApplyRefinement: (newQuery: string) => void;
  onOpenAdvisorModal: () => void;
  onClearSearch?: () => void;
}

export const AIRagRecommendationPanel: React.FC<AIRagRecommendationPanelProps> = ({
  brief,
  onSelectScrap,
  onOpenRFQ,
  onApplyRefinement,
  onOpenAdvisorModal,
  onClearSearch,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { topPick, runnerUp, intent, suggestedRefinements } = brief;

  return (
    <div className="mb-8 relative rounded-3xl bg-white border border-black/[0.08] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] overflow-hidden transition-all duration-300">
      
      {/* Top Banner with AI Glow */}
      <div className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white text-[#0ea5e9] flex items-center justify-center shadow-md font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-100">
                AI RAG Scrap Advisor • OpenRouter Free
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[11px] text-sky-50 font-medium">
                Synthesized with OpenRouter Free from {brief.totalIndexedLots} verified lots & LME index
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Smart Recommendation for: </span>
              <span className="text-sky-100">"{brief.query}"</span>
            </h3>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5 self-end sm:self-auto">
          <button
            onClick={onOpenAdvisorModal}
            className="flex items-center space-x-1.5 bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all active:scale-[0.98] cursor-pointer"
            title="Ask in-depth questions to AI Metallurgical Advisor"
          >
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>Ask AI Advisor</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse AI Panel' : 'Expand AI Panel'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Collapsible Body */}
      {isExpanded && (
        <div className="p-5 sm:p-8 space-y-6">
          
          {/* ========================================================================= */}
          {/* SCENARIO 1: UNSTOCKED QUERY (HONEST - NO FORCING!)                        */}
          {/* ========================================================================= */}
          {brief.hasStockMatch === false ? (
            <div className="space-y-6">
              {/* Executive Research Answer */}
              <div className="bg-gradient-to-br from-sky-50/70 to-blue-50/40 border border-sky-200/60 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#0ea5e9] mb-2 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
                  <span>AI Metallurgical Research Synthesis</span>
                </div>
                <p className="text-sm sm:text-base text-[#0f1115] leading-relaxed font-medium mb-3">
                  {brief.executiveSummary}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {brief.metallurgicalInsights}
                </p>
              </div>

              {/* Humble Reply Card with Custom RFQ Action */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm text-amber-950 mb-1">Live Yard Inventory Status</span>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                      {brief.humbleReply || `We currently do not have verified yard lots matching "${brief.query}" in our immediate warehouse catalog. Rather than displaying unrelated items, our sourcing desk can broadcast a custom proforma RFQ across our 180+ verified yard partners in India (JNPT, Mundra, Chennai) to source this lot for you.`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenRFQ(brief.allRanked[0]?.item || {} as any)}
                  className="self-start sm:self-auto shrink-0 bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xs cursor-pointer transition-all active:scale-98 whitespace-nowrap"
                >
                  Request Custom RFQ
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* SCENARIO 2: STOCK MATCHES OR RESEARCH QUERIES WITH LIVE LOTS              */
            /* ========================================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Top Recommended Lot Spotlight (5 Cols) */}
              {topPick && (
                <div className="lg:col-span-5 bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-5 flex flex-col justify-between hover:border-[#38bdf8]/60 transition-all duration-300">
                  <div>
                    {/* Header Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-[0_2px_8px_rgba(14,165,233,0.35)]">
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        <span>{brief.isResearchQuery ? 'Verified Live Yard Lot' : '#1 AI Recommended Match'}</span>
                      </div>
                      <div className="text-xs font-bold text-[#0284c7] bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                        {topPick.matchPercentage}% Match Score
                      </div>
                    </div>

                    {/* Lot Image Preview & Badges */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 group cursor-pointer" onClick={() => onSelectScrap(topPick.item)}>
                      <img
                        src={topPick.item.primaryImage}
                        alt={topPick.item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                        {topPick.item.grade}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        Assay: {topPick.item.aiSpecs.purityScore}%
                      </div>
                    </div>

                    {/* Title & Pricing */}
                    <h4
                      onClick={() => onSelectScrap(topPick.item)}
                      className="font-bold text-base text-[#0f1115] hover:text-[#0ea5e9] cursor-pointer transition-colors line-clamp-2 leading-snug"
                    >
                      {topPick.item.title}
                    </h4>

                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-xl font-extrabold text-[#0f1115]">
                        ${topPick.item.pricePerTon.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#495057] font-medium">USD / {topPick.item.unit}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        Direct Yard Price
                      </span>
                    </div>

                    {/* Key Match Reasons */}
                    <div className="mt-4 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#495057]">
                        {brief.isResearchQuery ? 'Yard Verification Highlights:' : 'Why AI Recommends This Lot:'}
                      </div>
                      {topPick.keyMatchReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-[#0f1115]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2.5">
                    <button
                      onClick={() => onOpenRFQ(topPick.item)}
                      className="flex-1 bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1] text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-all active:scale-[0.98] shadow-[0_4px_14px_rgba(14,165,233,0.3)] flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Request Proforma RFQ</span>
                    </button>
                    <button
                      onClick={() => onSelectScrap(topPick.item)}
                      className="bg-white hover:bg-slate-50 text-[#0f1115] border border-black/[0.1] text-xs font-semibold py-2.5 px-4 rounded-full transition-all active:scale-[0.98] shadow-2xs flex items-center space-x-1 cursor-pointer"
                    >
                      <span>View Assay</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Right: AI Metallurgical Synthesis & Research Points (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                {/* Executive Summary Card */}
                <div className="bg-gradient-to-br from-sky-50/70 to-blue-50/40 border border-sky-200/60 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#0ea5e9] mb-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
                    <span>{brief.isResearchQuery ? 'Market Research & Demand Analysis' : 'AI Executive Recommendation Synthesis'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0f1115] leading-relaxed font-normal">
                    {brief.executiveSummary}
                  </p>
                </div>

                {/* Research Points Breakdown (if research query) */}
                {brief.researchPoints && brief.researchPoints.length > 0 ? (
                  <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#0f1115] mb-1 uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      <span>Key Industrial & Market Takeaways</span>
                    </div>
                    {brief.researchPoints.map((pt, idx) => (
                      <div key={idx} className="bg-white border border-black/[0.04] rounded-xl p-3 text-xs">
                        <span className="font-bold text-[#0f1115] block mb-0.5">{pt.title}</span>
                        <span className="text-slate-600 leading-relaxed">{pt.desc}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard Metallurgical Fit */
                  topPick && (
                    <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-4 sm:p-5">
                      <div className="flex items-center space-x-2 text-xs font-bold text-[#0f1115] mb-1.5 uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        <span>Metallurgical & Chemical Assay Analysis</span>
                      </div>
                      <p className="text-xs text-[#495057] leading-relaxed font-normal mb-3">
                        {brief.metallurgicalInsights}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {topPick.metallurgicalPros.map((pro, idx) => (
                          <div key={idx} className="bg-white border border-black/[0.04] rounded-lg p-2 font-medium text-[#0f1115] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9]" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}

                {/* Price Arbitrage & Escrow Security */}
                <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#0f1115] mb-1.5 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>LME Benchmark Arbitrage & Escrow Assurance</span>
                  </div>
                  <p className="text-xs text-[#495057] leading-relaxed font-normal mb-3">
                    {brief.priceBenchmarkInsight}
                  </p>

                  {/* 4 Factor Score Bars (if topPick available) */}
                  {topPick && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-black/[0.05]">
                      <div>
                        <div className="text-[10px] text-[#495057] font-medium">Purity Match</div>
                        <div className="text-xs font-bold text-[#0ea5e9] mt-0.5">
                          {topPick.scoringBreakdown.purityAssayScore}%
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] h-full rounded-full" style={{ width: `${topPick.scoringBreakdown.purityAssayScore}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#495057] font-medium">Price vs LME</div>
                        <div className="text-xs font-bold text-emerald-600 mt-0.5">
                          {topPick.scoringBreakdown.priceCompetitiveness}%
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${topPick.scoringBreakdown.priceCompetitiveness}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#495057] font-medium">Supplier KYC</div>
                        <div className="text-xs font-bold text-[#0f1115] mt-0.5">
                          {topPick.scoringBreakdown.supplierTrustScore}%
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${topPick.scoringBreakdown.supplierTrustScore}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#495057] font-medium">Logistics & MOQ</div>
                        <div className="text-xs font-bold text-[#0f1115] mt-0.5">
                          {topPick.scoringBreakdown.logisticsMoqScore}%
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: `${topPick.scoringBreakdown.logisticsMoqScore}%` }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* Smart AI Refinement Chips */}
          {suggestedRefinements.length > 0 && (
            <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#495057] uppercase tracking-wider mr-1">
                Refine AI Search:
              </span>
              {suggestedRefinements.map((ref, idx) => (
                <button
                  key={idx}
                  onClick={() => onApplyRefinement(ref.actionQuery)}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] hover:border-[#38bdf8] hover:text-[#0ea5e9] text-[#0f1115] shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                  title={ref.description}
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#0ea5e9]" />
                  <span>{ref.label}</span>
                </button>
              ))}

              {onClearSearch && (
                <button
                  onClick={onClearSearch}
                  className="ml-auto text-xs font-medium text-[#495057] hover:text-[#0f1115] underline"
                >
                  Clear AI Search
                </button>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
