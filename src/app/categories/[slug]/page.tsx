import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { getProducts } from '@/lib/products';
import { redis } from '@/lib/redis';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryMap: Record<string, string> = {
  'baby-care': 'Baby Care',
  'chicken-meat-fish': 'Chicken, Meat & Fish',
  'cleaning-essentials': 'Cleaning Essentials',
  'pet-care': 'Pet Care',
  'fruits-vegetables': 'Fruits & Vegetables',
  'cold-drinks-juices': 'Cold Drinks & Juices',
  'dairy-bread-eggs': 'Dairy, Bread & Eggs',
  'snack-munchies': 'Snack & Munchies',
  'bakery-biscuits': 'Bakery & Biscuits',
  'instant-food': 'Instant Food',
  'tea-coffee-drinks': 'Tea, Coffee & Drinks',
  'atta-rice-dal': 'Atta, Rice & Dal',
};

async function CategoryProducts({ category }: { category: string }) {
  const allProducts = await getProducts();
  const products = allProducts.filter(p => p.category === category);
  const wishlistIds = await redis.smembers<string[]>('wishlist:guest') || [];

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found in this category.</p>
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

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryMap[params.slug];

  if (!categoryName) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">Browse products in {categoryName}</p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        }>
          <CategoryProducts category={categoryName} />
        </Suspense>
      </div>
    </div>
  );
}