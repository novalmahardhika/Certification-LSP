import { mockUserAdmin, mockUsers } from '../src/lib/mock-data'
import { prisma } from './client/db'

async function main() {
  mockUsers.map(
    async (user) =>
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
        },
      })
  )

  mockUserAdmin.map(
    async (user) =>
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
        },
      })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
