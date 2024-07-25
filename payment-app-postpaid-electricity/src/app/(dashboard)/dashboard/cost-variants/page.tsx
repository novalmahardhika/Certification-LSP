import { DataTable } from '@/components/dashboard/data-table'
import React from 'react'
import { columns } from './_components/column'
import { getListCostVariant } from '@/actions/cost-variant'
import TitleDashboard from '@/components/dashboard/title-dashboard'

export default async function CostVariantPage() {
  const datas = await getListCostVariant()

  const modifiedData = datas.map((data) => ({
    id: data.id,
    code: data.code,
    power: data.power,
    costPerKwh: data.costPerKwh,
  }))

  return (
    <div>
      <TitleDashboard
        href='/dashboard/cost-variants/create'
        title='Cost Variants'
        desc='List all of cost variant to manage them all.'
        isMain
      />
      <DataTable
        columns={columns}
        data={modifiedData}
        search='code'
        placeholderSearch='Code...'
      />
    </div>
  )
}
