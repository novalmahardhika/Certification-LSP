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

import { UserUpdateSchema } from '@/lib/types'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { updateUser } from '@/actions/user'

export function FormUpdateUser(user: User) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      role: user.role,
      address: user.address || '',
    },
  })

  const onSubmit = (values: z.infer<typeof UserUpdateSchema>) => {
    startTransition(async () => {
      const data = updateUser(values, user.id)

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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='bob' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='bob@mail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='+6282112345678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder='USER' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Jl Kijang no 40' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-x-2'>
          <Button type='submit' className='mt-5' disabled={isPending}>
            Update Data
          </Button>
        </div>
      </form>
    </Form>
  )
}
