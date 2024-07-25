'use server'

import { FormLoginSchema, FormRegisterSchema } from '@/lib/types'
import { z } from 'zod'
import { prisma } from '../../prisma/client/db'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function registerUser(
  payload: z.infer<typeof FormRegisterSchema>
) {
  const validatePayload = FormRegisterSchema.safeParse(payload)

  if (!validatePayload.success) {
    return { error: 'Invalid Field' }
  }

  try {
    const { email, name, password } = validatePayload.data

    const checkExistEmail = await prisma.user.findFirst({
      where: { email },
    })

    if (checkExistEmail) {
      return { error: 'Email already exist' }
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    if (!encryptedPassword) {
      return { error: 'Error while hashing password' }
    }

    await prisma.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
        usage: {
          create: {
            isActive: true,
          },
        },
      },
    })

    return { success: 'Register Successfully' }
  } catch (error) {
    return { error: 'Register user is Fail' }
  }
}

export async function loginUser(payload: z.infer<typeof FormLoginSchema>) {
  const validatePayload = FormLoginSchema.safeParse(payload)

  if (!validatePayload.success) {
    return { error: 'Invalid Field' }
  }

  try {
    const { email, password } = validatePayload.data

    const checkUser = await prisma.user.findFirst({ where: { email } })

    if (!checkUser) {
      return { error: 'User is not found' }
    }

    if (!checkUser.password) {
      return { error: 'password is empty' }
    }

    const checkMatchUser = await bcrypt.compare(password, checkUser.password)

    if (!checkMatchUser) {
      return { error: 'password doesnt match' }
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return { success: 'Login is Successfully' }
  } catch (error) {
    console.log(error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credential Invalid !' }
        default:
          return { error: 'Somethings went wrong !' }
      }
    }
    throw error
  }
}
