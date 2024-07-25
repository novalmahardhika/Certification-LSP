'use server'

import { UserCreateSchema, UserUpdateSchema } from '@/lib/types'
import { prisma } from '../../prisma/client/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      costVariant: true,
      usage: true,
    },
  })

  return user
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  return user
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    where: { role: Role.USER },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      costVariant: true,
    },
  })

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
    const { name, email, address, phoneNumber, role, costVariantCode } =
      checkPayload.data

    console.log(checkPayload.data)

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
        costVariant: {
          connect: {
            code: costVariantCode,
          },
        },
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

export async function createUser(payload: z.infer<typeof UserCreateSchema>) {
  const checkPayload = UserCreateSchema.safeParse(payload)

  if (!checkPayload.success) {
    return { error: 'Invalid Field' }
  }

  try {
    const {
      name,
      role,
      address,
      costVariantCode,
      email,
      phoneNumber,
      password,
    } = checkPayload.data

    const checkEmailExist = await prisma.user.findFirst({ where: { email } })

    if (!!checkEmailExist) {
      return { error: 'Email already exist ' }
    }

    if (phoneNumber) {
      const checkPhoneNumber = await prisma.user.findUnique({
        where: { phoneNumber },
      })

      if (checkPhoneNumber) {
        return { error: 'Phone number already exist' }
      }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const data = {
      name,
      email,
      phoneNumber,
      role,
      address,
      password: hashPassword,
      costVariant: {
        connect: {
          code: costVariantCode,
        },
      },
    }

    await prisma.user.create({
      data: data,
    })

    return { success: 'Created user is successfully' }
  } catch (error) {
    console.log(error)

    if (error instanceof Error) {
      return { error: error.message }
    }

    return { error: 'Internal Server Error' }
  }
}
