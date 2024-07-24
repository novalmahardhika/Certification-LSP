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

export const UserCreateSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'USER']),
  address: z.string().trim().min(1).optional(),
})

export const UserUpdateSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  // password: z.string().min(8).optional(),
  role: z.enum(['ADMIN', 'USER']),
  address: z.string().trim().min(1),
})

export const CostVariantSchema = z.object({
  code: z.string().trim().min(1),
  power: z.string().trim().min(1),
  costPerKwh: z.coerce.number(),
})
