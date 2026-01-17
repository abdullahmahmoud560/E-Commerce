'use client';

import { addToCart } from '@/actions/cart';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;  // Add this line
  };
  inStock: boolean;
}

export default function AddToCartButton({ product, inStock }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(product); // نرسل الكائن الكامل
      if (result.success) {
        toast.success('Added to cart!');
      } else {
        toast.error(result.message || 'Failed to add to cart');
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending || !inStock}
      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-5 h-5" />
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
