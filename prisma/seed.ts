// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Check if User table exists
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User';
    `
    
    if (!tables || tables.length === 0) {
      console.log('ℹ️ User table does not exist yet. Please run migrations first.')
      return
    }

    const userCount = await prisma.user.count().catch(() => 0)

    if (userCount === 0) {
      const user = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123', // TODO: Hash this password
        },
      })
      console.log(`👤 Created admin user with ID: ${user.id}`)
    } else {
      console.log(`ℹ️ Database already contains ${userCount} users, skipping seeding.`)
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('✅ Seeding completed!')
  })
