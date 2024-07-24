'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { date, z } from 'zod'

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
import { loginUser } from '@/actions/auth'
import { FormLoginSchema } from '@/lib/types'
import { toast } from 'sonner'
import { useEffect, useState, useTransition } from 'react'
import SocialButton from '../ui/social-button'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const errorQuery = search.get('error')

  const form = useForm<z.infer<typeof FormLoginSchema>>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof FormLoginSchema>) => {
    startTransition(async () => {
      const data = loginUser(values)

      toast.promise(() => data, {
        success: (await data.then()).success,
        error: (await data.then()).error || 'Something went wrong',
        loading: 'wait a minute',
        finally: () => {
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        },
      })
    })
  }

  useEffect(() => {
    if (errorQuery === 'OAuthAccountNotLinked') {
      setIsError(true)
    }
  }, [errorQuery, search])

  if (isError) {
    toast.error('account is already exist with another provider')
    router.replace('/login')
    setIsError(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
