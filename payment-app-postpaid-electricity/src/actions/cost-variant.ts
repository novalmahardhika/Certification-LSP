'use server'

import { z } from 'zod'
import { prisma } from '../../prisma/client/db'
import { CostVariantSchema } from '@/lib/types'

export async function getListCostVariant() {
  const costVariants = await prisma.costVariant.findMany({
    orderBy: {
      code: 'asc',
    },
  })

  return costVariants
}

export async function deleteCostVariant(id: string) {
  try {
    const deleteData = await prisma.costVariant.delete({
      where: { id },
    })

    if (!deleteData) {
      return { error: 'Deleted cost variant is fail' }
    }

    return { success: 'Deleted cost variant successfully' }
  } catch (error) {
    return { error: 'Internal Server Error' }
  }
}

export async function updateCostVariant(
  values: z.infer<typeof CostVariantSchema>,
  id: string
) {
  const validateValues = CostVariantSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Field' }
  }

  try {
    const updateData = await prisma.costVariant.update({
      where: { id },
      data: {
        ...values,
      },
    })

    if (!updateData) {
      return { error: 'Updated data is fail' }
    }

    return { success: 'Update data successfully' }
  } catch (error) {
    console.log(error)
    return { error: 'Internal server error' }
  }
}

export async function createCostVariant(
  values: z.infer<typeof CostVariantSchema>
) {
  const validateValues = CostVariantSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Field' }
  }

  try {
    const newData = await prisma.costVariant.create({
      data: {
        ...values,
      },
    })

    if (!newData) {
      return { error: 'Created cost variant is fail' }
    }

    return { success: 'Created cost variant successfully' }
  } catch (error) {
    return { error: 'Internal server error' }
  }
}
