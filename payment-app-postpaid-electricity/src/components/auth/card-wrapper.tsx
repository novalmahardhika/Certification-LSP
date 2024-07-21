'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SocialButton from '@/components/ui/social-button'
import React, { ReactNode } from 'react'
import { Separator } from '../ui/separator'

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

type CardWrapperType = {
  children: ReactNode
  title: string
  description: string
}

export default function CardWrapperForm({
  title,
  children,
  description,
}: CardWrapperType) {
  return (
    <Card className="h-full w-full flex flex-col justify-center bg-[url('/assets/img-auth-4.jpg')] sm:bg-none  bg-cover">
      <CardHeader className='flex flex-col space-y-2 text-center sm:text-left'>
        <CardTitle className='text-3xl text-white sm:text-black'>
          {title}
        </CardTitle>

        <CardDescription className=' text-gray-200 sm:text-gray-500'>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {/* <CardFooter className='flex space-y-2 flex-col  '>
        {items.map((item, index) => (
          <SocialButton key={`${item.name}-${index}`} provider={item.provider}>
            {item.name}
          </SocialButton>
        ))}
      </CardFooter> */}
    </Card>
  )
}
