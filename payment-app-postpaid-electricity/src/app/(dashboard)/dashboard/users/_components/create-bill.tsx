'use client'

import { createBill } from '@/actions/bill'
import CardWrapper from '@/components/dashboard/card-wrapper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/format-date'
import { zodResolver } from '@hookform/resolvers/zod'
import { CostVariant, Usage } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type CreateBillProps = {
  currentUsage: Usage
  costVariant: CostVariant
}

export default function CreateBill({
  currentUsage,
  costVariant,
}: CreateBillProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const formSchema = z.object({
    finalkWh: z.coerce
      .number()
      .refine((data) => data > currentUsage.initialKwh, {
        message: 'Final kWh cannot less than initial kWh',
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      finalkWh: 0,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      userId: currentUsage.userId,
      usageId: currentUsage.id,
      totalKwh: values.finalkWh - currentUsage.initialKwh,
      finalKwh: values.finalkWh,
      totalPrice:
        (values.finalkWh - currentUsage.initialKwh) * costVariant.costPerKwh,
      endDate: currentUsage.endDate,
    }

    startTransition(async () => {
      try {
        const data = await createBill(payload)

        if (data.success) {
          toast.success(data.success)
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
    <div className=' w-full'>
      <h2 className='font-semibold mb-3 text-xl'>Detail Usage</h2>

      <CardWrapper className='flex flex-col space-y-3'>
        <span className='flex justify-between font-medium'>
          <p>Code Variant</p>
          <p>{costVariant?.code}</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>Power</p>
          <p>{costVariant?.power}</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>Cost per kWh</p>
          <p>{costVariant?.costPerKwh}/kWh</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>Initial kWh</p>
          <p>{currentUsage.initialKwh}</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>Start Date</p>
          <p>{formatDate(currentUsage.startDate)}</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>End Date</p>
          <p>{formatDate(currentUsage.endDate)}</p>
        </span>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='finalkWh'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final kWh</FormLabel>
                  <FormControl>
                    <Input placeholder='30' type='number' {...field} />
                  </FormControl>
                  <FormDescription className='text-sm'>
                    Input final kWh for generate bill user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isPending}>
              Create Bill
            </Button>
          </form>
        </Form>

        {/* <span className='flex flex-col justify-between font-medium '>
          <p>Final kWh :</p>
          <Input className='mt-3' type='text' datatype='numeric' />
        </span>

        <Button className='w-full'>Create Bill</Button> */}
      </CardWrapper>
    </div>
  )
}
