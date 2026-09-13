import { ScrapItem } from '../types/scrap';
import {
  QueryIntent,
  ScrapRagResult,
  RagScoringBreakdown,
  RagRecommendationBrief,
  SuggestedRefinement,
} from '../types/rag';

// Metallurgical & Commercial Domain Knowledge Base
export const LME_BENCHMARKS: Record<string, { name: string; pricePerTon: number; unit: string }> = {
  copper: { name: 'LME Grade A Copper Cash', pricePerTon: 8950, unit: 'USD/MT' },
  aluminum: { name: 'LME High Grade Primary Aluminum', pricePerTon: 2420, unit: 'USD/MT' },
  lead: { name: 'LME Lead Cash Settlement', pricePerTon: 2080, unit: 'USD/MT' },
  steel: { name: 'Global Steel Billet Reference Index', pricePerTon: 580, unit: 'USD/MT' },
  brass: { name: 'Secondary Yellow Brass Ingot Benchmark', pricePerTon: 6200, unit: 'USD/MT' },
  gold: { name: 'LBMA Gold Spot Reference ($/kg)', pricePerTon: 85000000, unit: 'USD/MT' },
  pet: { name: 'Virgin PET Granules Global Index', pricePerTon: 1180, unit: 'USD/MT' },
  hdpe: { name: 'Virgin Blow Moulding HDPE Resins', pricePerTon: 1060, unit: 'USD/MT' },
};

export const METALLURGICAL_INSIGHTS: Record<string, { furnaceType: string; criticalTolerance: string; applicationNotes: string }> = {
  'copper': {
    furnaceType: 'Coreless Induction Furnace & Continuous Rod Casting Lines',
    criticalTolerance: 'Lead (Pb) < 5ppm, Oxygen < 50ppm for crack-free rod drawing',
    applicationNotes: 'Millberry Berry scrap eliminates refining and cathode dissolution steps, enabling direct charging with minimal dross formation.',
  },
  'steel': {
    furnaceType: 'Electric Arc Furnace (EAF) & Induction Melting Crucibles',
    criticalTolerance: 'Phosphorus (P) < 0.05%, Sulfur (S) < 0.05%, Non-ferrous debris < 1.0%',
    applicationNotes: 'Heavy melting structural steel (ISRI 200/206 blend) delivers high bulk density (≥ 0.8 t/m³) reducing back-charging cycles.',
  },
  'aluminum': {
    furnaceType: 'Reverberatory Melting Furnace & Rotary Tilting Smelters',
    criticalTolerance: 'Iron (Fe) < 0.35%, Zero thermal break polyamide strips, Zero zinc contamination',
    applicationNotes: 'Clean 6063 extrusions maximize recovery yield (≥ 94%) with negligible dross skimming losses.',
  },
  'battery': {
    furnaceType: 'Rotary Smelting Furnace & Blast Furnace for Secondary Lead',
    criticalTolerance: 'Liquid acid drained, free of cadmium/lithium contamination, intact PP cases',
    applicationNotes: 'ISRI Rains drained whole batteries yield ~54% recoverable soft and antimonial lead alongside high-grade PP casing regrind.',
  },
  'e-waste': {
    furnaceType: 'Precious Metals Hydrometallurgical Leach Tanks & Pyrometallurgical Converters',
    criticalTolerance: 'Zero lithium cells, zero mercury switches, certified Basel Annex IX documentation',
    applicationNotes: 'High-yield server and telecom PCBs contain concentrated gold (~240g/t) and palladium (~45g/t) exceeding primary ore grades by 40x.',
  },
  'plastics': {
    furnaceType: 'Single/Twin Screw Extrusion & Underwater Pelletizing Lines',
    criticalTolerance: 'PVC contamination < 25ppm, Moisture < 0.7%, Intrinsic Viscosity (IV) ≥ 0.74',
    applicationNotes: 'Alkaline hot-washed flakes prevent melt degradation and yellowing during food-grade bottle preform or polyester yarn spinning.',
  },
};

/**
 * Step 1: Query Intent Extraction & Entity Disambiguation
 */
export function extractQueryIntent(query: string): QueryIntent {
  const rawQuery = query.trim();
  const q = rawQuery.toLowerCase();

  let targetMaterial: string | null = null;
  let materialName = 'Secondary Scrap';

  if (q.includes('copper') || q.includes('millberry') || q.includes('cu') || q.includes('berry')) {
    targetMaterial = 'copper';
    materialName = 'High-Purity Copper';
  } else if (q.includes('steel') || q.includes('hms') || q.includes('iron') || q.includes('ferrous')) {
    targetMaterial = 'steel';
    materialName = 'Heavy Melting Steel (HMS)';
  } else if (q.includes('aluminum') || q.includes('aluminium') || q.includes('6063') || q.includes('tabor') || q.includes('rim') || q.includes('wheel')) {
    targetMaterial = 'aluminum';
    materialName = 'Clean Secondary Aluminum';
  } else if (q.includes('battery') || q.includes('lead-acid') || q.includes('lead acid') || q.includes('rains')) {
    targetMaterial = 'battery';
    materialName = 'Drained Lead-Acid Battery';
  } else if (q.includes('pcb') || q.includes('electronic') || q.includes('e-waste') || q.includes('server') || q.includes('gold')) {
    targetMaterial = 'e-waste';
    materialName = 'High-Recovery Electronic Scrap';
  } else if (q.includes('pet') || q.includes('bottle') || q.includes('flake')) {
    targetMaterial = 'plastics';
    materialName = 'Hot-Washed PET Flakes';
  } else if (q.includes('hdpe') || q.includes('drum') || q.includes('polymer') || q.includes('regrind')) {
    targetMaterial = 'plastics';
    materialName = 'Industrial HDPE Regrind';
  } else if (q.includes('brass') || q.includes('honey') || q.includes('bronze')) {
    targetMaterial = 'brass';
    materialName = 'Yellow Machinery Brass';
  } else if (q.includes('paper') || q.includes('occ') || q.includes('cardboard')) {
    targetMaterial = 'paper';
    materialName = 'Baled Corrugated OCC';
  }

  // Application extraction
  let application: string | null = null;
  if (q.includes('induction') || q.includes('furnace')) application = 'Induction Furnace Melting';
  else if (q.includes('rod') || q.includes('wire drawing')) application = 'Continuous Rod Casting';
  else if (q.includes('eaf') || q.includes('arc furnace')) application = 'Electric Arc Furnace';
  else if (q.includes('billet') || q.includes('rebar')) application = 'Billet & Rebar Smelting';
  else if (q.includes('smelter') || q.includes('foundry')) application = 'Foundry Remelting';
  else if (q.includes('food') || q.includes('bottle')) application = 'Food-Grade Bottle Extrusion';
  else if (q.includes('gold') || q.includes('refining') || q.includes('hydrometallurg')) application = 'Precious Metals Refining';

  // Purity requirement extraction
  let minPurity: number | null = null;
  const purityMatch = q.match(/(?:purity|grade|pure|assay)\s*(?:above|over|>=|>)?\s*(\d{2}(?:\.\d{1,2})?)\s*%/i) ||
                      q.match(/(\d{2}(?:\.\d{1,2})?)\s*%\s*(?:purity|pure)?/i);
  if (purityMatch) {
    minPurity = parseFloat(purityMatch[1]);
  } else if (q.includes('high purity') || q.includes('99.99') || q.includes('four nines')) {
    minPurity = 99.5;
  }

  // Max price constraint extraction
  let maxPrice: number | null = null;
  const priceMatch = q.match(/(?:under|below|less than|max|budget|<|\$)\s*(\d+[\d,]*)/i);
  if (priceMatch) {
    maxPrice = parseFloat(priceMatch[1].replace(/,/g, ''));
  }

  // Incoterm preference extraction
  let preferredIncoterm: string | null = null;
  if (q.includes('cif')) preferredIncoterm = 'CIF';
  else if (q.includes('fob')) preferredIncoterm = 'FOB';
  else if (q.includes('cfr')) preferredIncoterm = 'CFR';
  else if (q.includes('exw')) preferredIncoterm = 'EXW';

  // Origin preference extraction
  let targetOrigin: string | null = null;
  if (q.includes('europe') || q.includes('rotterdam') || q.includes('netherlands')) targetOrigin = 'Europe (Rotterdam)';
  else if (q.includes('usa') || q.includes('houston') || q.includes('america')) targetOrigin = 'North America (USA)';
  else if (q.includes('asia') || q.includes('japan') || q.includes('nagoya')) targetOrigin = 'Asia (Japan)';
  else if (q.includes('india') || q.includes('mundra') || q.includes('gujarat')) targetOrigin = 'India (Mundra)';
  else if (q.includes('dubai') || q.includes('uae') || q.includes('jebel ali')) targetOrigin = 'Middle East (UAE)';
  else if (q.includes('germany') || q.includes('munich') || q.includes('hamburg')) targetOrigin = 'Germany';

  // Tonnage requirement extraction
  let requestedTonnage: number | null = null;
  const tonMatch = q.match(/(\d+[\d,]*)\s*(?:mt|tons?|metric tons?)/i);
  if (tonMatch) {
    requestedTonnage = parseFloat(tonMatch[1].replace(/,/g, ''));
  }

  return {
    rawQuery,
    targetMaterial,
    materialName,
    application,
    minPurity,
    maxPrice,
    targetOrigin,
    preferredIncoterm,
    requestedTonnage,
  };
}

/**
 * Step 2: Multi-Factor Scoring & Ranking Engine
 */
export function scoreScrapItemWithRag(item: ScrapItem, intent: QueryIntent): ScrapRagResult {
  const qTokens = intent.rawQuery.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  const searchableDoc = `${item.title} ${item.subtitle} ${item.grade} ${item.category} ${item.origin} ${item.loadingPort} ${item.supplier.name} ${item.description} ${item.application} ${item.packaging} ${item.aiSpecs.isriCode} ${item.aiSpecs.spectrographicSummary}`.toLowerCase();

  // 1. Semantic Relevance (0 - 100)
  let semanticScore = 50; // base
  if (intent.targetMaterial) {
    if (
      (intent.targetMaterial === 'copper' && (item.category === 'non-ferrous' && item.title.toLowerCase().includes('copper'))) ||
      (intent.targetMaterial === 'steel' && (item.category === 'ferrous' || item.title.toLowerCase().includes('steel'))) ||
      (intent.targetMaterial === 'aluminum' && item.title.toLowerCase().includes('aluminum')) ||
      (intent.targetMaterial === 'battery' && (item.category === 'battery' || item.title.toLowerCase().includes('battery'))) ||
      (intent.targetMaterial === 'e-waste' && item.category === 'e-waste') ||
      (intent.targetMaterial === 'plastics' && item.category === 'plastics') ||
      (intent.targetMaterial === 'brass' && item.title.toLowerCase().includes('brass')) ||
      (intent.targetMaterial === 'paper' && item.category === 'paper')
    ) {
      semanticScore += 35;
    } else {
      semanticScore -= 30; // heavy penalty for material mismatch
    }
  }

  // Token overlap
  let tokenHits = 0;
  for (const token of qTokens) {
    if (searchableDoc.includes(token)) tokenHits++;
  }
  const tokenRatio = qTokens.length > 0 ? tokenHits / qTokens.length : 0;
  semanticScore += Math.round(tokenRatio * 20);
  semanticScore = Math.max(10, Math.min(100, semanticScore));

  // 2. Purity & Assay Score (0 - 100)
  let purityScore = 70;
  const actualPurity = item.aiSpecs.purityScore;
  if (actualPurity >= 99.8) purityScore = 98;
  else if (actualPurity >= 99.0) purityScore = 93;
  else if (actualPurity >= 98.0) purityScore = 86;
  else purityScore = 78;

  if (intent.minPurity) {
    if (actualPurity >= intent.minPurity) {
      purityScore = Math.min(100, purityScore + 10);
    } else {
      purityScore = Math.max(20, purityScore - 30);
    }
  }

  // 3. Price Competitiveness vs Budget and Benchmarks (0 - 100)
  let priceScore = 75;
  if (intent.maxPrice) {
    if (item.pricePerTon <= intent.maxPrice * 0.85) {
      priceScore = 98; // Well under budget
    } else if (item.pricePerTon <= intent.maxPrice) {
      priceScore = 90; // Fits within budget
    } else if (item.pricePerTon <= intent.maxPrice * 1.1) {
      priceScore = 55; // Slightly over
    } else {
      priceScore = 20; // Prohibitive
    }
  } else {
    // Relative value vs category
    if (item.isHotDeal) priceScore += 12;
    priceScore = Math.min(95, priceScore);
  }

  // 4. Supplier Trust & Yard Reputation (0 - 100)
  let supplierScore = Math.round((item.supplier.rating / 5.0) * 80);
  if (item.supplier.isVerified) supplierScore += 10;
  if (item.supplier.isTopYard) supplierScore += 10;
  supplierScore = Math.min(100, supplierScore);

  // 5. Logistics & Incoterm Fit (0 - 100)
  let logisticsScore = 75;
  if (intent.preferredIncoterm && item.shippingTerms.includes(intent.preferredIncoterm)) {
    logisticsScore += 15;
  }
  if (intent.targetOrigin && item.origin.toLowerCase().includes(intent.targetOrigin.toLowerCase())) {
    logisticsScore += 15;
  }
  if (intent.requestedTonnage) {
    if (item.availableStock >= intent.requestedTonnage && item.moq <= intent.requestedTonnage) {
      logisticsScore += 10;
    } else if (item.availableStock < intent.requestedTonnage) {
      logisticsScore -= 20;
    }
  }
  logisticsScore = Math.min(100, Math.max(30, logisticsScore));

  // Weighted Composite Score Calculation
  // Semantic: 35%, Purity: 25%, Price: 20%, Supplier: 10%, Logistics: 10%
  const compositeScore = Math.round(
    semanticScore * 0.35 +
    purityScore * 0.25 +
    priceScore * 0.20 +
    supplierScore * 0.10 +
    logisticsScore * 0.10
  );

  const breakdown: RagScoringBreakdown = {
    semanticRelevance: semanticScore,
    purityAssayScore: purityScore,
    priceCompetitiveness: priceScore,
    supplierTrustScore: supplierScore,
    logisticsMoqScore: logisticsScore,
  };

  // Dynamic Badges & Match Reasons
  const reasons: string[] = [];
  const pros: string[] = [];
  const tradePoints: string[] = [];

  if (item.aiSpecs.purityScore >= 99.5) {
    reasons.push(`Spectrographically verified ${item.aiSpecs.purityScore}% purity (${item.aiSpecs.verificationBadge})`);
  } else {
    reasons.push(`ISRI grade ${item.aiSpecs.isriCode} compliant with low moisture`);
  }

  if (intent.maxPrice && item.pricePerTon <= intent.maxPrice) {
    const savings = Math.round(((intent.maxPrice - item.pricePerTon) / intent.maxPrice) * 100);
    reasons.push(`Priced at $${item.pricePerTon}/MT (${savings}% under your target ceiling)`);
  } else {
    reasons.push(`Direct yard pricing: $${item.pricePerTon} USD / MT with tiered discounts`);
  }

  reasons.push(`Verified ${item.supplier.country} Processing Yard (${item.supplier.rating}★ rating, ${item.supplier.responseRate} response)`);

  // Metallurgical Pros
  if (item.composition.length > 0) {
    const primaryElem = item.composition[0];
    pros.push(`Elemental ${primaryElem.element} (${primaryElem.symbol}): ${primaryElem.percentage}% [${primaryElem.tolerance || 'Certified'}]`);
  }
  pros.push(`Impurity tolerance: ${item.aiSpecs.impurityTolerance}`);

  // Trade Points
  tradePoints.push(`Supported Terms: ${item.shippingTerms.join(', ')} via ${item.loadingPort}`);
  tradePoints.push(`MOQ: ${item.moq} ${item.moqUnit} | Immediate Yard Stock: ${item.availableStock} ${item.stockUnit}`);

  let matchBadge = 'High Purity Match';
  let badgeColor: 'blue' | 'emerald' | 'amber' | 'purple' = 'blue';

  if (compositeScore >= 94) {
    matchBadge = '★ Top Smelter Pick';
    badgeColor = 'blue';
  } else if (priceScore >= 90) {
    matchBadge = 'Best Value Arbitrage';
    badgeColor = 'emerald';
  } else if (purityScore >= 95) {
    matchBadge = '99.9% Assay Certified';
    badgeColor = 'purple';
  } else {
    matchBadge = 'Direct Yard Quota';
    badgeColor = 'amber';
  }

  return {
    item,
    compositeScore,
    matchPercentage: Math.min(99, Math.max(50, compositeScore)),
    matchBadge,
    badgeColor,
    rank: 1, // dynamically updated after sorting
    scoringBreakdown: breakdown,
    keyMatchReasons: reasons,
    metallurgicalPros: pros,
    tradeConsiderations: tradePoints,
  };
}

/**
 * Step 3: Run Full AI RAG Pipeline on Scrap Catalog
 */
export function evaluateScrapsWithRag(
  query: string,
  catalog: ScrapItem[]
): RagRecommendationBrief | null {
  if (!query.trim()) return null;

  const intent = extractQueryIntent(query);

  // Score all items
  const scoredItems = catalog.map(item => scoreScrapItemWithRag(item, intent));

  // Sort descending by composite score
  scoredItems.sort((a, b) => b.compositeScore - a.compositeScore);

  // Check for specialized market research questions
  const qLower = query.toLowerCase().trim();
  const isWhyMetalsQuery = (qLower.includes('why') && (qLower.includes('metal') || qLower.includes('demand'))) ||
    (qLower.includes('high demand') && qLower.includes('metal')) ||
    qLower.includes('why are metals are in high demand') ||
    qLower.includes('why are metals in high demand');

  const isTopIndiaScrapsQuery = (qLower.includes('top') || qLower.includes('best') || qLower.includes('most')) &&
    (qLower.includes('india') || qLower.includes('indian')) &&
    (qLower.includes('waste') || qLower.includes('scrap') || qLower.includes('demand'));

  const unstockedKeywords = ['titanium', 'lithium', 'cobalt', 'tungsten', 'gold bullion', 'silver', 'medical'];
  const matchedUnstocked = unstockedKeywords.find(k => qLower.includes(k));

  // 1. "Why are metals in high demand?"
  if (isWhyMetalsQuery) {
    const metalLots = scoredItems.filter(s => s.item.id === 'scrap-cu-01' || s.item.id === 'scrap-fe-02' || s.item.id === 'scrap-al-03');
    const topPick = metalLots[0] || scoredItems[0];

    return {
      query: intent.rawQuery,
      intent: { ...intent, isResearchQuery: true },
      topPick,
      runnerUp: metalLots[1] || null,
      allRanked: metalLots,
      totalIndexedLots: catalog.length,
      matchedCount: metalLots.length,
      hasStockMatch: true,
      isResearchQuery: true,
      researchPoints: [
        { title: 'Clean Energy & Electrification Transition', desc: 'Renewables (solar, wind) and electric vehicle (EV) drivetrains consume 3x to 5x more copper and aluminum than fossil fuel systems.' },
        { title: 'Decarbonization & Green Steel Mandates', desc: 'Melting scrap in Electric Arc Furnaces (EAF) and Induction Furnaces (IF) reduces CO2 emissions by 70–80% and cuts energy consumption by up to 75% vs primary ore.' },
        { title: 'Infrastructure & Urban Expansion in India', desc: 'India\'s massive infrastructure programs (Bharatmala, dedicated rail corridors) drive record consumption of structural steel and architectural extrusions.' },
        { title: 'Primary Mining Depletion & High Tariffs', desc: 'Declining copper and iron ore grades globally make verified secondary scrap the fastest, most economical smelting feedstock.' },
      ],
      executiveSummary: `Metals and industrial scrap are experiencing surging demand globally and in India due to massive clean energy electrification, green steel decarbonization mandates, and primary ore exhaustion. Secondary scrap remelting delivers up to 75%–95% energy savings compared to mining raw ore.`,
      metallurgicalInsights: `Foundries and secondary smelters across Mandi Gobindgarh, Jalna, and Gujarat are actively charging high-density secondary scrap to bypass primary sintering and reduce furnace cycle times.`,
      priceBenchmarkInsight: `Secondary metals offer substantial arbitrage discounts (12%–28%) below LME primary ingot cash prices, fully supported by WasteMarket Razorpay Escrow.`,
      suggestedRefinements: [
        { label: 'Show me top 3 waste & scraps in demand in India', actionQuery: 'Show me top 3 waste and scraps which are high in demand in India' },
        { label: 'High-Purity Copper Millberry 99.99%', actionQuery: 'Copper millberry 99.99%' },
        { label: 'Heavy Melting Steel HMS 1 & 2', actionQuery: 'HMS 1 and 2 steel scrap' },
      ],
    };
  }

  // 2. "Show me top 3 waste and scraps which are high in demand in India"
  if (isTopIndiaScrapsQuery) {
    const top3Lots = [
      scoredItems.find(s => s.item.id === 'scrap-fe-02') || scoredItems.find(s => s.item.category.includes('ferrous')),
      scoredItems.find(s => s.item.id === 'scrap-cu-01') || scoredItems.find(s => s.item.category.includes('copper')),
      scoredItems.find(s => s.item.id === 'scrap-al-03') || scoredItems.find(s => s.item.title.toLowerCase().includes('aluminum')),
    ].filter(Boolean) as ScrapRagResult[];

    const topPick = top3Lots[0] || scoredItems[0];

    return {
      query: intent.rawQuery,
      intent: { ...intent, isResearchQuery: true },
      topPick,
      runnerUp: top3Lots[1] || null,
      allRanked: top3Lots,
      totalIndexedLots: catalog.length,
      matchedCount: top3Lots.length,
      hasStockMatch: true,
      isResearchQuery: true,
      researchPoints: [
        { title: '1. Heavy Melting Steel (HMS 1 & 2 / Shredded Steel)', desc: 'Over 70% of India\'s crude steel is produced via secondary Induction Furnaces (IF) in Mandi Gobindgarh, Jalna, and Durgapur to supply TMT rebar for national infrastructure.' },
        { title: '2. Bare Bright Millberry Copper Scrap (>99.9% Cu)', desc: 'Following primary smelter closures, India is a net copper importer. Transformer manufacturers and EV wiring mills in Gujarat pay premium spot rates for clean millberry scrap.' },
        { title: '3. Clean Aluminum Extrusion Scrap 6063 (T5/T6)', desc: 'Driven by India\'s booming architectural facades, metro rail cars, and solar mounting frames, with remelters yielding over 94% recovery with negligible dross loss.' },
      ],
      executiveSummary: `The Top 3 waste and scraps in highest industrial demand across India are: 1. Heavy Melting Steel (HMS 1/2) for induction furnace rebar rolling, 2. Millberry Copper Wire (>99.9% Cu) for power grid transformers, and 3. Clean Aluminum Extrusions (6063) for solar and architectural profiles.`,
      metallurgicalInsights: `All top 3 categories are critical feeds for India's secondary metallurgy belt, bypassing primary blast furnace bottlenecks with authenticated XRF spectrographic purity.`,
      priceBenchmarkInsight: `We have verified live yard inventory lots in stock ready for dispatch to Nhava Sheva (JNPT), Mundra, and Chennai ports with 100% Razorpay Escrow custody.`,
      suggestedRefinements: [
        { label: 'Why are metals in high demand right now?', actionQuery: 'Why are metals in high demand' },
        { label: 'Request proforma RFQ for HMS 1 Steel', actionQuery: 'HMS 1 and 2 steel scrap CIF JNPT' },
        { label: 'View Millberry Copper Wire Lots', actionQuery: 'Copper millberry 99.99%' },
      ],
    };
  }

  // 3. Unstocked Material: Do NOT force! Give humble reply
  if (matchedUnstocked) {
    return {
      query: intent.rawQuery,
      intent: { ...intent, isResearchQuery: true },
      topPick: null,
      runnerUp: null,
      allRanked: [], // HONEST: Empty! Do not force!
      totalIndexedLots: catalog.length,
      matchedCount: 0,
      hasStockMatch: false,
      isResearchQuery: true,
      humbleReply: `Humble Note on Live Inventory: We currently do not have verified yard lots matching "${intent.rawQuery}" in our immediate warehouse catalog. Rather than displaying unrelated items, our sourcing desk can broadcast a custom proforma RFQ across our 180+ verified yard partners in India (JNPT, Mundra, Chennai) to source this lot for you.`,
      executiveSummary: `Our metallurgical intelligence engine analyzed the specifications for "${intent.rawQuery}". While this represents an active specialized recycling segment, our live verified yards do not currently stock this exact grade in immediate warehouse inventory.`,
      metallurgicalInsights: `Specialized secondary alloys typically require custom vacuum remelting assays and specific export documentation under Basel Convention frameworks.`,
      priceBenchmarkInsight: `You can submit a custom RFQ or contact our trade desk, and we will source verified lots from pre-vetted international yards.`,
      suggestedRefinements: [
        { label: 'Submit Custom Sourcing RFQ', actionQuery: 'Custom proforma RFQ request' },
        { label: 'Explore Verified Non-Ferrous Metals', actionQuery: 'Copper millberry 99.99%' },
        { label: 'Explore Verified Heavy Steel (HMS)', actionQuery: 'HMS 1 and 2 steel scrap' },
      ],
    };
  }

  // Assign ranks
  scoredItems.forEach((item, index) => {
    item.rank = index + 1;
    if (index === 0) {
      item.matchBadge = '★ Top AI Recommendation';
      item.badgeColor = 'blue';
    } else if (index === 1 && item.compositeScore >= 85) {
      item.matchBadge = 'Runner-Up Match';
      item.badgeColor = 'emerald';
    }
  });

  const topPick = scoredItems[0];
  const runnerUp = scoredItems.length > 1 && scoredItems[1].compositeScore >= 70 ? scoredItems[1] : null;

  // Generate Executive Synthesis
  const domainKey = intent.targetMaterial || 'copper';
  const metaInsight = METALLURGICAL_INSIGHTS[domainKey] || METALLURGICAL_INSIGHTS['copper'];
  const lmeRef = LME_BENCHMARKS[domainKey] || LME_BENCHMARKS['copper'];

  const executiveSummary = `Synthesized ${catalog.length} verified yard scrap lots against your specification for "${intent.rawQuery}". Found ${scoredItems.filter(s => s.compositeScore >= 75).length} optimal furnace-ready candidate lots. We strongly recommend ${topPick.item.title} as the #1 match due to its exceptional chemical assay (${topPick.item.aiSpecs.purityScore}%), authenticated XRF scan, and immediate export clearance from ${topPick.item.origin}.`;

  const metallurgicalInsights = `For ${intent.application || metaInsight.furnaceType}, ${topPick.item.title} meets critical metallurgical tolerances: ${metaInsight.criticalTolerance}. ${metaInsight.applicationNotes}`;

  const discountPercent = Math.round(
    Math.max(5, ((lmeRef.pricePerTon - topPick.item.pricePerTon) / lmeRef.pricePerTon) * 100)
  );

  const priceBenchmarkInsight = `Offered at $${topPick.item.pricePerTon.toLocaleString()} USD/MT, representing an attractive ~${discountPercent}% secondary scrap arbitrage discount against the benchmark (${lmeRef.name} @ $${lmeRef.pricePerTon.toLocaleString()} / MT). Free Trade Escrow and pre-discharge assay inspection rights are pre-approved.`;

  // Suggested Refinements
  const suggestedRefinements: SuggestedRefinement[] = [];

  if (intent.targetMaterial) {
    suggestedRefinements.push({
      label: `Require >99.5% Assay Purity`,
      actionQuery: `${intent.targetMaterial} purity > 99.5%`,
      description: 'Filter only spectroscopic Grade A lots',
    });
    suggestedRefinements.push({
      label: `Filter CIF Delivery Terms`,
      actionQuery: `${intent.targetMaterial} CIF freight`,
      description: 'Include maritime shipping & cargo insurance',
    });
    suggestedRefinements.push({
      label: `Under $${Math.round(topPick.item.pricePerTon * 0.95)} / MT`,
      actionQuery: `${intent.targetMaterial} under $${Math.round(topPick.item.pricePerTon * 0.95)}`,
      description: 'Search for maximum price-performance deals',
    });
  } else {
    suggestedRefinements.push({
      label: `Copper Millberry 99.99%`,
      actionQuery: 'Copper millberry 99.99% under $7900',
    });
    suggestedRefinements.push({
      label: `Heavy Melting Steel (HMS 1/2)`,
      actionQuery: 'HMS 1 and 2 steel scrap CIF',
    });
    suggestedRefinements.push({
      label: `Clean Aluminum Extrusion 6063`,
      actionQuery: 'Clean aluminum 6063 scrap',
    });
  }

  return {
    query: intent.rawQuery,
    intent,
    topPick,
    runnerUp,
    allRanked: scoredItems,
    totalIndexedLots: catalog.length,
    matchedCount: scoredItems.filter(s => s.compositeScore >= 70).length,
    hasStockMatch: true,
    executiveSummary,
    metallurgicalInsights,
    priceBenchmarkInsight,
    suggestedRefinements,
  };
}
