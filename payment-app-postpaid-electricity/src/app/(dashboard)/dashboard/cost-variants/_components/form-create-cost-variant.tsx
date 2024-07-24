'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { CostVariantSchema } from '@/lib/types'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createCostVariant } from '@/actions/cost-variant'

export function FormCreateCostVariant() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof CostVariantSchema>>({
    resolver: zodResolver(CostVariantSchema),
    defaultValues: {
      code: '',
      power: '',
    },
  })

  const onSubmit = (values: z.infer<typeof CostVariantSchema>) => {
    startTransition(async () => {
      const data = createCostVariant(values)
      toast.promise(async () => data, {
        success: (await data.then()).success,
        error: (await data.then()).error || 'Something went wrong',
        loading: 'wait a minute',
        finally: () => {
          router.refresh()
        },
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-lg w-full'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>code</FormLabel>
              <FormControl>
                <Input placeholder='INV001' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='power'
          render={({ field }) => (
            <FormItem>
              <FormLabel>power</FormLabel>
              <FormControl>
                <Input placeholder='450Kwh' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='costPerKwh'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost Per Kwh</FormLabel>
              <FormControl>
                <Input placeholder='1000' type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-x-2'>
          <Button type='submit' className='mt-5' disabled={isPending}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
