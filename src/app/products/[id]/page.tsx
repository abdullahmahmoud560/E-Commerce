// Remove the Redis import and update the component
'use client';

import { useEffect, useState } from 'react';
import ProductDetailsClient from '@/components/ProductDetails/ProductDetails';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types';
import { isInWishlist } from '@/actions/wishlist';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const isInWish = await isInWishlist(params.id);
      setInWishlist(isInWish);
    };
    checkWishlist();
  }, [params.id]);

  // ... rest of your component code
}