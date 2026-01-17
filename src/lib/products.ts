// src/lib/products.ts
import { redis } from './redis';
import { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await redis.get<string>('products');
    if (!data) {
      return [];
    }
    return JSON.parse(data as string);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    return products.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(p => p.category === category);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}