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
  phoneNumber: z.string().trim().min(1),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'USER']),
  address: z.string().trim().optional(),
  costVariantCode: z.string(),
})

export const UserUpdateSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  role: z.enum(['ADMIN', 'USER']),
  address: z.string().trim().optional(),
  costVariantCode: z.string().optional(),
})

export const CostVariantSchema = z.object({
  code: z.string().trim().min(1),
  power: z.string().trim().min(1),
  costPerKwh: z.coerce.number(),
})

export const PayloadCreatedBillSchema = z.object({
  userId: z.string().nullable(),
  usageId: z.string(),
  totalKwh: z.number(),
  finalKwh: z.number(),
  totalPrice: z.number(),
  endDate: z.date(),
})

export const CreatePaymentSchema = z.object({
  bankName: z.string().trim().min(1, { message: 'Please input your Bank' }),
  accountNumber: z
    .string()
    .trim()
    .min(1, { message: 'Please input your account number' }),
  accountName: z
    .string()
    .trim()
    .min(1, { message: 'Please input your account name' }),
})

export const PayloadPaymentSchema = z.object({
  userId: z.string().trim().min(1, { message: 'Please input your user Id' }),
  billId: z.string().trim().min(1, { message: 'Please input your Bill Id' }),
  bankName: z.string().trim().min(1, { message: 'Please input your Bank' }),
  accountNumber: z
    .string()
    .trim()
    .min(1, { message: 'Please input your account number' }),
  accountName: z
    .string()
    .trim()
    .min(1, { message: 'Please input your account name' }),
})

export const PayloadCancelPaymentSchema = z.object({
  userId: z.string(),
  billId: z.string(),
  usageId: z.string(),
  totalKwh: z.number(),
  totalPrice: z.number(),
})
