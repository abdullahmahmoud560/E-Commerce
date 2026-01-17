import { getWishlist } from '@/actions/wishlist';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default async function WishlistPage() {
  const wishlist = await getWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center py-12">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite products here</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlist.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} inWishlist={true} />
          ))}
        </div>
      </div>
    </div>
  );
}