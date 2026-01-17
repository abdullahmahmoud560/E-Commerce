import { prisma } from '@/lib/prisma';

// Example usage in an API route
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}