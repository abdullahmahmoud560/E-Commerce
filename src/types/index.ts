// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: 'Sale' | 'Hot' | 'New' | 'Buy 1 Get $4.00 Off';
  discount?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartWithProducts {
  items: {
    product: Product;
    quantity: number;
  }[];
  total: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  slug: string;
}