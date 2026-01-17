// src/actions/cart.ts
'use server';

import { redis } from '@/lib/redis';
import { revalidatePath } from 'next/cache';

export async function addToCart(productId: string, quantity: number = 1) {
  try {
    // Get current cart
    const cart = await redis.hgetall<Record<string, number>>('cart:guest') || {};
    
    // Add or update quantity
    const currentQuantity = cart[productId] || 0;
    cart[productId] = currentQuantity + quantity;
    
    // Save to Redis
    await redis.hset('cart:guest', cart);
    
    revalidatePath('/cart');
    revalidatePath('/');
    
    return { 
      success: true, 
      message: `Added ${quantity} item(s) to cart` 
    };
  } catch (error) {
    console.error('Add to cart error:', error);
    return { 
      success: false, 
      message: 'Failed to add to cart' 
    };
  }
}

export async function removeFromCart(productId: string) {
  try {
    await redis.hdel('cart:guest', productId);
    
    revalidatePath('/cart');
    
    return { 
      success: true, 
      message: 'Removed from cart' 
    };
  } catch (error) {
    console.error('Remove from cart error:', error);
    return { 
      success: false, 
      message: 'Failed to remove from cart' 
    };
  }
}

export async function updateCartQuantity(productId: string, quantity: number) {
  try {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    
    await redis.hset('cart:guest', { [productId]: quantity });
    
    revalidatePath('/cart');
    
    return { 
      success: true, 
      message: 'Cart updated' 
    };
  } catch (error) {
    console.error('Update cart error:', error);
    return { 
      success: false, 
      message: 'Failed to update cart' 
    };
  }
}

export async function clearCart() {
  try {
    await redis.del('cart:guest');
    
    revalidatePath('/cart');
    
    return { 
      success: true, 
      message: 'Cart cleared' 
    };
  } catch (error) {
    console.error('Clear cart error:', error);
    return { 
      success: false, 
      message: 'Failed to clear cart' 
    };
  }
}