'use client';

import { updateCartItemQuantity, removeFromCart } from '../../actions/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    originalPrice?: number;
    category?: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const [isPending, startTransition] = useTransition();
  const { id, name, price, image, quantity, originalPrice, category } = item;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    startTransition(async () => {
      await updateCartItemQuantity(id, newQuantity);
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeFromCart(id);
      if (result.success) {
        toast.success('Removed from cart');
      } else {
        toast.error('Failed to remove from cart');
      }
    });
  };

  return (
    <div className="p-6 flex gap-4">
      <Link href={`/products/${id}`} className="flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1">
        <Link href={`/products/${id}`} className="font-semibold text-gray-900 hover:text-primary mb-1 block">
          {name}
        </Link>
        {category && <p className="text-sm text-gray-500 mb-3">{category}</p>}

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={isPending || quantity <= 1}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-semibold">{quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              disabled={isPending}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isPending}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold text-lg text-gray-900">${(price * quantity).toFixed(2)}</div>
        {originalPrice && originalPrice !== price && (
          <div className="text-sm text-gray-400 line-through">${(originalPrice * quantity).toFixed(2)}</div>
        )}
      </div>
    </div>
  );
}