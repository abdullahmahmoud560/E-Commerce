// src/actions/wishlist.ts
'use server';

import { redis } from '@/lib/redis';
import { getProductById } from '@/lib/products';
import { revalidatePath } from 'next/cache';
import { Product } from '@/types';

const WISHLIST_KEY = 'wishlist:guest';

export async function addToWishlist(productId: string) {
  try {
    const product = await getProductById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    await redis.sadd(WISHLIST_KEY, productId);
    
    revalidatePath('/wishlist');
    revalidatePath('/');
    
    return { success: true, message: 'Added to wishlist' };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { success: false, message: 'Failed to add to wishlist' };
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    await redis.srem(WISHLIST_KEY, productId);
    
    revalidatePath('/wishlist');
    revalidatePath('/');
    
    return { success: true, message: 'Removed from wishlist' };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { success: false, message: 'Failed to remove from wishlist' };
  }
}

export async function toggleWishlist(productId: string) {
  try {
    const isInWishlist = await redis.sismember(WISHLIST_KEY, productId);
    
    if (isInWishlist) {
      await removeFromWishlist(productId);
      return { success: true, inWishlist: false, message: 'Removed from wishlist' };
    } else {
      await addToWishlist(productId);
      return { success: true, inWishlist: true, message: 'Added to wishlist' };
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return { success: false, message: 'Failed to update wishlist' };
  }
}

export async function getWishlist(): Promise<Product[]> {
  try {
    const productIds = await redis.smembers<string[]>(WISHLIST_KEY);
    
    if (!productIds || productIds.length === 0) {
      return [];
    }

    const products = await Promise.all(
      productIds.map(id => getProductById(id))
    );

    return products.filter((p): p is Product => p !== null);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
}

export async function isInWishlist(productId: string): Promise<boolean> {
  try {
    return await redis.sismember(WISHLIST_KEY, productId) === 1;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
}