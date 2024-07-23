import { prisma } from '../../prisma/client/db'

export async function getAllUsers() {
  const users = await prisma.user.findMany()

  return users
}
