// src/app/products/page.tsx
import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { getProducts } from '@/lib/products';
import { redis } from '@/lib/redis';

async function ProductsGrid() {
  const products = await getProducts();
  const wishlistIds = (await redis.smembers<string[]>('wishlist:guest')) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          inWishlist={wishlistIds.includes(product.id)}
        />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Browse our complete collection</p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        }>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}