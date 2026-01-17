'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { getProducts } from '@/lib/products';
import { isInWishlist } from '@/actions/wishlist';

export default function ProductsGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData] = await Promise.all([
          getProducts(),
          // No need to fetch wishlist separately as it's handled client-side
        ]);
        setProducts(productsData);
        
        // Check wishlist status for each product
        const wishlistStatus = await Promise.all(
          productsData.map((p: any) => isInWishlist(p.id))
        );
        setWishlistIds(productsData
          .filter((_: any, i: number) => wishlistStatus[i])
          .map((p: any) => p.id)
        );
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

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