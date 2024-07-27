'use client'

import React, { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

import Link from 'next/link'
import { ModalDelete } from '@/components/modals/modal-delete'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { PaymentTabelType } from '../column'
import { approvedPayment, cancelPayment } from '@/actions/payment'

export default function ActionPaymentTabel({
  payment,
}: {
  payment: PaymentTabelType
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const approvedHandler = async () => {
    startTransition(async () => {
      try {
        const data = await approvedPayment(payment.billId)

        if (data.success) {
          toast.success(data.success)
          router.refresh()
          return
        }

        if (data.error) {
          toast.success(data.error)
          return
        }
      } catch (error) {
        console.log(error)
        toast.error('Something when wrong')
      }
    })
  }

  const cancelHandler = async () => {
    const payload = {
      userId: payment.userId,
      billId: payment.billId,
      usageId: payment.usageId,
      totalKwh: payment.totalKwh,
      totalPrice: payment.totalPriceNum,
    }

    startTransition(async () => {
      try {
        const data = await cancelPayment(payload)

        if (data.success) {
          toast.success(data.success)
          router.refresh()
          return
        }

        if (data.error) {
          toast.success(data.error)
          return
        }
      } catch (error) {
        console.log(error)
        toast.error('Something when wrong')
      }
    })
  }

  const checkDisable =
    payment.status === 'PAID' || payment.status === 'CANCELLED'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0' disabled={isPending}>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={approvedHandler}
          disabled={checkDisable}
        >
          Approve
        </DropdownMenuItem>

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={cancelHandler}
          disabled={checkDisable}
        >
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
