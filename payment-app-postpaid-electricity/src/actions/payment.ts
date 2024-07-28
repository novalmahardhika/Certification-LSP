'use server'

import { PayloadCancelPaymentSchema, PayloadPaymentSchema } from '@/lib/types'
import { z } from 'zod'
import { prisma } from '../../prisma/client/db'

export async function getListAllPayment() {
  return await prisma.payment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      bill: true,
    },
  })
}

export async function createPayment(
  payload: z.infer<typeof PayloadPaymentSchema>
) {
  const validateField = PayloadPaymentSchema.safeParse(payload)

  if (!validateField.success) {
    return { error: 'Invalid field' }
  }

  try {
    const { billId, accountName, accountNumber, bankName, userId } =
      validateField.data

    const createPayment = await prisma.bill.update({
      where: { id: billId },
      data: {
        status: 'PENDING',
        payment: {
          create: {
            userId,
            bankName,
            accountName,
            accountNumber,
          },
        },
      },
    })

    if (!createPayment) {
      return { error: 'Payment is fail' }
    }

    return {
      success: 'Payment successfully 👍',
    }
  } catch (error) {
    console.log(error)

    return { error: 'Internal Server Error' }
  }
}

export async function approvedPayment(billId: string) {
  try {
    const updatePayment = await prisma.bill.update({
      where: { id: billId },
      data: {
        status: 'PAID',
      },
    })

    if (!updatePayment) {
      return { error: 'Approved payment is fail' }
    }

    return { success: 'Payment is Approved' }
  } catch (error) {
    console.log(error)
    return { error: 'Internal Server Error' }
  }
}

export async function cancelPayment(
  payload: z.infer<typeof PayloadCancelPaymentSchema>
) {
  const validatePayload = PayloadCancelPaymentSchema.safeParse(payload)

  if (!validatePayload.success) {
    return { error: 'Payload Invalid' }
  }

  try {
    const { totalKwh, totalPrice, usageId, userId, billId } =
      validatePayload.data

    const cancelAction = await prisma.$transaction([
      prisma.bill.update({
        where: { id: billId },
        data: {
          status: 'CANCELLED',
        },
      }),

      prisma.bill.create({
        data: {
          userId: userId,
          totalKwh: totalKwh,
          totalPrice: totalPrice,
          usageId: usageId,
        },
      }),
    ])

    if (!cancelAction) {
      return { error: 'Cancel payment is fail' }
    }

    return { success: 'Cancel payment success' }
  } catch (error) {
    console.log(error)

    return { error: 'Internal Server Error' }
  }
}
