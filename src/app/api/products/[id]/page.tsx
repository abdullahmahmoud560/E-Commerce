// src/app/products/[id]/page.tsx
'use server';

import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import ProductDetailsClient from '@/components/ProductDetails/ProductDetails';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch product');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to load product');
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  // Get user session
  const session = await getServerSession(authOptions);
  let inWishlist = false;
  
  try {
    if (session?.user?.email) {
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: {
          userId_productId: {
            userId: session.user.email,
            productId: params.id
          }
        }
      });
      inWishlist = !!wishlistItem;
    }
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    // Continue with default inWishlist = false if there's an error
  }
  
  return <ProductDetailsClient product={product} inWishlist={inWishlist} />;
}