import { ScrapItem } from './scrap';

export interface QueryIntent {
  rawQuery: string;
  targetMaterial: string | null;
  materialName?: string;
  application: string | null;
  minPurity: number | null;
  maxPrice: number | null;
  targetOrigin: string | null;
  preferredIncoterm: string | null;
  preferredPackaging?: string | null;
  requestedTonnage: number | null;
  isResearchQuery?: boolean;
}

export interface RagScoringBreakdown {
  semanticRelevance: number;      // 0 - 100
  purityAssayScore: number;       // 0 - 100
  priceCompetitiveness: number;   // 0 - 100
  supplierTrustScore: number;     // 0 - 100
  logisticsMoqScore: number;      // 0 - 100
}

export interface ScrapRagResult {
  item: ScrapItem;
  compositeScore: number;         // 0 - 100
  matchPercentage: number;        // e.g. 98
  matchBadge: string;             // e.g. 'Top Smelter Pick', 'Best Value'
  badgeColor?: 'blue' | 'emerald' | 'amber' | 'purple';
  rank: number;
  scoringBreakdown: RagScoringBreakdown;
  keyMatchReasons: string[];
  metallurgicalPros: string[];
  tradeConsiderations: string[];
}

export interface SuggestedRefinement {
  label: string;
  actionQuery: string;
  description?: string;
}

export interface RagRecommendationBrief {
  query: string;
  intent: QueryIntent;
  topPick?: ScrapRagResult | null;
  runnerUp?: ScrapRagResult | null;
  allRanked: ScrapRagResult[];
  totalIndexedLots: number;
  matchedCount: number;
  executiveSummary: string;
  metallurgicalInsights: string;
  priceBenchmarkInsight: string;
  suggestedRefinements: SuggestedRefinement[];
  hasStockMatch?: boolean;
  humbleReply?: string;
  isResearchQuery?: boolean;
  researchPoints?: { title: string; desc: string }[];
}

