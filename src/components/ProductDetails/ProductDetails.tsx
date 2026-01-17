// src/components/ProductDetails/ProductDetailsClient.tsx
'use client';

import { useState, useTransition } from 'react';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { addToCart } from '@/actions/cart';
import { toggleWishlist } from '@/actions/wishlist';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ProductDetailsClientProps {
  product: {
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
  };
  inWishlist: boolean;
}

export default function ProductDetailsClient({ 
  product, 
  inWishlist: initialInWishlist 
}: ProductDetailsClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(initialInWishlist);
  const [isPending, startTransition] = useTransition();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(product.id, quantity);
      if (result.success) {
        toast.success('Added to cart!');
      } else {
        toast.error(result.message || 'Failed to add to cart');
      }
    });
  };

  const handleToggleWishlist = () => {
    startTransition(async () => {
      const result = await toggleWishlist(product.id);
      if (result.success) {
        setIsInWishlist(result.inWishlist || false);
        toast.success(result.message || 'Updated wishlist');
      } else {
        toast.error(result.message || 'Failed to update wishlist');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section - Left Side */}
            <div className="p-8 bg-white">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  {/* Navigation Buttons */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-green-600' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info - Right Side */}
            <div className="p-8 bg-gray-50">
              <div className="space-y-6">
                {/* Product Name */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Product Description */}
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-gray-900">
                    {product.price} EGP
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-2xl text-gray-400 line-through">
                      {product.originalPrice} EGP
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                    <span className="text-3xl font-bold text-gray-900">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-colors"
                      disabled={isPending}
                    >
                      -
                    </button>
                    <div className="px-6 py-2 bg-white border-x-2 border-gray-300 font-semibold">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-colors"
                      disabled={isPending}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isPending || !product.inStock}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {product.inStock ? 'add to cart' : 'Out of Stock'}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  disabled={isPending}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-3 border-2 ${
                    isInWishlist
                      ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isInWishlist ? 'fill-red-500' : ''}`}
                  />
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>

                {/* Product Details */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="text-gray-900 font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Availability:</span>
                    <span
                      className={`font-semibold ${
                        product.inStock ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}