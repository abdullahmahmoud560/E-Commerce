// src/lib/products.ts
import { Product } from '@/types';
import { sampleProducts } from '@/data/products';

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    return sampleProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    return sampleProducts.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    return sampleProducts.filter(p => p.category === category);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}