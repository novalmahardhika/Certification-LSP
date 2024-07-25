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

import { UserCreateSchema } from '@/lib/types'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createUser } from '@/actions/user'
import { CostVariant, Prisma, Role } from '@prisma/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type UserCreateProps = {
  listCostVariant: CostVariant[]
}

export function FormCreateUser({ listCostVariant }: UserCreateProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof UserCreateSchema>>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      address: '',
      role: Role.USER,
      costVariantCode: '',
    },
  })

  const onSubmit = (values: z.infer<typeof UserCreateSchema>) => {
    startTransition(async () => {
      try {
        const data = await createUser(values)

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
        toast.error('Something went wrong ')
      }
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='********' type='password' {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a role user' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='USER'>USER</SelectItem>
                  <SelectItem value='ADMIN'>ADMIN</SelectItem>
                </SelectContent>
              </Select>
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

        <FormField
          control={form.control}
          name='costVariantCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost Variant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a cost variant to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listCostVariant.map((variant, index) => (
                    <SelectItem
                      key={`${variant.code}-${index}`}
                      value={variant.code}
                    >
                      <span>{variant.power}</span>
                      <span className='mx-3'>-</span>
                      <span>{variant.costPerKwh}/Kwh</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
