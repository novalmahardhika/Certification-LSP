'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionCostVariantTabel from './action-cost-variant-tabel'

export type CostPerKwhTable = {
  id: string
  code: string
  power: string
  costPerKwh: number
}

export const columns: ColumnDef<CostPerKwhTable>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'power',
    header: 'Power',
  },
  {
    accessorKey: 'costPerKwh',
    header: 'Cost/KWH',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const costVariant = row.original

      return <ActionCostVariantTabel {...costVariant} />
    },
  },
]
