'use server'

import { z } from 'zod'
import { prisma } from '../../prisma/client/db'
import { PayloadCreatedBillSchema } from '@/lib/types'

export async function getBillByUserId(id: string) {
  const data = await prisma.bill.findMany({
    where: { userId: id },
    include: {
      usage: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return data
}

export async function createBill(
  payload: z.infer<typeof PayloadCreatedBillSchema>
) {
  const validatePayload = PayloadCreatedBillSchema.safeParse(payload)

  if (!validatePayload.success) {
    return { error: 'Invalid Field' }
  }

  try {
    if (!payload.userId) {
      return { error: 'user id is empty' }
    }

    if (payload.totalPrice === 0) {
      return { error: 'total price is empty' }
    }

    const checkBill = await getBillByUserId(payload.userId)

    console.log(new Date() < payload.endDate && !!checkBill.length)

    if (new Date() < payload.endDate && !!checkBill.length) {
      return { error: 'Bill already created for this month' }
    }

    const data = await prisma.$transaction([
      prisma.usage.update({
        where: { id: payload.usageId },
        data: {
          isActive: false,
        },
      }),
      prisma.usage.create({
        data: {
          userId: payload.userId,
          isActive: true,
          initialKwh: payload.finalKwh,
          bill: {
            create: {
              userId: payload.userId,
              totalKwh: payload.totalKwh,
              totalPrice: payload.totalPrice,
            },
          },
        },
      }),
    ])

    if (!data) {
      return { error: 'Created bill is Fail' }
    }

    return { success: 'Created bill successfully' }
  } catch (error) {
    console.log(error)

    return { error: 'Internal Server Error' }
  }
}
