import { prisma } from '../../prisma/client/db'

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    return user
  } catch (error) {
    console.log('Internal Server Error', error)
  }
}

export async function updateVerifiedUser(userId: string) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
      },
    })
    return user
  } catch (error) {
    console.log('Internal Server Error', error)
  }
}
