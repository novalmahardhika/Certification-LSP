'use client'

import { Button } from '@/components/ui/button'
import { Bill, PaymentStatus } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonAction from './button-action'

export type BillTabelType = {
  id: string
  userId: string
  kwhNumber: string
  totalKwh: number
  initialKwh: string
  totalKwhStr: string
  totalPrice: string
  status: PaymentStatus
  date: string
}

export const columns: ColumnDef<BillTabelType>[] = [
  {
    accessorKey: 'kwhNumber',
    header: 'kWh Number',
  },
  {
    accessorKey: 'totalKwhStr',
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
           font-semibold `}
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
