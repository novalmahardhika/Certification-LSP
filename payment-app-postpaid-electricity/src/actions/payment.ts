'use server'

import { PayloadPaymentSchema } from '@/lib/types'
import { z } from 'zod'
import { prisma } from '../../prisma/client/db'

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
