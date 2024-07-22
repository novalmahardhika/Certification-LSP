import { prisma } from './client/db'
import bcrypt from 'bcryptjs'

const mockUsers = [
  {
    name: 'Trafalgar',
    email: 'trafalgar@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345689',
    address: 'jl Semangka no 1',
  },
  {
    name: 'Zoro',
    email: 'zoro@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345688',
    address: 'jl Semangka no 2',
  },
  {
    name: 'John',
    email: 'john@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345686',
    address: 'jl Semangka no 3',
  },
  {
    name: 'Harry',
    email: 'harry@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345682',
    address: 'jl Nanas no 21',
  },
  {
    name: 'Joko',
    email: 'joko@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345685',
    address: 'jl Nanas no 85',
  },
]

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
