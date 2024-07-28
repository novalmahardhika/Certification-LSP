import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

import React, { ReactNode } from 'react'
import { Button } from '../ui/button'

type CardWrapperType = {
  children: ReactNode
  title: string
  description: string
  href: string
  linkText: string
}

export default function CardWrapperForm({
  title,
  children,
  description,
  href,
  linkText,
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

      <CardContent className='pb-2'>{children}</CardContent>

      <CardFooter>
        <Button variant='link' className='p-0 text-white sm:text-black' asChild>
          <Link href={href} className='text-sm'>
            {linkText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
