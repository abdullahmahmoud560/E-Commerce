// src/app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/ProductDetails/ProductDetails';
import { redis } from '@/lib/redis';
import { prisma } from '@/lib/prisma';

interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: string[];
}

// Function to get product by ID from database
async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
      },
    });

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
      discount: product.discount || 0,
      category: product.category?.name || 'Uncategorized',
      rating: product.rating ? Number(product.rating) : 0,
      reviewCount: product.reviewCount || 0,
      inStock: product.stock > 0,
      images: product.images.map((img: ProductImage) => img.url),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Check if product is in wishlist
  const wishlistIds = (await redis.smembers<string[]>('wishlist:guest')) || [];
  const inWishlist = wishlistIds.includes(product.id);

  return <ProductDetailsClient product={product} inWishlist={inWishlist} />;
}