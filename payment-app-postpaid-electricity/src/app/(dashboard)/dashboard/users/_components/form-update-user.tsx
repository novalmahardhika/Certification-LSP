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
import { updateUser } from '@/actions/user'
import { CostVariant, Prisma } from '@prisma/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type UserProps = {
  user: Prisma.UserGetPayload<{ include: { costVariant: true } }>
  listCostVariant: CostVariant[]
}

export function FormUpdateUser({ user, listCostVariant }: UserProps) {
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
      costVariantCode: user.costVariant?.code,
    },
  })

  const onSubmit = (values: z.infer<typeof UserUpdateSchema>) => {
    startTransition(async () => {
      try {
        const data = await updateUser(values, user.id)

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
        toast.error('Something went wrong')
      }
    })
  }

  return (
    <div>
      {/* <h2 className='font-semibold mb-3 text-xl'>Update User</h2> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='max-w-xl w-full'
        >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
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
    </div>
  )
}
