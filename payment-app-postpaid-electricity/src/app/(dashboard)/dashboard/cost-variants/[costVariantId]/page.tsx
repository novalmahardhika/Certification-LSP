import React from 'react'
import { prisma } from '../../../../../../prisma/client/db'
import { redirect } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { FormUpdateCostVariant } from '../_components/form-update-cost-variant'

export default async function CostVariantId({
  params,
}: {
  params: { costVariantId: string }
}) {
  const { costVariantId } = params

  const checkCostVariant = await prisma.costVariant.findUnique({
    where: { id: costVariantId },
  })

  if (!checkCostVariant) {
    redirect('/dashboard/cost-variants')
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Detail Cost Variant</h1>
      <Separator className='my-2' />
      <FormUpdateCostVariant {...checkCostVariant} />
    </div>
  )
}
