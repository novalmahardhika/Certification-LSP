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
import { registerUser } from '@/actions/user'
import { FormRegisterSchema } from '@/lib/types'
import { toast } from 'sonner'
import { useTransition } from 'react'
import SocialButton from '../ui/social-button'

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof FormRegisterSchema>>({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof FormRegisterSchema>) => {
    startTransition(async () => {
      try {
        const data = await registerUser(values)

        if (data.success) {
          toast.success(data.success)
          return
        }
        if (data.error) {
          toast.error(data.error)
          return
        }

        return
      } catch (error) {
        toast.error('InternaL Server Error')
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
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
              <FormLabel>email</FormLabel>
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-x-2'>
          <Button type='submit' className='mt-5' disabled={isPending}>
            Submit
          </Button>
          <SocialButton />
        </div>
      </form>
    </Form>
  )
}
