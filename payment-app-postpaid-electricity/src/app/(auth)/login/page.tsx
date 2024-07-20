'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SocialButton from '@/components/ui/social-button'
import React from 'react'

const items = [
  {
    name: 'Google',
    provider: 'google',
  },
  {
    name: 'Github',
    provider: 'github',
  },
]

export default function LoginPage() {
  return (
    <Card className="h-full w-full flex flex-col justify-center bg-[url('/assets/img-auth.jpg')] sm:bg-none bg-cover">
      <CardHeader className='flex flex-col space-y-2 text-center sm:text-left'>
        <CardTitle className='text-3xl text-white sm:text-black'>
          Login.
        </CardTitle>

        <CardDescription className=' text-gray-200 sm:text-gray-500'>
          Welcome, Lets join with us to have a new experience.
        </CardDescription>
      </CardHeader>

      <CardContent className='flex sm:space-x-2 sm:space-y-0 space-y-3  flex-col sm:flex-row '>
        {items.map((item, index) => (
          <SocialButton key={`${item.name}-${index}`} provider={item.provider}>
            {item.name}
          </SocialButton>
        ))}
      </CardContent>
    </Card>
  )
}
