import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import React, { ReactNode } from 'react'

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
    </Card>
  )
}
