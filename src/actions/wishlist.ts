// src/actions/wishlist.ts
'use client';

import { getProductById } from '@/lib/products';
import { Product } from '@/types';

const WISHLIST_KEY = 'wishlist';

// Get wishlist from localStorage
function getWishlistFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
}

// Save wishlist to localStorage
function saveWishlistToStorage(productIds: string[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(productIds));
  }
}

export async function addToWishlist(productId: string) {
  try {
    const wishlist = getWishlistFromStorage();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      saveWishlistToStorage(wishlist);
    }
    return { success: true, message: 'تمت الإضافة إلى قائمة الرغبات' };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { success: false, message: 'فشلت إضافة المنتج إلى قائمة الرغبات' };
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    const wishlist = getWishlistFromStorage();
    const newWishlist = wishlist.filter(id => id !== productId);
    saveWishlistToStorage(newWishlist);
    return { success: true, message: 'تمت الإزالة من قائمة الرغبات' };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { success: false, message: 'فشلت إزالة المنتج من قائمة الرغبات' };
  }
}

export async function toggleWishlist(productId: string) {
  try {
    const wishlist = getWishlistFromStorage();
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
      await removeFromWishlist(productId);
      return { success: true, inWishlist: false, message: 'تمت الإزالة من قائمة الرغبات' };
    } else {
      await addToWishlist(productId);
      return { success: true, inWishlist: true, message: 'تمت الإضافة إلى قائمة الرغبات' };
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return { success: false, message: 'فشل تحديث قائمة الرغبات' };
  }
}

export async function getWishlist(): Promise<Product[]> {
  try {
    const wishlist = getWishlistFromStorage();
    const products = await Promise.all(
      wishlist.map(id => getProductById(id))
    );
    return products.filter((p): p is Product => p !== null);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
}

export async function isInWishlist(productId: string): Promise<boolean> {
  try {
    const wishlist = getWishlistFromStorage();
    return wishlist.includes(productId);
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
}