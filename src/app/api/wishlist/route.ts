import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth-options';
import { Prisma } from '@prisma/client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wishlist: {
          include: {
            product: true
          }
        }
      }
    }) as Prisma.UserGetPayload<{
      include: {
        wishlist: {
          include: {
            product: true;
          };
        };
      };
    }> | null;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const wishlistItems = user.wishlist.map(item => ({
      ...item.product,
      inWishlist: true
    }));

    return NextResponse.json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if product is already in wishlist
    const existingItem = await prisma.wishlistItem.findFirst({
      where: {
        userId: user.id,
        productId: productId
      }
    });

    if (existingItem) {
      // If it exists, remove it (toggle off)
      await prisma.wishlistItem.delete({
        where: { id: existingItem.id }
      });
      
      return NextResponse.json({ added: false });
    }

    // If it doesn't exist, add it
    await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId: productId
      }
    });

    return NextResponse.json({ added: true });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to update wishlist' },
      { status: 500 }
    );
  }
}