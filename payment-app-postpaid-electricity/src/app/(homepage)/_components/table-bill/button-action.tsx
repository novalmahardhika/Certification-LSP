import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { PaymentStatus } from '@prisma/client'
import React, { startTransition, useTransition } from 'react'
import { BillTabelType } from './column'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePaymentSchema } from '@/lib/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Separator } from '@/components/ui/separator'
import { createPayment } from '@/actions/payment'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ButtonAction({ bill }: { bill: BillTabelType }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const user = useCurrentUser()

  const form = useForm<z.infer<typeof CreatePaymentSchema>>({
    resolver: zodResolver(CreatePaymentSchema),
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
    },
  })

  const checkStatusCancel = bill.status === PaymentStatus.CANCELLED
  const checkStatusPaid = bill.status === PaymentStatus.PAID

  const onSubmit = (values: z.infer<typeof CreatePaymentSchema>) => {
    const payload = {
      ...values,
      userId: bill.userId,
      billId: bill.id,
    }

    startTransition(async () => {
      try {
        const data = await createPayment(payload)

        if (data.success) {
          toast.success(data.success)

          form.reset({
            accountName: '',
            accountNumber: '',
            bankName: '',
          })

          router.refresh()
          return
        }

        if (data.error) {
          toast.error(data.error)
          return
        }
      } catch (error) {
        toast.error('something went wrong')
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${
            (checkStatusCancel && 'bg-red-500 text-white') ||
            (checkStatusPaid && 'bg-green-500 text-white')
          } `}
          variant={'outline'}
          disabled={bill.status !== PaymentStatus.NOT_PAID}
        >
          Payment
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Payment Bill</DialogTitle>
          <DialogDescription>
            Do you wanna pay the bill {user?.name} ?
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col space-y-3'>
          <div className='flex flex-col space-y-1.5 bg-gray-100 p-2 rounded-md'>
            <div className='font-semibold text-sm flex flex-col justify-between'>
              <span>Payment Detail</span>
              <Separator className='my-1 bg-gray-300' />
            </div>

            <div className='font-medium text-sm flex justify-between'>
              <span>Total kWh</span>
              <span>{bill.totalKwh}</span>
            </div>

            <div className='font-medium text-sm flex justify-between'>
              <span>Total Price</span>
              <span>{bill.totalPrice}</span>
            </div>

            <div className='font-medium text-sm flex justify-between'>
              <span>Virtual Account</span>
              <span>000035463122</span>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-2'
            >
              <FormField
                control={form.control}
                name='bankName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder='BCA' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='accountNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder='123457689' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='accountName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Bob' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose>
                <Button type='submit' disabled={isPending}>
                  Payment
                </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
