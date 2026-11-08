export type CategoryId =
  | 'alfajores'
  | 'tortas'
  | 'bocaditos_eventos';

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: CategoryId;
  description: string;
  longDescription: string;
  imageUrl?: string;
  vectorType: 'cake' | 'cupcake' | 'shot' | 'pie' | 'empanada' | 'cremolada' | 'alfajor' | 'truffle' | 'skewer' | 'flan' | 'bowl';
  accentGradient: [string, string];
  iconColor: string;
  dietaryTags?: string[];
  recommendedFor?: string;
  portionNote?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  subtitle: string;
  badge: string;
  accentColor: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  age: number | string;
  isRegistered: boolean;
  registeredAt?: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type ActiveTab = 'catalog' | 'favorites' | 'quote' | 'contact';
