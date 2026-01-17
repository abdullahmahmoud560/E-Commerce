import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/products';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cacheKey = `product:${id}`;
    
    // Try to get from Redis cache first
    const cachedProduct = await redis.get<string>(cacheKey);
    if (cachedProduct) {
      return NextResponse.json(JSON.parse(cachedProduct));
    }

    // If not in cache, fetch from database
    const product = await getProductById(id);
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Cache the product for 1 hour
    await redis.set(cacheKey, JSON.stringify(product), { ex: 3600 });
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
