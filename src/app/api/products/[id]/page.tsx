import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/ProductDetails/ProductDetails';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  const session = await getServerSession(authOptions);

  let inWishlist = false;
  try {
    if (session?.user?.email) {
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: { userId_productId: { userId: session.user.email, productId: params.id } },
      });
      inWishlist = !!wishlistItem;
    }
  } catch {}
  
  return <ProductDetailsClient product={product} inWishlist={inWishlist} />;
}
