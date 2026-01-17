// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  const userCount = await prisma.user.count()

  if (userCount === 0) {
    const user = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // لاحقًا هتتحول لـ hash
      },
    })

    console.log(`👤 Created admin user with ID: ${user.id}`)
  } else {
    console.log(`ℹ️ Database already contains ${userCount} users, skipping seeding.`)
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
