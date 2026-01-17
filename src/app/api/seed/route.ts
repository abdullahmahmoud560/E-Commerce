import { NextResponse } from 'next/server';
import { seedProducts } from '@/lib/seed';

export async function GET() {
  try {
    await seedProducts();
    return NextResponse.json({ success: true, message: 'Products seeded successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to seed products' }, { status: 500 });
  }
}