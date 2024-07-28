'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import ActionPaymentTabel from './_component/action-payment-table'
import { PaymentStatus } from '@prisma/client'

export type PaymentTabelType = {
  id: string
  userId: string
  billId: string
  usageId: string
  email: string
  totalPrice: string
  totalPriceNum: number
  totalKwh: number
  bankName: string
  accountNumber: string
  accountName: string
  date: string
  status: PaymentStatus
}

export const columns: ColumnDef<PaymentTabelType>[] = [
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
  },
  {
    accessorKey: 'bankName',
    header: 'Bank Name',
  },

  {
    accessorKey: 'accountName',
    header: 'Account Name',
  },
  {
    accessorKey: 'status',
    header: 'PaymentStatus',
    cell: ({ row }) => {
      const payment = row.original
      const status = payment.status
      return (
        <p
          className={`${status === 'PAID' && 'text-green-500'} ${
            status === 'CANCELLED' && 'text-red-500'
          } ${status === 'PENDING' && 'text-yellow-500'} font-semibold`}
        >
          {payment.status}
        </p>
      )
    },
  },

  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original

      return <ActionPaymentTabel payment={payment} />
    },
  },
]
