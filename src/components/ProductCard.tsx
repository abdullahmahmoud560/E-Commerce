// src/components/ProductCard.tsx
'use client';

import { Product } from '../types';
import { addToCart } from '../actions/cart';
import { toggleWishlist } from '../actions/wishlist';
import { Heart, Star } from 'lucide-react';
import React, { useState, useTransition, ReactElement } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  inWishlist?: boolean;
}

export default function ProductCard({ product, inWishlist = false }: ProductCardProps): ReactElement {
  const [isPending, startTransition] = useTransition();
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(product);
      if (result.success) {
        toast.success('تمت الإضافة إلى السلة بنجاح');
      } else {
        toast.error(result.message || 'فشلت إضافة المنتج إلى السلة');
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow product-card relative group">
      {product.badge && (
        <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
          product.badge === 'Sale' ? 'bg-red-500 text-white' :
          product.badge === 'Hot' ? 'bg-orange-500 text-white' :
          product.badge === 'New' ? 'bg-blue-500 text-white' :
          'bg-green-500 text-white'
        }`}>
          {product.badge === 'Sale' && product.discount 
            ? `Sale ${product.discount}%` 
            : product.badge}
        </div>
      )}

      <button
        onClick={handleToggleWishlist}
        disabled={isPending}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors z-10"
      >
        <Heart
          className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <Link 
        href={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`} 
        className="text-xs text-gray-500 hover:text-primary"
      >
        {product.category}
      </Link>

      <h3 className="font-semibold text-gray-900 mt-2 mb-2 hover:text-primary line-clamp-2">
        {product.name}
      </h3>

      <div className="flex items-center gap-1 mb-3">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">{product.rating}</span>
        <span className="text-sm text-gray-400">({product.reviewCount})</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && product.originalPrice !== product.price && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isPending || !product.inStock}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.inStock ? 'Add' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}