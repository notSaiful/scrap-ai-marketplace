export type CategoryId = 
  | 'all'
  | 'non-ferrous'
  | 'ferrous'
  | 'battery'
  | 'e-waste'
  | 'plastics'
  | 'automotive'
  | 'paper';

export interface PriceTier {
  minQty: number;
  maxQty?: number;
  price: number;
  unit: string;
}

export interface ChemicalComposition {
  element: string;
  symbol: string;
  percentage: number;
  tolerance?: string;
}

export interface AISpecification {
  purityScore: number; // e.g. 99.85
  isriCode: string; // e.g. "ISRI 'Berry' / 'Candy'"
  moistureContent: string; // e.g. "< 0.08%"
  impurityTolerance: string; // e.g. "< 0.15%"
  aiConfidence: number; // e.g. 98%
  spectrographicSummary: string;
  scanDate: string;
  verificationBadge: string;
}

export interface Supplier {
  id: string;
  name: string;
  yardLocation: string;
  country: string;
  countryCode: string;
  flag: string;
  isVerified: boolean;
  isTopYard: boolean;
  yearsInBusiness: number;
  rating: number;
  reviewsCount: number;
  responseRate: string;
  responseTime: string;
  annualSupplyCapacity: string;
}

export interface ScrapItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryId;
  categoryName: string;
  grade: string;
  primaryImage: string;
  images: string[];
  pricePerTon: number;
  currency: string;
  unit: string;
  priceTiers: PriceTier[];
  moq: number;
  moqUnit: string;
  availableStock: number;
  stockUnit: string;
  origin: string;
  loadingPort: string;
  supplier: Supplier;
  aiSpecs: AISpecification;
  composition: ChemicalComposition[];
  packaging: string;
  shippingTerms: string[]; // ['FOB', 'CIF', 'CFR']
  description: string;
  application: string;
  isFeatured?: boolean;
  isHotDeal?: boolean;
  viewsCount: number;
  inquiriesCount: number;
}
