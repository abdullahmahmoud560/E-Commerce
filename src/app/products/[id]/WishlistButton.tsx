'use client';

import { toggleWishlist } from '@/actions/wishlist';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productId: string;
  initialInWishlist: boolean;
}

export default function WishlistButton({ productId, initialInWishlist }: WishlistButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isInWishlist, setIsInWishlist] = useState(initialInWishlist);

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleWishlist(productId);
      if (result.success) {
        setIsInWishlist(result.inWishlist || false);
        toast.success(result.message || 'Updated wishlist');
      } else {
        toast.error(result.message || 'Failed to update wishlist');
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-4 border-2 rounded-md transition-colors ${
        isInWishlist
          ? 'border-red-500 bg-red-50 text-red-500'
          : 'border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-500'
      }`}
    >
      <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
    </button>
  );
}