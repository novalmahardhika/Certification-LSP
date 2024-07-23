import { Role } from '@prisma/client'
import { z } from 'zod'

export const FormRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export const FormLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  // password: z.string().min(8).optional(),
  role: z.enum(['ADMIN', 'USER']).optional(),
  address: z.string().optional(),
})
