'use client'

import { Button } from '@/components/ui/button'
import { Bill, PaymentStatus } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonAction from './button-action'

export type BillTabelType = {
  id: string
  totalKwh: number
  totalPrice: number
  status: PaymentStatus
  date: string
}

export const columns: ColumnDef<BillTabelType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'totalKwh',
    header: 'Total kWh',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div
          className={`${status === PaymentStatus.PAID && 'text-green-500'} ${
            status === PaymentStatus.CANCELLED && 'text-red-500'
          }
          ${status === PaymentStatus.PENDING && 'text-yellow-500'}   
           font-semibold text-gray-400`}
        >
          {row.original.status === PaymentStatus.NOT_PAID
            ? 'NOT PAID'
            : row.original.status}
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Created At',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return <ButtonAction bill={user} />
    },
  },
]
