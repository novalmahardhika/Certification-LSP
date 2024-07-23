'use server'

import { UserUpdateSchema } from '@/lib/types'
import { prisma } from '../../prisma/client/db'
import { z } from 'zod'

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })

  return user
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()

  return users
}

export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    })

    if (!user) {
      return { error: 'Deleted user is fail' }
    }

    return { success: 'Deleted user successfully' }
  } catch (error) {
    console.log(error)

    return { error: 'Internal server error' }
  }
}

export async function updateUser(
  payload: z.infer<typeof UserUpdateSchema>,
  id: string
) {
  const checkPayload = UserUpdateSchema.safeParse(payload)

  if (!checkPayload.success) {
    return { error: 'Invalid Field' }
  }

  try {
    const { name, email, address, phoneNumber, role } = checkPayload.data

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        address,
        phoneNumber,
        role,
      },
    })

    if (!updateUser) {
      return { error: 'update user is fail' }
    }

    return { success: 'user updated successfully' }
  } catch (error) {
    return { error: 'Internal server error' }
  }
}
