export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  category: string;
  fabric: string;
  occasion: string;
  images: string[];
  prices: {
    INR: number;
    GBP: number;
    USD: number;
  };
  originalPrices?: {
    INR: number;
    GBP: number;
    USD: number;
  };
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isSpecialDeal?: boolean;
  stock: number;
}

export type Currency = 'INR' | 'GBP';

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
