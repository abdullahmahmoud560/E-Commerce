'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { getProducts } from '@/lib/products';
import { isInWishlist } from '@/actions/wishlist';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        const categoryProducts = allProducts.filter(p => p.category === params.slug);
        
        if (categoryProducts.length === 0) {
          notFound();
        }

        setProducts(categoryProducts);
        
        // Check wishlist status for each product
        const wishlistStatus = await Promise.all(
          categoryProducts.map((p: any) => isInWishlist(p.id))
        );
        setWishlistIds(categoryProducts
          .filter((_: any, i: number) => wishlistStatus[i])
          .map((p: any) => p.id)
        );
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
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