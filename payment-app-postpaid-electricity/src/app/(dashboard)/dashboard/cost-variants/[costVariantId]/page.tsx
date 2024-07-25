import React from 'react'
import { prisma } from '../../../../../../prisma/client/db'
import { redirect } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { FormUpdateCostVariant } from '../_components/form-update-cost-variant'
import TitleDashboard from '@/components/dashboard/title-dashboard'

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
      <TitleDashboard
        title='Update Cost Variant'
        desc='update cost variant page to update data cost variants.'
      />
      <Separator className='my-3' />
      <FormUpdateCostVariant {...checkCostVariant} />
    </div>
  )
}
