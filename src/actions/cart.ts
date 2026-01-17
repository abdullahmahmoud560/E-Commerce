'use server';

import { revalidatePath } from 'next/cache';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

let cart: CartItem[] = [];

export async function addToCart(product: Omit<CartItem, 'quantity'>) {
  try {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    revalidatePath('/cart');
    return { success: true, message: 'تمت الإضافة إلى السلة بنجاح' };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, message: 'حدث خطأ أثناء إضافة المنتج إلى السلة' };
  }
}

export async function removeFromCart(productId: string) {
  cart = cart.filter(item => item.id !== productId);
  revalidatePath('/cart');
  return { success: true };
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }
  revalidatePath('/cart');
  return { success: true };
}

export async function getCart() {
  return cart;
}

export async function clearCart() {
  cart = [];
  revalidatePath('/cart');
  return { success: true };
}
